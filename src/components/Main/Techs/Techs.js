import React from "react";
import "./Techs.css";

function Techs() {
  const technologies = [
    "HTML",
    "CSS",
    "JS",
    "React",
    "Git",
    "Express.js",
    "mongoDB",
  ];

  return (
    <section className="techs-back" id="techs">
      <div className="techs">
        <h2 className="techs__name">Технологии</h2>
        <h2 className="techs__title">{`${technologies.length} технологий`}</h2>
        <h3 className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </h3>
        <div className="techs__info">
          {technologies.map((tech, index) => (
            <p key={index} className="techs__item">
              {tech}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Techs;
