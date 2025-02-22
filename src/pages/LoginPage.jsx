import LoginForm from "../components/auth/LoginForm";
import styles from "./loginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Medicine Store</h1>
      <p>Please sign in to continue</p>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
