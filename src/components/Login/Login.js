import Form from "../Form/Form";

const Login = ({ handleSignIn, isLoading }) => {
  return (
    <Form
      formTitle="Рады видеть!"
      submitButtonText="Войти"
      question="Ещё не зарегистрированы?"
      linkText="Регистрация"
      linkTo="/signup"
      isRegisterForm={false}
      onSubmit={handleSignIn}
      isLoading={isLoading}
    />
  );
};

export default Login;
