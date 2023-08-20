import { useCallback, useState } from "react";

function useFormValidation() {
  // Состояние для хранения значений полей формы
  const [formValues, setFormValues] = useState({});

  // Состояние для хранения ошибок валидации полей формы
  const [formErrors, setFormErrors] = useState({});

  // Состояние для хранения информации о валидности всей формы
  const [isFormValid, setIsFormValid] = useState(false);

  // Обработчик изменения значений полей формы
  const handleFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormValues({ ...formValues, [name]: value }); // Обновляем значения полей формы
    setFormErrors({ ...formErrors, [name]: e.target.validationMessage }); // Обновляем ошибки валидации
    setIsFormValid(e.target.closest("form").checkValidity()); // Проверяем валидность всей формы
  };
  // Функция сброса формы в начальное состояние
  const resetForm = useCallback(
    (newFormValues = {}, newFormErrors = {}, newIsFormValid = false) => {
      setFormValues(newFormValues);
      setFormErrors(newFormErrors);
      setIsFormValid(newIsFormValid);
    },
    [setFormValues, setFormErrors, setIsFormValid]
  );
  // Возвращаем значения и функции для работы с формой
  return {
    formValues,
    handleFormChange,
    formErrors,
    isFormValid,
    setIsFormValid,
    resetForm,
  };
}
export default useFormValidation;
