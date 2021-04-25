
import React, {Component} from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";


function Header() {  
  
  return (
    <div>
      <div className="page-loader-wrapper" style={{"display":"none"}}>
        <div className="loader">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
        </div>
      </div>
      
      <div className="pattern">
          <span className="red"></span>
          <span className="indigo"></span>
          <span className="blue"></span>
          <span className="green"></span>
          <span className="orange"></span>
      </div>
    </div>
    
  );

}

export default Header;
