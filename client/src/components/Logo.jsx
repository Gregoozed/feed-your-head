const MARK_SRC = '/LOGO 1x1-04.svg';

export default function Logo({ variant = 'lockup', className = '' }) {
  if (variant === 'mark' || variant === 'markFlat') {
    return (
      <img
        src={MARK_SRC}
        alt=""
        aria-hidden="true"
        className={`${className} rounded-full object-contain`}
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={MARK_SRC}
        alt=""
        aria-hidden="true"
        className="h-full aspect-square rounded-full object-contain shrink-0"
      />
      <span
        className="font-display italic font-medium tracking-tight leading-none whitespace-nowrap"
        style={{ fontSize: '1.05em' }}
      >
        Feed Your Head
      </span>
    </span>
  );
}
