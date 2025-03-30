import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/auth/authOperations";
import { useNavigate } from "react-router-dom";
import styles from "./loginPage.module.css";
import PillImage from "../components/assets/pill.png";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Валидация
    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (formData.password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов");
      return;
    }

    const result = await dispatch(
      registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    } else {
      setError(result.payload || "Ошибка регистрации");
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
          <input
            type="text"
            name="name"
            placeholder="Имя"
            className={styles.input}
            onChange={handleChange}
            required
          />
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
            placeholder="Пароль"
            className={styles.input}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            className={styles.input}
            onChange={handleChange}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Зарегистрироваться
          </button>
          <p className={styles.linkText}>
            Уже есть аккаунт?{" "}
            <a href="/login" className={styles.link}>
              Войти
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
