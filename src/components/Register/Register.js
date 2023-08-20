import Form from "../Form/Form";

const Register = ({ handleRegistration, isLoading }) => {
  return (
    <Form
      formTitle="Добро пожаловать!"
      submitButtonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText="Войти"
      linkTo="/signin"
      isRegisterForm={true}
      onSubmit={handleRegistration}
      isLoading={isLoading}
    />
  );
};

export default Register;
