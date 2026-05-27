// Tiny fetch wrapper for admin API calls. Cookies are sent automatically.
// On 401 outside the login flow, force a redirect to /admin/login so the user
// re-authenticates instead of seeing cryptic errors.

const AUTH_FLOW_PATHS = new Set(['/auth/login', '/auth/me']);

async function request(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await res.json() : null;
  if (!res.ok) {
    if (
      res.status === 401 &&
      !AUTH_FLOW_PATHS.has(path) &&
      typeof window !== 'undefined' &&
      !window.location.pathname.startsWith('/admin/login')
    ) {
      const next = encodeURIComponent(window.location.pathname);
      window.location.assign(`/admin/login?next=${next}`);
    }
    const err = new Error(body?.error || `HTTP ${res.status}`);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

export const api = {
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  me: () => request('/auth/me'),
  content: () => request('/content'),
  updateSection: (id, payload) =>
    request(`/sections/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  updateSettings: (key, value) =>
    request(`/settings/${key}`, { method: 'PUT', body: JSON.stringify({ value }) }),
  listUploads: () => request('/uploads'),
  uploadFile: async (file, alt = '') => {
    const fd = new FormData();
    fd.append('file', file);
    if (alt) fd.append('alt', alt);
    const res = await fetch('/api/uploads', {
      method: 'POST',
      credentials: 'same-origin',
      body: fd,
    });
    const body = await res.json();
    if (!res.ok) {
      const err = new Error(body?.error || `HTTP ${res.status}`);
      err.status = res.status;
      throw err;
    }
    return body;
  },
  updateUpload: (id, alt) =>
    request(`/uploads/${id}`, { method: 'PATCH', body: JSON.stringify({ alt }) }),
  deleteUpload: (id) => request(`/uploads/${id}`, { method: 'DELETE' }),

  createSection: (type) =>
    request('/sections', { method: 'POST', body: JSON.stringify({ type }) }),
  deleteSection: (id) => request(`/sections/${id}`, { method: 'DELETE' }),
  reorderSections: (orderIds) =>
    request('/sections/reorder', { method: 'POST', body: JSON.stringify({ order: orderIds }) }),

  listUsers: () => request('/users'),
  createUser: ({ email, password, name }) =>
    request('/users', { method: 'POST', body: JSON.stringify({ email, password, name }) }),
  updateUser: (id, patch) =>
    request(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }),
  deleteUser: (id) => request(`/users/${id}`, { method: 'DELETE' }),

  listRevisions: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/revisions${qs ? `?${qs}` : ''}`);
  },
  getRevision: (id) => request(`/revisions/${id}`),
  restoreRevision: (id) => request(`/revisions/${id}/restore`, { method: 'POST' }),

  analyticsStats: (range = '30d') => request(`/analytics/stats?range=${encodeURIComponent(range)}`),
};
