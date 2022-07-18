import React, {useRef, useState} from "react";
import {v4} from 'uuid';

import date_img from '../assets/date.png';
import time_png from '../assets/time.png';

export const AddData = ({add}) => {

	const dataChoose = useRef();

	const addDataHandler = event => {
		event.preventDefault();
		const children = [...dataChoose.current.children]
				.filter(item => !item.classList.contains('line'));

		if (children.every(item => item.children[1].value)) {
			// console.log('Yes');

			const temp = children.reduce((acc, item) => {
				const value = item.control.value;
				const key = item.control.id;
				acc[key] = value;
				return acc;
			}, {})

			temp['id'] = v4();

			add.setDataBox([...add.dataBox, temp]);
			// console.log(temp);
		}
	}

	const dataChooseHandler = event => {
		if (event.target.tagName !== 'IMG') return false;

		event.target.previousElementSibling.showPicker();
	}

	return (
		<>
			<div ref={dataChoose} className="data-choose" onClick={dataChooseHandler}>
				<label htmlFor="data-start">
					<p className='item-subtitle'>Дата начала</p>
					<input type="date" id='data-start' name='data-start' required/>
					<img src={date_img} alt="date-img"/>
				</label>
				<label htmlFor="time-start">
					<p className='item-subtitle'>Время начала</p>
					<input type="time" id='time-start' name='time-start' min='00:00' max='23:59' required/>
					<img src={time_png} alt="date-img"/>
				</label>
				<div className="line">
				</div>
				<label htmlFor="data-end">
					<p className='item-subtitle'>Дата окончания</p>
					<input type="date" id='data-end' name='data-end' required/>
					<img src={date_img} alt="date-img"/>
				</label>
				<label htmlFor="time-end">
					<p className='item-subtitle'>Время окончания</p>
					<input type="time" id='time-end' name='time-end' min='00:00' max='23:59' required/>
					<img src={time_png} alt="date-img"/>
				</label>
			</div>
			<button className='btn-add-date' onClick={addDataHandler}>+ Добавить дату</button>
		</>
	)
}