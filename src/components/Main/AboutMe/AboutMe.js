import React from "react";
import "./AboutMe.css";
import myPhoto from "../../../images/myface.jpeg";

function AboutMeSection() {
  return (
    <section className="about" id="about">
      <h2 className="about__title">Студент</h2>
      <div className="about__content">
        <div className="about__info">
          <h2 className="about__name">Вероника</h2>
          <h3 className="about__occupation">Фронтенд-разработчик, 32 года</h3>
          <h3 className="about__text">
            Я&nbsp;живу в&nbsp;городе Котельники, Московской области, закончила
            институт ВГУЮ (РПА Минюста России) по специальности юриспруденция.
            У&nbsp;меня есть муж и&nbsp;двое детей, мальчик и&nbsp;девочка.
            Я&nbsp;люблю слушать музыку, смотреть зарубежные фильмы
            и&nbsp;сериалы, посещаю фитнес зал и&nbsp;бассейн. С&nbsp;2014
            по&nbsp;2016 год работала в нотариальной конторе&nbsp;г. Москвы
            Ястребова Д.В, после ушла в&nbsp;декретный отпуск. В&nbsp;декрете
            прошла курс по веб-разработке от&nbsp;Яндекс Практикума.
          </h3>
          <a
            href="https://github.com/VeronikaGG"
            target="_blank"
            className="about__link"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="about__image" src={myPhoto} alt="Моя фотография"></img>
      </div>
    </section>
  );
}
export default AboutMeSection;
