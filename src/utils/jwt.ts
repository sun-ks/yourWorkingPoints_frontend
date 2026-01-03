import { jwtDecode } from 'jwt-decode';

export function isJwtExpired(token?: string): boolean {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  if (!exp) return true;

  return Date.now() >= exp * 1000;
}
