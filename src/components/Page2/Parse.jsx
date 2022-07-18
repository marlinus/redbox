import React, {useEffect, useState} from "react";
import moment from 'moment';
import 'moment/locale/ru';

import address from '../../assets/address.png';
import date from '../../assets/date.png';
import time from '../../assets/time.png';
import tel from '../../assets/tel.png';
import email from '../../assets/email.png';

import './Parse.css';

export const Parse = () => {
	const [info, setInfo] = useState({});

	const backHandler = () => {
		window.location.pathname = '/';
	}

	useEffect(() => {
		try {
			const formData = window.localStorage.getItem('formData');
			if (formData) {
				setInfo(JSON.parse(formData));
			}
		} catch (e) {
			console.warn(e);
		}
	}, [])

	return (
		<>
			<h1 className='title'>Шаг 2</h1>
			<div className='warning'>
				<span className='warning-icon'>!</span>
				<p>Проверьте ваше мероприятие на наличие ошибок, если все в порядке - отправляйте на модерацию.</p>
			</div>
			<div className='main-description'>
				<div className='desc-one'>
					<div className='desc-one-left'>
						<span className='desc-one-left-rating'>{info['rating']}</span>
						<p>{info['title']}</p>
						<ul>
							<li className='address'>г. {info['city']}, ул. {info['address']}<img src={address} alt='address_png'/></li>
							<li className='date'>
								{moment(info['date-start']).format('D MMM YYYY (dd)')}, {moment(info['date-end']).format('D MMM YYYY (dd)')}
								<img src={date} alt='date_png'/></li>
							<li className='time'>{info['time-start']}, {info['time-end']} <img src={time} alt='time_png'/></li>
						</ul>
						<p className='contacts'>Контакты</p>
						<ul>
							<li className='phone'>{info['phone']} <img src={tel} alt='tel_png'/></li>
							<li className='email'>{info['email']} <img src={email} alt='email_png'/></li>
						</ul>
						<p className='organizer'>{info['organizer']}<span>Организатор мероприятия</span></p>
					</div>

					<div className='desc-one-right'>
						<img src={info['file']} alt="preview-img"/>
						{/*<div className='box'></div>*/}
					</div>
				</div>
				<div className='desc-two'>
					<p>{info['description']}</p>
				</div>
			</div>
			<div className="next-back">
				<button className="btn back" onClick={backHandler}>Назад</button>
				<button className='btn send'>Отправить на модерацию</button>
			</div>
		</>
	)
}