import { useCallback, useState } from "react";

function useFormValidation() {
  // Состояние для хранения значений полей формы
  const [values, setValues] = useState({});

  // Состояние для хранения ошибок валидации полей формы
  const [errors, setErrors] = useState({});

  // Состояние для хранения информации о валидности всей формы
  const [isValid, setIsValid] = useState(false);

  // Обработчик изменения значений полей формы
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setValues({ ...values, [name]: value }); // Обновляем значения полей формы
    setErrors({ ...errors, [name]: e.target.validationMessage }); // Обновляем ошибки валидации
    setIsValid(e.target.closest("form").checkValidity()); // Проверяем валидность всей формы
  };

  // Функция сброса формы в начальное состояние
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  // Возвращаем значения и функции для работы с формой
  return { values, handleChange, errors, isValid, setIsValid, resetForm };
}

export default useFormValidation;
