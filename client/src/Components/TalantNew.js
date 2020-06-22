import React from 'react';


export const TalantNew = (props) =>  {

	let vizier = props


	const changeHandler = ()  => {
		let id = vizier.id
		let input = document.getElementById(vizier._id+vizier.id).value
		props.update(input,id)
	}




	return (



				<tr key={vizier._id}>
					<td ><img id={vizier.id+'img'}
							 src={require(`../Images/viziers/${vizier.id}.png`)}
							 alt="" className="circle vizier-img center"
					/></td>
					<td>{vizier.name}</td>
					<td>
						<input id={vizier._id+vizier.id}
								 placeholder={vizier.talents[vizier.talents.length-1]}
								 name='talent'
								 onChange={changeHandler}
								 className="viz-input"
								 type="number"
						/>
					</td>
				</tr>



		);

}


