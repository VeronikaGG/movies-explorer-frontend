import fail from "../../images/Fail.svg";
import success from "../../images/Success.svg";
import buttonclose from "../../images/close.svg";
import "./infoPopup.css";

function InfoPopup({ status, messageText, close, isOpened }) {
  return (
    <div className="infopopup__container">
      <img
        className="infopopup__image"
        alt="иконка"
        src={status ? success : fail}
      />
      <span className="infopopup__text">{messageText}</span>
      <button onClick={close} className="infopopup__button">
        <img className="mylogo link-style" src={buttonclose} alt="Крестик" />
      </button>
    </div>
  );
}

export default InfoPopup;
