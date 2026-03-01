interface User {
  name?: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const defaultUser: User = {
  name: "Demo User",
  email: "demo@example.com",
};

let currentUser: User | null = defaultUser;

export function useAuthStore(): AuthState;
export function useAuthStore<T>(selector: (state: AuthState) => T): T;
export function useAuthStore<T>(selector?: (state: AuthState) => T): T | AuthState {
  const state: AuthState = {
    user: currentUser,
    setUser: (user) => {
      currentUser = user;
    },
    logout: () => {
      currentUser = null;
    },
  };

  return selector ? selector(state) : state;
}
