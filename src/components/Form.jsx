import React, {useEffect, useRef, useState} from "react";
import Inputmask from "inputmask";

import camera from '../assets/Camera.png';

import {AddData} from "./AddData";
import {Rating} from "./Rating";
import {AddPhoto} from "./AddPhoto";
import {AddDataItem} from "./AddDataItem";

export const Form = () => {

	useEffect(() => {
		const phone = document.querySelector('input[type="tel"]');
		Inputmask({mask: '+7(999) 999-99-99'}).mask(phone);
	}, []);

	const inpFile = useRef();
	const files = useRef();

	const [btn, setBtn] = useState(true);
	const [flag, setFlag] = useState(false);
	const [urlObj, setUrlObj] = useState('');
	const [dataBox, setDataBox] = useState([]);

	const changeFileHandler = event => {
		setFlag(false);
		setUrlObj('');

		const file = event.target.files[0];

		const reader = new FileReader();
		reader.addEventListener('load', event => {
			setUrlObj(`${event.target.result}`);
			setFlag(true);
		})
		reader.readAsDataURL(file);
	}

	const choosePhoto = event => {
		const {current: inp} = inpFile;
		inp.click();
	}

	const formHandler = event => {
		if (event.target.form.checkValidity()) {
			const form = new FormData(event.target.form);

			const temp = {};

			form.forEach((item, key) => {
				if (key === 'organizer' || key === 'city' || key === 'title' || key === 'description' || key === 'address') {
					const clear = item.trim();
					item = clear.slice(0, 1).toUpperCase() + clear.slice(1);
					temp[key] = item;
				} else {
					temp[key] = item.trim();
				}
			});

			if (urlObj) {
				temp['file'] = urlObj;
			}

			try {
				window.localStorage.setItem('formData', JSON.stringify(temp));
			} catch (e) {
				console.warn(e)
			}
			setBtn(false);

		} else setBtn(true);
	}

	const nextBtnHandler = event => {
		event.preventDefault();
		window.location.pathname = '/next';
	}

	const resetHandler = event => {
		event.preventDefault();
		event.target.form.reset();
		document.querySelector('.selected-files .box').remove();
		document.querySelector('.column').remove();
	}

	return (
		<>
			<h1 className='title'>Шаг 1</h1>
			<form name='description-form' onInput={formHandler} autoComplete="off">
				<p className='item-title'>Информация об организаторе</p>
				<label htmlFor="organizer">
					<p className='item-subtitle'>Организатор</p>
					<input type="text" id='organizer' name='organizer' required placeholder='Coca-Cola' autoComplete='off'/>
				</label>

				<p className='item-title'>Контактные данные</p>
				<div className="contacts">
					<label htmlFor="phone">
						<p className='item-subtitle'>Телефон</p>
						<input type="tel" id='phone' name='phone' required placeholder='+7(999)555-33-22' autoComplete='off'/>
					</label>
					<label htmlFor="email">
						<p className='item-subtitle'>E-mail</p>
						<input type='email' id='email' name='email' required placeholder='ivanov@mail.ru'/>
					</label>
					<label htmlFor="city">
						<p className='item-subtitle'>Город организатора</p>
						<input type='text' id='city' name='city' required placeholder='Казань'/>
					</label>
				</div>

				<p className='item-title'>Общая информация</p>
				<label htmlFor="title">
					<p className='item-subtitle'>Название</p>
					<input type="text" id='title' name='title' required/>
				</label>
				<label htmlFor="photo">
					<p className='item-subtitle'>Фотография</p>
					<div className="photo-wrapper">
						<div className="box choose-file" onClick={choosePhoto}>
							<img src={camera} alt="camera"/>
							<p>Главная фотография <br/>(обложка мероприятия)</p>
						</div>
						<div ref={files} className="selected-files">
							{flag ? <AddPhoto url={urlObj} action={{setFlag, setUrlObj}}/> : ''}
						</div>
					</div>
					<input
						ref={inpFile}
						type="file" hidden
						onChange={changeFileHandler} multiple={false} required
					/>
				</label>

				<p className='item-title'>Подробное описание</p>
				<label htmlFor="detailed-description">
					<textarea name="description" id="detailed-description" maxLength='512' required/>
				</label>

				<div className="data-box">
					{dataBox.map((item, ind) => {
						return <AddDataItem item={item} key={item.id} action={{dataBox, setDataBox}} id={item.id}/>
					})}
				</div>

				<AddData add={{dataBox, setDataBox}}/>

				<Rating />

				<div className="next-back">
					<button className="btn btn-cancel" onClick={resetHandler}>Отменить</button>
					<button className={btn ? 'btn btn-next' : 'btn btn-next active-btn'} disabled={btn} onClick={nextBtnHandler}>Далее</button>
				</div>
			</form>
		</>
	)
}