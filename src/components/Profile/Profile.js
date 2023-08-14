// import "./Profile.css";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import useFormValidation from "../hooks/useFormValidation";
// import { useContext, useEffect, useState } from "react";

// const Profile = ({ signOut, handleUserUpdate, isLoading }) => {
//   // Получение текущего пользователя из контекста
//   const currentUser = useContext(CurrentUserContext);

//   // Состояния компонента
//   const [name, setName] = useState(currentUser.name);
//   const [email, setEmail] = useState(currentUser.email);
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [isSimilarValues, setIsSimilarValues] = useState(true);

//   // Использование кастомного хука для управления формой
//   const { values, handleChange, errors, isValid, resetForm } =
//     useFormValidation();

//   // Обработчик отправки формы
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!isSimilarValues) {
//       handleUserUpdate({
//         name: name,
//         email: email,
//       });
//       resetForm();
//     }
//     setIsDisabled(true);
//   };

//   // Проверка на схожие значения полей
//   useEffect(() => {
//     let name = true;
//     let email = true;
//     if (values.name) {
//       name = values.name === currentUser.name;
//     }
//     if (values.email) {
//       email = values.email === currentUser.email;
//     }
//     setIsSimilarValues(name && email);
//   }, [values.name, values.email, currentUser.name, currentUser.email]);

//   // Обновление состояний name и email при изменении данных текущего пользователя
//   useEffect(() => {
//     if (!isLoading) {
//       setName(currentUser.name);
//       setEmail(currentUser.email);
//     }
//   }, [currentUser.email, currentUser.name, isLoading]);

//   // Обновление состояний name и email при изменении значений в форме
//   useEffect(() => {
//     if (values.name) {
//       setName(values.name);
//     }
//     if (values.email) {
//       setEmail(values.email);
//     }
//   }, [values.name, values.email]);

//   // Сброс формы при смене текущего пользователя
//   useEffect(() => {
//     if (currentUser) {
//       resetForm();
//     }
//   }, [currentUser, resetForm]);

//   // Обработчик кнопки редактирования
//   const handleEditButton = () => {
//     setIsDisabled(!isDisabled);
//   };

//   // Формирование класса для кнопки сохранения
//   const profileSubmitButtonClassName = `profile__submit-button links ${
//     isDisabled ? "profile__submit-button_disabled" : ""
//   } ${
//     !isValid || isLoading || isSimilarValues
//       ? "profile__submit-button_inactive"
//       : ""
//   }`;

//   return (
//     <section className="profile">
//       <form className="profile__form" onSubmit={handleSubmit}>
//         <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
//         <div className="profile__block">
//           <p className="profile__label">Имя</p>
//           <input
//             className={`profile__input ${
//               isDisabled || isLoading ? "profile__input_disabled" : ""
//             }`}
//             type="text"
//             name="name"
//             value={`${values.name ? values.name : name}`}
//             onChange={handleChange}
//             placeholder="Имя"
//             required
//             minLength="2"
//             maxLength="30"
//             pattern="^[a-zA-Zа-яёА-ЯЁ -]+$"
//           />
//         </div>
//         <span
//           className={`auth__input-error ${
//             errors.name && "auth__input-error_active"
//           }`}
//         >
//           {errors.name || ""}
//         </span>
//         <div className="profile__line"></div>
//         <div className="profile__block">
//           <p className="profile__label">E-mail</p>
//           <input
//             className={`profile__input ${
//               isDisabled || isLoading ? "profile__input_disabled" : ""
//             }`}
//             type="email"
//             name="email"
//             value={`${values.email ? values.email : email}`}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//             pattern="^\S+@\S+\.\S+$"
//           />
//         </div>
//         <span
//           className={`auth__input-error auth__input-error_email ${
//             errors.email && "auth__input-error_active"
//           }`}
//         >
//           {errors.email || ""}
//         </span>
//         <>
//           <button
//             className={profileSubmitButtonClassName}
//             type="submit"
//             disabled={!isValid || isLoading || isSimilarValues ? true : false}
//           >
//             Сохранить
//           </button>
//           <button
//             type="button"
//             onClick={handleEditButton}
//             className="profile__button profile__button_edit"
//           >
//             {isDisabled ? "Редактировать" : "Отменить"}
//           </button>
//           <button
//             type="button"
//             onClick={signOut}
//             className="profile__button profile__button_signout"
//           >
//             Выйти из аккаунта
//           </button>
//         </>
//       </form>
//     </section>
//   );
// };

// export default Profile;
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormValidation from "../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";

const Profile = ({ signOut, handleUserUpdate, isLoading }) => {
  // Получение текущего пользователя из контекста
  const currentUser = useContext(CurrentUserContext);

  // Использование кастомного хука для управления формой
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  // Состояние формы
  const [isDisabled, setIsDisabled] = useState(true);

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверяем, изменились ли значения имени и email
    if (
      values.name !== currentUser.name ||
      values.email !== currentUser.email
    ) {
      handleUserUpdate({
        name: values.name,
        email: values.email,
      });
    }

    setIsDisabled(true);
  };

  // Обновление значений в форме при загрузке или изменении данных текущего пользователя
  useEffect(() => {
    if (!isLoading) {
      resetForm({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [currentUser.email, currentUser.name, isLoading, resetForm]);

  // Обработчик кнопки редактирования
  const handleEditButton = () => {
    setIsDisabled(!isDisabled);
  };

  // Формирование класса для кнопки сохранения
  const profileSubmitButtonClassName = `profile__submit-button links ${
    isDisabled ? "profile__submit-button_disabled" : ""
  } ${!isValid || isLoading ? "profile__submit-button_inactive" : ""}`;

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <div className="profile__block">
          <p className="profile__label">Имя</p>
          <input
            className={`profile__input ${
              isDisabled || isLoading ? "profile__input_disabled" : ""
            }`}
            type="text"
            name="name"
            value={values.name || ""}
            onChange={handleChange}
            placeholder="Имя"
            required
            minLength="2"
            maxLength="30"
            pattern="^[a-zA-Zа-яёА-ЯЁ -]+$"
            disabled={isDisabled || isLoading}
          />
        </div>
        <span
          className={`auth__input-error ${
            errors.name && "auth__input-error_active"
          }`}
        >
          {errors.name || ""}
        </span>
        <div className="profile__line"></div>
        <div className="profile__block">
          <p className="profile__label">E-mail</p>
          <input
            className={`profile__input ${
              isDisabled || isLoading ? "profile__input_disabled" : ""
            }`}
            type="email"
            name="email"
            value={values.email || ""}
            onChange={handleChange}
            placeholder="Email"
            required
            pattern="^\S+@\S+\.\S+$"
            disabled={isDisabled || isLoading}
          />
        </div>
        <span
          className={`auth__input-error auth__input-error_email ${
            errors.email && "auth__input-error_active"
          }`}
        >
          {errors.email || ""}
        </span>
        <>
          <button
            className={profileSubmitButtonClassName}
            type="submit"
            disabled={!isValid || isLoading || isDisabled}
          >
            Сохранить
          </button>
          <button
            type="button"
            onClick={handleEditButton}
            className="profile__button profile__button_edit"
          >
            {isDisabled ? "Редактировать" : "Отменить"}
          </button>
          <button
            type="button"
            onClick={signOut}
            className="profile__button profile__button_signout"
          >
            Выйти из аккаунта
          </button>
        </>
      </form>
    </section>
  );
};

export default Profile;
