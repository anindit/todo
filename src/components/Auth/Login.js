import React, {Component,useState,useEffect,useRef} from 'react';
import axios from 'axios';
import {
  Redirect,
  Link
} from "react-router-dom";
import {logo} from '../../static/localimages';

function Login() {
  const [loginusername, setloginname] = useState('');
  const [loginpassword, setloginpass] = useState('');
  const [email_err, setemail_err] = useState('');
  const [pass_err, setpass_err] = useState('');
  const [err_msg, seterr_msg] = useState('');
  const [redirect, setredirect] = useState(0);

  useEffect(() => {
  },[]);



  function handleLogin(e){

    e.preventDefault();
    var error=0;
    if(loginusername=='')
    {
      error++;
      setemail_err('Email is Required!')
    }
  
    if(loginpassword=='')
    {
      error++
      setpass_err('Password is Required!')
    }
    if(error==0)
    {
      setemail_err('');
      setpass_err('');
      const loginuser = { email:loginusername,password: loginpassword};
      axios.post(`${window.$siteurl}/admin/users/login`, loginuser)
      .then((response) =>{
        if(response.data.status==1)
        {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userid', response.data.uid);
          localStorage.setItem('utype', response.data.utype);
          localStorage.setItem('loggedin', true);
       
         
          window.location = "/dashboard";
        
          setredirect(1)
        }        
        else{
          seterr_msg(response.data.msg)
         
        }
      })

    }
  }


  var loggedin= localStorage.getItem('loggedin'); 
  //console.log('loggedin---'+loggedin) 
  //console.log('redirect---'+redirect) 
if(loggedin)
{
  return <Redirect to="dashboard"/>
}
else{
      return (

          <div className="auth-main particles_js">
              <div className="auth_div vivify popIn">
                  <div className="auth_brand">
                      <a style={{'color':'#000'}} className="navbar-brand" href="javascript:void(0);"><img src={logo} width="30" height="30" className="d-inline-block align-top mr-2" alt=""/>Todo List</a>
                  </div>
                  <div className="card">
                      <div className="body">
                          <p className="lead">Welcome</p>
                          <form className="form-auth-small m-t-20" onSubmit={handleLogin}>
                          <div style={{'text-align': 'center','color': 'red'}}>{err_msg}</div>
                              <div className="form-group">
                                  <label for="signin-email" className="control-label sr-only">Email</label>
                                  <input type="email" onChange={(e) => setloginname(e.target.value)} className="form-control round" id="signin-email" value={loginusername} placeholder="Email"/>
                                  <div className="text-danger text-left">{email_err}</div>
                              </div>
                              <div className="form-group">
                                  <label for="signin-password" className="control-label sr-only">Password</label>
                                  <input type="password"  onChange={(e) => setloginpass(e.target.value)} className="form-control round" id="signin-password" value={loginpassword} placeholder="Password"/>
                                  <div className="text-danger text-left">{pass_err}</div>
                              </div>
                              
                              <button type="submit" className="btn btn-primary btn-round btn-block">LOGIN</button>
                           
                          </form>
                      </div>
                  </div>
              </div>
              <div id="particles-js"></div>
          </div>

          );
      }
  
     

}

export default Login;
