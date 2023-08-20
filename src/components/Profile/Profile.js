import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormValidation from "../hooks/useFormValidation";

const Profile = ({
  handleSignOut,
  updateUserProfile,
  isLoading,
  isResOk,
  profileMessage,
  setProfileMessage,
}) => {
  // Получение текущего пользователя из контекста
  const currentUser = useContext(CurrentUserContext);

  // Использование кастомного хука для управления формой
  const { formValues, handleFormChange, formErrors, isFormValid, resetForm } =
    useFormValidation();

  // Состояние формы: заблокирована ли форма для редактирования
  const [isDisabled, setIsDisabled] = useState(true);

  // Обработчик отправки формы
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Проверяем, изменились ли значения имени и email
    if (
      formValues.name !== currentUser.name ||
      formValues.email !== currentUser.email
    ) {
      updateUserProfile({
        name: formValues.name,
        email: formValues.email,
      }); // Вызываем функцию обновления данных пользователя
    }
    setIsDisabled(true); // Блокируем форму после отправки
  };

  useEffect(() => {
    setProfileMessage(false); // Скрываем сообщение о профиле при загрузке компонента
  }, []);

  useEffect(() => {
    if (!isLoading) {
      resetForm({
        name: currentUser.name,
        email: currentUser.email,
      }); // Сбрасываем значения формы на текущие данные пользователя
    }
  }, [currentUser.email, currentUser.name, isLoading, resetForm]);

  // Обработчик кнопки редактирования
  const toggleFormEditState = () => {
    setProfileMessage(false); // Скрываем сообщение о профиле
    setIsDisabled(!isDisabled); // Переключаем состояние блокировки формы
  };

  // Формируем класс для кнопки сохранения с учетом состояния формы
  const submitButtonClass = `profile__submit-button links ${
    isDisabled ? "profile__submit-button_disabled" : ""
  } ${!isFormValid || isLoading ? "profile__submit-button_inactive" : ""}`;

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleFormSubmit}>
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <div className="profile__content">
          <p className="profile__label">Имя</p>
          <input
            className={`profile__input ${
              isDisabled || isLoading ? "profile__input_disabled" : ""
            }`}
            type="text"
            name="name"
            value={formValues.name || ""}
            onChange={handleFormChange}
            placeholder="Имя"
            required
            minLength="2"
            maxLength="30"
            disabled={isDisabled || isLoading}
          />
        </div>
        <span
          className={`auth__input-error ${
            formErrors.name && "auth__input-error_active"
          }`}
        >
          {formErrors.name || ""}
        </span>
        <div className="profile__line"></div>
        <div className="profile__content">
          <p className="profile__label">E-mail</p>
          <input
            className={`profile__input ${
              isDisabled || isLoading ? "profile__input_disabled" : ""
            }`}
            type="email"
            name="email"
            value={formValues.email || ""}
            onChange={handleFormChange}
            placeholder="Email"
            required
            disabled={isDisabled || isLoading}
          />
        </div>
        <span
          className={`auth__input-error auth__input-error_email ${
            formErrors.email && "auth__input-error_active"
          }`}
        >
          {formErrors.email || ""}
        </span>
        <>
          {profileMessage && (
            <span
              className={`profile__span ${isResOk && "profile__span_visible"}`}
            >
              {isResOk ? "Данные успешно обновлены!" : "Попробуйте еще раз."}
            </span>
          )}
          <button
            className={submitButtonClass}
            type="submit"
            disabled={!isFormValid || isLoading || isDisabled}
          >
            Сохранить
          </button>
          <button
            type="button"
            onClick={toggleFormEditState}
            className="profile__button profile__button_edit"
          >
            {isDisabled ? "Редактировать" : "Отменить"}
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="profile__button profile__button_exit"
          >
            Выйти из аккаунта
          </button>
        </>
      </form>
    </section>
  );
};

export default Profile;
