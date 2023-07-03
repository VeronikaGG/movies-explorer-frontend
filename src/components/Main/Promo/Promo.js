import React from 'react';
import './Promo.css';
import NavTab from '../NavTab/NavTab';
import landinglogo from '../../../images/landing-logo.svg';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__content'>
        <div className='promo__content-text'>
          <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
          <p className='promo__caption'>Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</p>
        </div>
        <img className='promo__logo' src={landinglogo} alt='landinglogo' />
      </div>
      <NavTab />
    </section>
  );
}

export default Promo;
