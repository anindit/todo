
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
  import '../../static/assets/vendor/c3/c3.min.css';
  import '../../static/html/assets/css/site.min.css';
  import HeaderInner from './HeaderInner';
  import FooterInner from './FooterInner';

function LayoutInner(props) {
  console.log(666)
        return (
           
            <div>
                <HeaderInner  />                
                {props.children}
                <FooterInner/>
            </div> 
           
          
            
        )
    
}
export default LayoutInner;
