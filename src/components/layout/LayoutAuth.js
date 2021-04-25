
import React, {Component} from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

  import '../../static/assets/vendor/bootstrap/css/bootstrap.min.css';
  import '../../static/assets/vendor/font-awesome/css/font-awesome.min.css';
  import '../../static/assets/vendor/animate-css/vivify.min.css';
  import '../../static/html/assets/css/site.min.css';
  import Header from './Header';
  import Footer from './Footer';

function LayoutAuth(props) {  
    return (           
        <div>
            <Header/>                
            {props.children}
            <Footer/>
        </div> 
    )    
}
export default LayoutAuth;
