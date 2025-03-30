import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../redux/auth/authOperations";
import styles from "./Authorization.module.css";

const Authorization = ({ isOpen, onClose, mode = "login", onModeChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setTimeout(onClose, 300);
  };

  const handleSwitchMode = (newMode) => {
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    onModeChange(newMode);
  };

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (!formData.name.trim()) {
        setError("Ім'я є обов'язковим");
        return;
      }

      if (!validateEmail(formData.email)) {
        setError("Будь ласка, введіть коректну email адресу");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Паролі не співпадають");
        return;
      }
    }

    try {
      if (mode === "login") {
        const result = await dispatch(
          loginUser({
            email: formData.email,
            password: formData.password,
          })
        ).unwrap();

        if (result) {
          handleClose();
          navigate("/games");
        }
      } else {
        const result = await dispatch(
          registerUser({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          })
        ).unwrap();

        if (result) {
          handleClose();
          navigate("/games");
        }
      }
    } catch (error) {
      setError(error.message || "Виникла помилка при авторизації");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.backdrop} ${
        isVisible ? styles.backdropVisible : ""
      }`}
    >
      <div
        className={`${styles.modal} ${isVisible ? styles.modalVisible : ""}`}
      >
        <button className={styles.closeButton} onClick={handleClose}>
          ×
        </button>
        <h2 className={styles.title}>
          {mode === "login" ? "Вхід" : "Реєстрація"}
        </h2>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.form} onSubmit={handleSubmit}>
          {mode === "register" && (
            <input
              type="text"
              name="name"
              placeholder="Ім'я"
              className={styles.input}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className={styles.input}
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {mode === "register" && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Підтвердіть пароль"
              className={styles.input}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          )}
          <button type="submit" className={styles.submitButton}>
            {mode === "login" ? "Увійти" : "Зареєструватися"}
          </button>
        </form>
        <div className={styles.switchMode}>
          {mode === "login" ? (
            <p>
              Немає акаунту?{" "}
              <button
                type="button"
                onClick={() => handleSwitchMode("register")}
                className={styles.switchButton}
              >
                Зареєструватися
              </button>
            </p>
          ) : (
            <p>
              Вже є акаунт?{" "}
              <button
                type="button"
                onClick={() => handleSwitchMode("login")}
                className={styles.switchButton}
              >
                Увійти
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

Authorization.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["login", "register"]),
  onModeChange: PropTypes.func.isRequired,
};

export default Authorization;
