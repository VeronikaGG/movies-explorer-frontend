import Form from "../Form/Form";

const Register = ({ handleSignUp, isLoading }) => {
  return (
    <Form
      formTitle="Добро пожаловать!"
      submitButtonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText="Войти"
      linkTo="/signin"
      isRegisterForm={true}
      onSubmit={handleSignUp}
      isLoading={isLoading}
    />
  );
};

export default Register;
