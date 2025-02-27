import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/auth/authOperations.js";
import { useNavigate } from "react-router-dom";
import styles from "./loginPage.module.css";
import PillImage from "../components/assets/pill.png";



const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    } else {
      console.error("Ошибка входа:", result.payload);
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
