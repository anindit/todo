import React, {Component,useState,useEffect} from 'react';
import axios from 'axios';
import {
  Redirect,
  Link
} from "react-router-dom";

function Createnotes(props)
{
    const [notestitle, setNotestitle] = useState('');
    const [notesdesc, setNotesdesc] = useState('');
  
    const [notestitle_err, notestitleerr_msg] = useState('');
    const [notesdesc_err, notesdescerr_msg] = useState('');
    
    const [err_msg, seterr_msg] = useState('');
    const [redirect, setredirect] = useState(0);
    const [userData, getUserData] = useState([]);

    const [editnotesec, EditNoteSection] = useState(0);
    const [noteid, SetNoteId] = useState(0);

    const [submit_err, Submiterr] = useState('');

    const [current_resume, Curresume] = useState('');

    const [options, geAllSkills] = useState([]);
    const [userSkills, setSkills] = useState([]);
    const [optionservices, getAllServices] = useState([]);
    const [userServices, setServices] = useState([]);
    const [skillerr_err, setskillerr_msg] = useState('');
    const [serviceserr_err, setserviceserr_err] = useState('');
    
    useEffect(() => {
      //console.log(Object.keys(props).length)
      //console.log(props)
      if(props.match.params.id)
      {
        EditNoteSection(1)
        SetNoteId(props.match.params.id)
        load_singleNoteData(props.match.params.id);
      
        
      }
      else{
        EditNoteSection(0);
        
      }
        
      },[]);

    

     

    function  load_singleNoteData(noteid)
    {

   
      var token = localStorage.getItem("token");
      const config = {
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
          params: {
            noteid: noteid,
          },
        };

      //console.log(config);
     // console.log(`${window.$siteurl}/admin/users/myprofiledata`)
      axios
          .get(`${window.$siteurl}/admin/notes/singlenotedata`, config)
      .then((response) =>{
        if(response.data.status==1)
        {
          console.log(response.data)

          setNotestitle(response.data.result.title)
          setNotesdesc(response.data.result.desciption)
        
        }        
        else{
         // seterr_msg(response.data.msg)
         
        }
      })

    }


    function onFormSubmit(e) {
      e.preventDefault();

      var error=0;
      if(notestitle=='')
      {
        error++;
        notestitleerr_msg('Title is Required!')
      }
    
      if(notesdesc=='')
      {
        error++
        notesdescerr_msg('Description is Required!')
      }
      
     
      if(error==0)
      {
        notestitleerr_msg('');
        notesdescerr_msg('');
       
        var token = localStorage.getItem("token");

        const formData = new FormData();
        var data={};
        if(editnotesec==0)
        {
          data = { 'notestitle': notestitle,'notesdesc':notesdesc,'editnotesec':editnotesec,'noteid':0  };
        }
        else{
          data = { 'notestitle': notestitle,'notesdesc':notesdesc,'editnotesec':editnotesec,'noteid':noteid };
         
        }
    
        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(`${window.$siteurl}/admin/notes/insertnote`, data, config)
        .then((response) =>{
          console.log(response.data)
          if(response.data.status==1)
          {
            setredirect(1);
          }        
          else{

            Submiterr(response.data.msg)
            
           
          }
        })
      }
    }
 
    
    if(redirect==1)
    {
      return <Redirect to='/notes'  />
    }
    else{
      return (
        <div id="main-content" style={{'marginTop':0}}>
          <div className="container-fluid">
              <div className="block-header">
                  <div className="row clearfix">
                      <div className="col-md-6 col-sm-12">
                          <h1>{(noteid)?'Edit':'Create'} Notes</h1>
                         
                      </div>  
                  </div>
              </div>
              <div className="p-2 pull-right btn-primary"><Link style={{'color':'#fff'}} to="/notes">Back to Notes</Link></div>
              <div className="row clearfix">
              <div className="col-8">
              
                  <div className="table-responsive">
                      <form method="POST" onSubmit={(e)=>onFormSubmit(e)} >                       
                        <div class="form-row col-6">
                          <label for="exampleInputEmail1">Title</label>                          
                          <input type="text" value={notestitle} class="form-control bg-white text-dark" onChange={(e)=>setNotestitle(e.target.value)}/>
                          <div className="text-danger text-left">{notestitle_err}</div>
                        </div>
                        <div class="form-row col-6">
                          <label for="exampleInputEmail1">Description</label>                           
                          <textarea value={notesdesc} class="form-control bg-white text-dark" onChange={(e)=>setNotesdesc(e.target.value)}></textarea>
                          <div className="text-danger text-left">{notesdesc_err}</div>
                        </div>
                       
                        <br/>
                        <div class="form-row col-6">
                          <div className="text-danger text-left">{submit_err}</div>
                          <div ><input className="p-2 pull-left btn-primary" type="submit" value={(noteid)?'Update':'Submit'}/></div>
                        </div>
                        
                      </form>
                      
                  </div>
              </div>
              
              </div>

          </div>
      </div>
      );
    }
  
}

export default Createnotes;
