    import React from 'react'
    import Header from "./Components/Header"
    import {Cards} from "./Components/Cards"
    import {Viziers} from "./Components/Viziers"
    import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
    import {SultansContext} from "./context/SultantsConext";





    function App() {


      return (

             <div className="col s12 m12 l12 main">
               <Header></Header>
                 <SultansContext.Provider value={{
                    data: [], isCreateCardState:false,id:''
                 }}>
                 <BrowserRouter>
                     <Switch>
                         <Route path='/home' component={Cards} />
                         <Route path='/viziers:id' component={Viziers} />
                         <Redirect from='/' to='/home'/>
                     </Switch>
                 </BrowserRouter>
                 </SultansContext.Provider>
            </div>


      )
    }

    export default App;
