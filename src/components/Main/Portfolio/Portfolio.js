import React from "react";
import "./Portfolio.css";

function Portfolio() {
  const projects = [
    {
      title: "Статичный сайт",
      link: "https://veronikagg.github.io/how-to-learn/",
    },
    {
      title: "Адаптивный сайт",
      link: "https://veronikagg.github.io/russian-travel/index.html",
    },
    {
      title: "Одностраничное приложение",
      link: "https://veronikagg.student.nomoredomains.monster",
    },
  ];

  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      {projects.map((project, index) => (
        <a
          key={index}
          href={project.link}
          className={`portfolio__link${
            index === projects.length - 1 ? " portfolio__last" : ""
          }`}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={`portfolio__container ${
              index === projects.length - 1 ? "portfolio__container-last" : ""
            }`}
          >
            <h2 className="portfolio__text">{project.title}</h2>
            <h2 className="portfolio__arrow">↗</h2>
          </div>
        </a>
      ))}
    </section>
  );
}

export default Portfolio;
