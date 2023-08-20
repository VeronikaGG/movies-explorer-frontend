import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import "../Form/Form.css";
import useFormValidation from "../hooks/useFormValidation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({
  formTitle,
  submitButtonText,
  question,
  linkTo,
  linkText,
  isRegisterForm,
  isLoggedIn,
  onSubmit,
  isLoading,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Используем кастомный хук useFormValidation для управления состоянием формы
  const { formValues, handleFormChange, formErrors, isFormValid, resetForm } =
    useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(formValues);
    }
  };

  // Сбрасываем форму, если пользователь успешно авторизовался
  useEffect(() => {
    if (isLoggedIn) resetForm();
  }, [isLoggedIn, resetForm]);

  // Перенаправляем пользователя на главную страницу после успешной авторизации
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/movies", { replace: true });
    }
  }, [navigate, isLoggedIn]);

  return (
    <section className="form">
      <Logo />
      <h2 className="form__title">{formTitle}</h2>
      <form className="form__form" onSubmit={handleSubmit}>
        {pathname === "/signup" && (
          <>
            <label className="form__label">Имя</label>
            <input
              className={`form__input ${
                isLoading ? "form__input_disabled" : ""
              }`}
              type="text"
              name="name"
              value={formValues.name || ""}
              onChange={handleFormChange}
              placeholder="Имя"
              required
              minLength="2"
              maxLength="30"
              pattern="/^[a-zA-Zа-яёА-ЯЁ -]+$/"
            />
            <span
              className={`form__input-error ${
                formErrors.name && "form__input-error_active"
              }`}
            >
              {formErrors.name || ""}
            </span>
          </>
        )}
        <label className="form__label">E-mail</label>
        <input
          className={`form__input ${isLoading ? "form__input_disabled" : ""}`}
          type="email"
          name="email"
          value={formValues.email || ""}
          onChange={handleFormChange}
          placeholder="Email"
          required
          pattern="^\S+@\S+\.\S+$"
        />
        <span
          className={`form__input-error ${
            formErrors.email && "form__input-error_active"
          }`}
        >
          {formErrors.email || ""}
        </span>
        <label className="form__label">Пароль</label>
        <input
          className={`form__input ${isLoading ? "form__input_disabled" : ""}`}
          type="password"
          name="password"
          minLength="6"
          value={formValues.password || ""}
          onChange={handleFormChange}
          placeholder="Пароль"
          required
        />
        <span
          className={`form__input-error ${
            formErrors.password && "form__input-error_active"
          }`}
        >
          {formErrors.password || ""}
        </span>
        <button
          className={`form__submit-button links ${
            !isFormValid && "form__submit-button_disabled"
          } 
					${isRegisterForm ? "" : "form__submit-button_margin"}`}
          type="submit"
          disabled={!isFormValid}
        >
          {submitButtonText}
        </button>
        <p className="form__question">
          {question}
          <Link className="form__link links" to={linkTo}>
            {linkText}
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Form;
