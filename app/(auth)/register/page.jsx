import Form from "@/components/Form/Form";
import styles from "./Register.module.css";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

function RegisterPage() {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
