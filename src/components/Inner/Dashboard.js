import React, {Component,useState } from 'react';
import axios from 'axios';
import {
  Redirect,
  Link
} from "react-router-dom";
import {icon,avatar1,avatar2,avatar3,avatar5,us,gb,russia,arabia,france,avatar6,user} from '../../static/localimages';
function Dashboard()
{

    return (
      <div id="main-content">
        <div className="container-fluid">
           

            <div className="row clearfix">
                <div className="col-md-12">
                <h2>Welcome to Dashboard</h2>
                </div>
                
            </div>

        
        </div>
        
    </div>
    );
  
}

export default Dashboard;
