import React from "react";
import date_img from "../assets/date.png";
import time_png from "../assets/time.png";

export const AddDataItem = ({item, action, id}) => {

	const deleteHandler = id => {
		const temp = action.dataBox.filter(item => item.id !== id);
		action.setDataBox(temp);
	}

	return (
		<div className='column'>
			<span onClick={() => deleteHandler(id)}>&times;</span>
			<label htmlFor="data-start">
				<p className='item-subtitle'>Дата начала</p>
				<input type="date" id='data-start' name='data-start' defaultValue={item['data-start']} required/>
				{/*<img src={date_img} alt="date-img"/>*/}
			</label>
			<label htmlFor="time-start">
				<p className='item-subtitle'>Время начала</p>
				<input type="time" id='time-start' name='time-start' min='00:00' max='23:59' required defaultValue={item['time-start']}/>
				{/*<img src={time_png} alt="date-img"/>*/}
			</label>
			<div className="line">
			</div>
			<label htmlFor="data-end">
				<p className='item-subtitle'>Дата окончания</p>
				<input type="date" id='data-end' name='data-end' defaultValue={item['data-end']} required/>
				{/*<img src={date_img} alt="date-img"/>*/}
			</label>
			<label htmlFor="time-end">
				<p className='item-subtitle'>Время окончания</p>
				<input type="time" id='time-end' name='time-end' min='00:00' max='23:59' required defaultValue={item['time-end']}/>
				{/*<img src={time_png} alt="date-img"/>*/}
			</label>
		</div>
	)
}