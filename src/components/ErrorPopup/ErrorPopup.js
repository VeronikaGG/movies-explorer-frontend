import { useNavigate } from 'react-router-dom';
import './ErrorPopup.css';

const ErrorPopup = () => {
  const navigate = useNavigate();

  return (
    <section className='error'>
      <h2 className='erorr__status'>404</h2>
      <p className='erorr__text'>Страница не найдена</p>
      <button
        className='error__button'
        onClick={() => {
          navigate(-1);
        }}
      >
        Назад
      </button>
    </section>
  );
};

export default ErrorPopup;
