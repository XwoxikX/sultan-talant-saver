import React, {useState} from 'react';
import cardimage from '../Images/SultanImage.png'
import {useHttp} from '../hooks/http.hook'


export const Card = (props) =>  {


	let id = props.id
	let btnid = id+1



	const {request} = useHttp()
	const [form, setForm] = useState({name:''})

	const changeHandler = event  => {
		setForm({...form, [event.target.name]:event.target.value})
	}

	//  /api/sultan/addsultan
	const createSultanHandler = async ()  => {
		try {
               await request('/api/sultan/addsultan','POST',{...form})


		}
		catch (e) {
			console.log('Зарос не прошел')
		}

        props.render(true)
		props.statusHandler(false)
	}

	//  /api/sultan/delsultan
	const deleteSultanHandler = async ()  => {
		try {
               await request('/api/sultan/delsultan','POST',{id})
		}
		catch (e) {
			console.log('Зарос не прошел')
		}
        props.render(true)
	}


    let vizpath = "/viziers"+id


	if (props.status=== 'new'){
		return (
			<div className="card small maincard col s11 m3">

				<div className="card-image">
					<img id="cardimage" src={cardimage} alt=""/>
				</div>
				<div className="card-stacked card-name">
					<div className="card-content ">
						<input id = 'sultaninput'
							   className="sultanName "
							   type="text"
							   name="name"
							   onChange={changeHandler}
						/>
						<p id='sultanname' className="sultan-visible hide "></p>
						<button
                            id='sultanbtn'
							className="btn-floating btn-large waves-effect waves-light sultan-btn "
							onClick={createSultanHandler}
						>

							<i className="material-icons card-btn-icon ">add</i></button>
					</div>
					<div className="card-action">
						<a href="/viziers">Советники</a>
					</div>
				</div>
			</div>
		);

	}else {


		return (
			<div id={id}
				 className="card small maincard col s11 m3"
			>
				<button  id={btnid}
					className="sultan-delete-btn"
						 onClick={deleteSultanHandler}
				><i className="material-icons   ">delete</i></button>

				<div className="card-image">
					<img id="cardimage" src={cardimage} alt=""/>
				</div>
				<div className="card-stacked card-name">
					<div className="card-content ">

						<p className="sultan-visible ">{props.name}</p>

					</div>
					<div className="card-action">
						<a href={vizpath}>Советники</a>
					</div>
				</div>
			</div>
		);
	}




}

