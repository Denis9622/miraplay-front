import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/auth/authOperations.js";
import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../redux/auth/selectors";
import styles from "./loginPage.module.css";
import PillImage from "../components/assets/pill.png";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Очищаем ошибку при вводе
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Очищаем предыдущие ошибки

    try {
      console.log("Отправка данных для входа:", {
        ...formData,
        password: "***",
      });
      const result = await dispatch(loginUser(formData));
      console.log("Результат входа:", result);

      if (result.meta.requestStatus === "fulfilled") {
        console.log("Вход успешен, перенаправление на главную");
        navigate("/", { replace: true });
      } else {
        const errorMessage =
          result.payload?.message || "Ошибка входа. Проверьте email и пароль.";
        console.error("Ошибка входа:", result.payload);
        setError(errorMessage);
      }
    } catch (err) {
      console.error("Неожиданная ошибка при входе:", err);
      setError("Произошла ошибка при попытке входа. Попробуйте позже.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>
          Your medication, delivered Say goodbye to all{" "}
          <span className={styles.greenText}>your healthcare</span> worries with
          us
        </h1>
        <img src={PillImage} alt="Pill" className={styles.pillImage} />
      </div>

      <div className={styles.rightSide}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className={styles.input}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.button}>
            Log in
          </button>

          <a href="/signup" className={styles.signupLink}>
            Don&#39;t have an account?
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
