import React from 'react';


export const Talants = (props) =>  {
	let vizier = props


	const changeHandler = ()  => {
		let id = vizier.id
		let input = document.getElementsByTagName("input")[id-1].value
		props.update(input,id)
	}



	return(
		<li key={vizier._id} className="collection-item avatar">
			<img id={vizier.id+'img'} src={require(`../Images/viziers/${vizier.id}.png`)} alt="" className="circle vizier-img center"/>
			<div className="viz-content-box">
			<span className="title viz-title">{vizier.name}</span>

			<div className="viz-input-box">
				<label className="viz-lbl"> Таланты:</label>
				<input id={vizier._id+vizier.id}
					    placeholder={vizier.talents[vizier.talents.length-1]}
					   name='talent'
					onChange={changeHandler}
					   className="viz-input"

					   type="number"/>
			</div>
		</div>
		</li>

	)

}