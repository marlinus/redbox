import React, {useEffect, useState} from "react";

export const Rating = () => {
	const [rating, setRating] = useState([]);

	useEffect(() => {
		fetch('http://testwork.rdbx24.ru/api/')
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setRating(data.result);
			})
			.catch(e => console.warn(e));

	}, [])

	return (
		<>
			<div className="rating">
				<label htmlFor="rating">
					<p className='item-title'>Рейтинг мероприятия</p>
					<select name="rating" id="rating" required>
						{rating.map(item => {
							return (
								<option
										value={item.title}
										key={item.id}>{item.title}
								</option>
							);
						})}
					</select>
				</label>
				<label htmlFor="address">
					<p className='item-title'>Адрес мероприятия</p>
					<input type="text" id='address' name='address' required/>
				</label>
			</div>
		</>
	)
}