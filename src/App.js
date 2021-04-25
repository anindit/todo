import React,{useState,useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LayoutAuth from './components/layout/LayoutAuth';
import Login from '../src/components/Auth/Login';
import ProtectedRoute from './ProtectedRoute';

import LayoutInner from './components/layout/LayoutInner';
import Dashboard from '../src/components/Inner/Dashboard';
import Notes from '../src/components/Inner/Notes/Notes';
import Createnotes from '../src/components/Inner/Notes/Createnotes';

window.$siteurl = 'http://localhost:8080';
function App() {
  const [isAuth, checkisAuth] = useState(false);

  useEffect(() => {
    var loggedin= localStorage.getItem('loggedin'); 
    if(loggedin)
    {
      checkisAuth(true)
    }
    else{
      checkisAuth(false)
    }
    
  },[]);

  
  return (
    <Router>
   
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
       <Route path={["/dashboard","/notes","/notes/createnotes","/notes/editnote/:id"]}>
            <LayoutInner>    
              <Switch>                 
                <ProtectedRoute  path='/dashboard' component={Dashboard} isAuth={isAuth}/>
                <ProtectedRoute exact path='/notes' component={Notes} isAuth={isAuth}/>  
                <Route  path='/notes/createnotes' component={Createnotes} isAuth={isAuth}/>  
                <Route  path='/notes/editnote/:id' component={Createnotes} isAuth={isAuth}/> 
                  {/*<Route path='/users'>
                    <Users />
                  </Route> 
                  <Route path='/createuser'>
                    <Createuser />
                  </Route> 
                  <Route path='/edituser/:id' component={Createuser} />    
                  <Route path='/myprofile'>
                    <Myprofile onChangeName={(e)=>handleChangeName(e)} onChangePImage={(e)=>handleChangePImage(e)}/>
                  </Route>*/}
              </Switch>
            </LayoutInner>
         
       </Route> 
       <Route path={["/"]}>
          <LayoutAuth>    
            <Switch> 
                <Route path='/' exact>
                  <Login />
                </Route> 
            </Switch>
          </LayoutAuth>
        </Route>        
      </Switch>  
  </Router>
  );
}

export default App;
