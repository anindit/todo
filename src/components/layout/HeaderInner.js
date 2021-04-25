
import React, {Component,useState,useEffect,useContext} from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    withRouter
  } from "react-router-dom";

import {icon,avatar1,avatar2,avatar3,avatar5,us,gb,russia,arabia,france,avatar6,user,logo,noimage} from '../../static/localimages';

function HeaderInner(props) {
  const [isActive, setIsActive] = useState(false);
  const [showHide, setshowHide] = useState(false);
  useEffect(() => {
    load_userdata();
    //const { location } = props;
  console.log(props)
  },[]);

  function load_userdata()
  {    
    setIsActive(true);    
  }

  function ToggleButton()
  {
    if(showHide===true){
      setshowHide(false)
    }
    else{
      setshowHide(true);
    }
  }

  function logout() {

    const loginuser = { userid: localStorage.getItem('userid') };
    axios.post(`${window.$siteurl}/admin/users/logout`, loginuser)
      .then((response) => {
        if (response.data.status == 1) {
          //var l=localStorage.getItem('remember');
          localStorage.removeItem('loggedin');
          localStorage.removeItem('token');
          localStorage.removeItem('userid');
          // window.localStorage.clear();

          window.location = "/"

        }
        else {
         
        }
      })
  }

  return (
    <div>
       
        <div className="page-loader-wrapper" style={{"display":isActive==true?"none":"block"}}>
            <div className="loader">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
                <div className="bar4"></div>
                <div className="bar5"></div>
            </div>
        </div>
      
      
        <div className="overlay"></div>

        <div id="wrapper">

            <nav className="navbar top-navbar">
                <div className="container-fluid">

                    <div className="navbar-left">
                        <div className="navbar-btn">
                            <a href="index.html"><img src={logo} alt="Oculux Logo" class="img-fluid logo"/></a>
                            <button type="button" className="btn-toggle-offcanvas"><i className="lnr lnr-menu fa fa-bars"></i></button>
                        </div>                
                    </div>            
                
                </div>
                <div class="progress-container"><div className="progress-bar" id="myBar"></div></div>
            </nav>

            <div id="left-sidebar" className="sidebar">
                <div className="navbar-brand">
                    <a href="index.html"><img src={logo} alt="Todo Logo" className="img-fluid logo"/><span>Todo App</span></a>
                    <button type="button" className="btn-toggle-offcanvas btn btn-sm float-right"><i className="lnr lnr-menu icon-close"></i></button>
                </div>
                <div className="sidebar-scroll">
                    <div className="user-account">
                        <div className="user_div">
                        <img className="user-photo" src={noimage} />
                            
                        </div>
                        <div className="dropdown">
                            <span>Welcome,</span>
                            <a href="javascript:void(0);" onClick={ToggleButton} className="dropdown-toggle user-name" data-toggle="dropdown"><strong>Hello Admin</strong></a>
                            <ul className="dropdown-menu dropdown-menu-right account vivify flipInY" style={{"display":showHide==false?"none":"block"}}>
                                
                                <li><Link onClick={()=>logout()}><i className="icon-power"></i>Logout</Link></li>
                            </ul>
                        </div>                
                    </div>  
                    <nav id="left-sidebar-nav" className="sidebar-nav">
                        <ul id="main-menu" className="metismenu">                           
                            <li className="active open">
                                <Link to={"/dashboard/"} className="has-arrow"><i className="icon-home"></i><span>My Dashboard</span></Link>                               
                            </li>
                            <li>
                                <Link to={"/notes/"}><i className="icon-user"></i><span>Notes</span></Link>
                            </li>
                           
                        </ul>
                    </nav>     
                </div>
            </div>
        </div>
    </div>

    
  );

  

}

export default withRouter(HeaderInner);
