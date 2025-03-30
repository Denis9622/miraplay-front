export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated && state.auth.token && state.auth.user?.email;
