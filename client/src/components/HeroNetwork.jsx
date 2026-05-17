import { useEffect, useRef, useState } from 'react';

// Réseau organique animé — métaphore mycorhize × neurones.
// Nœuds draggables, edges qui suivent, spring-back élastique au relâchement.
const NODES = [
  [38, 28, 3, 0.0],
  [108, 22, 4.5, 1.2],
  [168, 48, 3, 2.4],
  [62, 70, 5, 0.6],
  [130, 78, 3.5, 1.8],
  [28, 118, 3, 2.9],
  [88, 122, 4, 0.4],
  [158, 110, 4.5, 1.5],
  [48, 168, 3, 2.1],
  [112, 168, 5, 0.8],
  [172, 175, 3, 1.6],
  [70, 210, 3.5, 0.2],
  [134, 220, 4, 2.6],
  [180, 230, 2.5, 1.0],
];

const EDGES = [
  [0, 3, 'A'], [3, 6, 'A'], [6, 9, 'A'], [9, 11, 'A'],
  [1, 4, 'B'], [4, 7, 'B'], [7, 10, 'B'],
  [2, 4, 'C'], [4, 6, 'C'], [6, 8, 'C'], [8, 11, 'C'], [11, 12, 'C'],
  [0, 1, null], [1, 2, null], [3, 5, null], [5, 8, null],
  [7, 12, null], [10, 13, null], [9, 12, null], [6, 4, null],
];

const SIGNAL_DELAYS = {
  A: [0.0, 0.35, 0.7, 1.05],
  B: [2.6, 2.95, 3.3],
  C: [4.7, 5.0, 5.3, 5.6, 5.9],
};

const VIEW_W = 200;
const VIEW_H = 250;
const SPRING_DECAY = 0.86;
const SPRING_THRESHOLD = 0.05;

export default function HeroNetwork() {
  const [offsets, setOffsets] = useState(() =>
    NODES.map(() => ({ dx: 0, dy: 0 }))
  );
  const svgRef = useRef(null);
  const dragRef = useRef(null);
  const rafRef = useRef(null);

  const toSvg = (clientX, clientY) => {
    const rect = svgRef.current.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * VIEW_W,
      y: ((clientY - rect.top) / rect.height) * VIEW_H,
    };
  };

  const stopSpring = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const startSpring = () => {
    stopSpring();
    const tick = () => {
      setOffsets((prev) => {
        let stillMoving = false;
        const next = prev.map(({ dx, dy }) => {
          const nx = Math.abs(dx) < SPRING_THRESHOLD ? 0 : dx * SPRING_DECAY;
          const ny = Math.abs(dy) < SPRING_THRESHOLD ? 0 : dy * SPRING_DECAY;
          if (nx !== 0 || ny !== 0) stillMoving = true;
          return { dx: nx, dy: ny };
        });
        rafRef.current = stillMoving ? requestAnimationFrame(tick) : null;
        return next;
      });
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const onPointerDown = (idx) => (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    stopSpring();
    const pt = toSvg(e.clientX, e.clientY);
    dragRef.current = {
      idx,
      startX: pt.x,
      startY: pt.y,
      startDx: offsets[idx].dx,
      startDy: offsets[idx].dy,
      pointerId: e.pointerId,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const pt = toSvg(e.clientX, e.clientY);
    const dx = drag.startDx + (pt.x - drag.startX);
    const dy = drag.startDy + (pt.y - drag.startY);
    setOffsets((prev) => {
      const next = prev.slice();
      next[drag.idx] = { dx, dy };
      return next;
    });
  };

  const onPointerUp = (e) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    dragRef.current = null;
    startSpring();
  };

  useEffect(() => () => stopSpring(), []);

  const groupCounters = { A: 0, B: 0, C: 0 };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0"
      style={{ touchAction: 'none' }}
    >
      <circle cx="50" cy="60" r="55" fill="#7a9b8a" opacity="0.08" />
      <circle cx="160" cy="150" r="70" fill="#c47a28" opacity="0.06" />
      <circle cx="90" cy="210" r="50" fill="#7a9b8a" opacity="0.07" />

      <g fill="none" strokeLinecap="round">
        {EDGES.map(([from, to, group], i) => {
          const [bx1, by1] = NODES[from];
          const [bx2, by2] = NODES[to];
          const { dx: dx1, dy: dy1 } = offsets[from];
          const { dx: dx2, dy: dy2 } = offsets[to];
          let delay = null;
          if (group) {
            delay = SIGNAL_DELAYS[group][groupCounters[group]];
            groupCounters[group] += 1;
          }
          return (
            <line
              key={i}
              x1={bx1 + dx1}
              y1={by1 + dy1}
              x2={bx2 + dx2}
              y2={by2 + dy2}
              vectorEffect="non-scaling-stroke"
              className={`network-edge${group ? ' fire' : ''}`}
              style={delay !== null ? { animationDelay: `${delay}s` } : undefined}
            />
          );
        })}
      </g>

      <g>
        {NODES.map(([cx, cy, r, delay], i) => {
          const { dx, dy } = offsets[i];
          return (
            <g key={i} transform={`translate(${dx}, ${dy})`}>
              {/* zone de hit invisible, plus large que le point visible */}
              <circle
                cx={cx}
                cy={cy}
                r={Math.max(r + 6, 10)}
                fill="transparent"
                style={{ cursor: 'grab', pointerEvents: 'all' }}
                onPointerDown={onPointerDown(i)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              />
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="#c47a28"
                className="network-node"
                style={{
                  animationDelay: `${delay}s`,
                  pointerEvents: 'none',
                }}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
