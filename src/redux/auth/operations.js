import { loginSuccess } from "./authSlice.js"; // ✅ Импорт экшена

export const login = (userData) => async (dispatch) => {
  try {
    // Временные данные (мок API)
    const mockUser = { email: "test@gmail.com", token: "123456" };

    if (
      userData.email === "test@gmail.com" &&
      userData.password === "password"
    ) {
      dispatch(loginSuccess({ user: mockUser, token: mockUser.token })); // ✅ Вызываем loginSuccess
      return;
    }

    throw new Error("Invalid credentials");
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};
