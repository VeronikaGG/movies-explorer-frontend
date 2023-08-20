import Form from "../Form/Form";

const Login = ({ handleLogin, isLoading }) => {
  return (
    <Form
      formTitle="Рады видеть!"
      submitButtonText="Войти"
      question="Ещё не зарегистрированы?"
      linkText="Регистрация"
      linkTo="/signup"
      isRegisterForm={false}
      onSubmit={handleLogin}
      isLoading={isLoading}
    />
  );
};

export default Login;
