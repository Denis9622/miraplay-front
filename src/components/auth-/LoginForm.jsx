import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./loginForm.module.css";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input type="email" placeholder="Email" {...register("email")} />
      <p>{errors.email?.message}</p>

      <input type="password" placeholder="Password" {...register("password")} />
      <p>{errors.password?.message}</p>

      <button type="submit">Log In Now</button>
    </form>
  );
};

export default LoginForm;
