import React, {useEffect, useState} from 'react';

import {TalantNew} from "./TalantNew";



 export const Viziers = (props)=> {

	 const [data, setData] = useState(null)
	 const [isRender, setIsRender] = useState(false)
	 const [isDisabled, setIsDisabled] = useState(true)
	 const [isDisabledBtn, setIsDisabledBtn] = useState(false)
	 const [isSort, setIsSort] = useState("def")
	 const [changeSortTalant, setChangeSortTalant] = useState("0")

     const sultanId = props.match.params.id



//API /getAllViziers
	 useEffect( () => {


		 async function getAllViziers() {
			 setData(null)
			 setIsDisabled(true)
			 try {

				 const response = await fetch('/api/sultan/getAllViziers', {
					 method: 'post',
					 body: JSON.stringify({_id: sultanId}),
					 headers: {'Content-Type': 'application/json'},
					 mode: 'cors'
				 })

				 const json = await response.json();

				 console.log(json)


                 if (isSort==="min"){
					 json.viziers.sort(function (a,b) {
						 return a.talent[a.talent.length-1] - b.talent[b.talent.length-1]
					 })
					 setIsDisabledBtn(true)
					 setChangeSortTalant("0")
				 }
				 else if (isSort==="max"){
					 json.viziers.sort(function (a,b) {
						 return b.talent[b.talent.length-1] - a.talent[a.talent.length-1]
					 })
					 setIsDisabledBtn(true)
					 setChangeSortTalant("0")
				 }
				 else if (isSort==="from"){
					 json.viziers.map(function (viziers,index) {
						 if (Number(viziers.talent[viziers.talent.length-1])<changeSortTalant){
							 delete json.viziers[index]

						 }
						 // return json.viziers
					 })
					 setIsDisabled(false)
					 setIsDisabledBtn(true)

				 }
				 else if(isSort==="to"){
					 if (changeSortTalant === ''){
						 console.log('err')
					 }
					 json.viziers.map(function (viziers,index) {

						 if (Number(viziers.talent[viziers.talent.length-1])>changeSortTalant){
							delete  json.viziers[index]

						 }

					 })
					 setIsDisabled(false)
					 setIsDisabledBtn(true)
				 }
				 else if(isSort==="def"){

					 setIsDisabledBtn(false)
					 setChangeSortTalant("0")
				 }


				 setData(json.viziers)
				 setIsRender(false)



			 } catch (e) {
				 console.log('post error')
			 }
		 }

		 getAllViziers()


	 },[isRender,isSort,sultanId]);


//Update talants
	 function updateTalants(val, id) {
			data.map(function (obj) {
                if (obj.id===id){
				   obj.talent[obj.talent.length] = val
				}
                return data
			})
	 }

// API / addtalens
	 async function addTalants() {
		 try {

			 const response = await fetch('/api/sultan/addtalents', {
				 method: 'post',
				 body: JSON.stringify({data:data, id:sultanId}),
				 headers: {'Content-Type': 'application/json'},
				 mode: 'cors'
			 })
			 await response.json();
			 setIsRender(true)


		 } catch (e) {
			 console.log('post error')
		 }
	 }

	 //Sort talants
	 const sortChangeHandler = (event)=>{
          setIsSort(event.target.value)
		  setIsRender(true)
	 }




		if (data === null) {

			return (
				<div id ={sultanId} className="viziers">
					<p>Советники</p>
					<div className="progress">
						<div className="indeterminate"></div>

					</div>
					<p className="center">Пока нету советников</p>
				</div>
			);
		} else {

            let i =-1
			return (
				<div id={sultanId}  className="viziers">
					<h5>Советники</h5>

					<div className="viz-table">
						<table>
							<thead>
							<tr>
								<th></th>
								<th>Имя</th>
								<th>Талант</th>
							</tr>
							</thead>

							<tbody>
							{data.map(vizier => (

								<TalantNew key={vizier._id}
										   _id={sultanId+vizier.id}
										   id={vizier.id}
										   name={vizier.name}
										   talents={vizier.talent}
										   update={updateTalants}
										   index={i+1}

								/>
							))}
							</tbody>
						</table>
					</div>

                 	<div className="viz-footer">
						<div className="sort col s12 m12">

						<div className="sort-box" >
								<label className="black-text center">Сортировка Талантов</label>
							<div className="sort">
								<select  defaultValue={isSort}
										 onChange={sortChangeHandler}
										 className="browser-default"  >
									<option  value="def"  >Стандарт</option>
									<option  value="from"  >Таланты ОТ</option>
									<option  value="to"  >Таланты ДО</option>
									<option value="max" >Макс->Мин</option>
									<option value="min">Мин->Макс</option>
								</select>
								<input id="sortInput"
									placeholder={changeSortTalant}
									className="viz-input"
									type="number"
									onChange={(e) =>setChangeSortTalant(e.target.value)}
									   disabled={isDisabled}
								>

								</input>
								<button className=" sort-btn waves-effect waves-light "
										onClick={() => setIsRender(true)}
										disabled={isDisabled}

								><i className="material-icons black-text">send</i>
								</button>

							</div>
						</div>


						<div>
							<button
								className="btn-floating viz-btn waves-effect waves-light tooltipped"
								title="Сохранить при Стандартной сортировке"
								type="submit"
								name="action"
								onClick={addTalants}
								disabled={isDisabledBtn}

							><i className="material-icons black-text">post_add</i>
							</button>
						</div>

					</div>
					</div>

				</div>
			);

		}



}



