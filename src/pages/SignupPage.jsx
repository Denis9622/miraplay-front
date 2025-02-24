import { useDispatch } from "react-redux";
import { registerUser } from "../redux/auth/authOperations.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Импортируем и инициализируем navigate
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    if (result.meta.requestStatus === "fulfilled") {
      // Токен уже сохраняется в authOperations.js
      navigate("/dashboard"); // Переход на страницу dashboard после успешной регистрации
    } else {
      // Обработка ошибок
      console.error("Ошибка регистрации:", result.payload);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignupPage;
