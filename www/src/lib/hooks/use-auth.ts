import { useAuthStore } from "../store/auth";

export function useAuth() {
  const logout = useAuthStore((state) => state.logout);

  return {
    logout,
    isAuthenticated: true,
  };
}
