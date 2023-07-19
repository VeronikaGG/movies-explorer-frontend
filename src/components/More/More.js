import React from "react";
import "./More.css";

const Futher = (props) => {
  function handleFuther(e) {
    e.preventDefault();
    props.Futher();
  }

  return (
    <section className="futher">
      <button type="button" className="futher__button" onClick={handleFuther}>
        Ещё
      </button>
    </section>
  );
};

export default Futher;
