import React, { useEffect, useState} from 'react';
import {Card} from "./Card";
import plus from "../Images/plus.svg";


export const Cards = () =>  {

    const [data, setData] = useState([])
    const [createStatus, setCreateStatus] = useState(false)
    const [isRender, setIsRender] = useState(false)



//API /getAllSultans
	useEffect( () => {

		async function getAllSultans() {
			try{
				const response = await fetch( '/api/sultan/getAllSultans');
				const json = await response.json();
				setData(json)
				setIsRender(false)
			}catch(e){}
		}
		getAllSultans()
	},[isRender]);

// Create New Card
	const createCard = () => {
		setCreateStatus(true)
	}

	function createStatusHandler (isCreate){setCreateStatus(isCreate)}
	function Rerender (isRender){setIsRender(isRender)}

		if (data[0] === undefined) {

			return (
						<div className="row s11 m12 maincards purple lighten-5 ">
							<div className="progress">
								<div className="indeterminate"></div>
							</div>
							<button className="card small createcard col s11 m2"
									onClick={createCard}
							>
								<img className="plus" src={plus} alt=""/>
							</button>
							{ createStatus && <Card status = 'new' statusHandler = {createStatusHandler}  render={Rerender} />}
							<p className="center"> Пока нету Султанов </p>
						</div>
			)
		} else {

			return(

				<div id='cards'
					 className="row s11 m12 maincards purple lighten-5 "
				>
					<button className="card small createcard col s11 m2"
							onClick={createCard}
					>
						<img className="plus" src={plus} alt=""/>
					</button>
					{createStatus && <Card status = 'new'
										   statusHandler = {createStatusHandler}
										   render={Rerender}
					/>}


						{data.map(sultan => (
							<Card  key={sultan._id}
								   id={sultan._id}
								   name={sultan.name}
								   render={Rerender}
							> </Card>
						))}

				</div>


		      )
		}


}



