import React, {useState} from "react";

export const AddPhoto = ({url, action}) => {

	const [active, setActive] = useState(false);


	const deleteHandler = () => {
		const {setFlag, setUrlObj} = action;

		setActive(true);


		const timer = setTimeout(() => {
			setFlag(false);
			setUrlObj('');
			clearTimeout(timer);
		}, 300);

	}

	return (
		<div className={active ? 'box active' : 'box'}>
			<span onClick={deleteHandler}>&times;</span>
			<img src={url} alt="img_png"/>
			<p>Главная фотография <br/>(обложка мероприятия)</p>
		</div>
	)
}