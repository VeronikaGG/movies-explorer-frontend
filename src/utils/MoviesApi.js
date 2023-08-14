import { MOVIES_URL } from "../utils/сonstants";

// Функция для получения списка фильмов
export const getMovies = () => {
  return fetch(`${MOVIES_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status); // Если запрос не успешен, отклоняем промис с кодом статуса
    })
    .catch((error) => {
      console.error("Ошибка при выборке фильмов:", error);
      return Promise.reject(error);
    });
};
