// Lazy getters — must not be evaluated before dotenv loads.
export const getSecret = () => {
  const s = process.env.JWT_SECRET;
  if (!s || s.length < 32) {
    throw new Error('JWT_SECRET missing or too short (need ≥ 32 chars)');
  }
  return s;
};

export const isProd = () => process.env.NODE_ENV === 'production';

export const getPort = () => Number(process.env.PORT) || 3000;
