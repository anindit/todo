import React, {Component,useState,useEffect} from 'react';
import axios from 'axios';
import {
  Redirect,
  Link
} from "react-router-dom";

function Createslot(props)
{
    const [slotnumber, setSlotNumber] = useState('');
  
    const [slotnumber_err, setslotnumber_err] = useState('');
    
    const [err_msg, seterr_msg] = useState('');
    const [redirect, setredirect] = useState(0);
    const [userData, getUserData] = useState([]);

    const [editslotsec, EditSlotSection] = useState(0);
    const [slotid, SetSlotId] = useState(0);

    const [submit_err, Submiterr] = useState('');

    
    useEffect(() => {
    
      //console.log(Object.keys(props).length)
      console.log(props)
      if(props.match.params.id)
      {
        EditSlotSection(1)
        SetSlotId(props.match.params.id)
        load_singleSlotData(props.match.params.id);
      
        
      }
      else{
        EditSlotSection(0);
        
      }
        
      },[]);

    

     

    function  load_singleSlotData(slotid)
    {

      var token = localStorage.getItem("token");
      const config = {
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
          params: {
            slotid: slotid,
          },
        };

      //console.log(config);
     // console.log(`${window.$siteurl}/admin/users/myprofiledata`)
      axios
          .get(`${window.$siteurl}/admin/slot/singleslotdata`, config)
      .then((response) =>{
        if(response.data.status==1)
        {
          console.log(response.data)

          setSlotNumber(response.data.result.slotnumber)
        
        }        
        else{
         // seterr_msg(response.data.msg)
         
        }
      })

    }


    function onFormSubmit(e) {
      e.preventDefault();

      var error=0;
      if(slotnumber=='')
      {
        error++;
        setslotnumber_err('Slot Number is Required!')
      }
    
      
      
     
      if(error==0)
      {
        setslotnumber_err('');
      //  notesdescerr_msg('');
       
        var token = localStorage.getItem("token");

        const formData = new FormData();
        var data={};
        if(editslotsec==0)
        {
          data = { 'slotnumber': slotnumber,'editslotsec':editslotsec,'slotid':0  };
        }
        else{
          data = { 'slotnumber': slotnumber,'editslotsec':editslotsec,'slotid':slotid  };
         
        }
    
        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(`${window.$siteurl}/admin/slot/insertslot`, data, config)
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
      return <Redirect to='/slot'  />
    }
    else{
      return (
        <div id="main-content" style={{'marginTop':0}}>
          <div className="container-fluid">
              <div className="block-header">
                  <div className="row clearfix">
                      <div className="col-md-6 col-sm-12">
                          <h1>{(slotid)?'Edit':'Create'} Slot</h1>
                         
                      </div>  
                  </div>
              </div>
              <div className="p-2 pull-right btn-primary"><Link style={{'color':'#fff'}} to="/slot">Back to Slot</Link></div>
              <div className="row clearfix">
              <div className="col-8">
              
                  <div className="table-responsive">
                      <form method="POST" onSubmit={(e)=>onFormSubmit(e)} >                       
                        <div class="form-row col-6">
                          <label for="exampleInputEmail1">Slot Number</label>                          
                          <input type="text" value={slotnumber} class="form-control bg-white text-dark" onChange={(e)=>setSlotNumber(e.target.value)}/>
                          <div className="text-danger text-left">{slotnumber_err}</div>
                        </div>
                       
                        <br/>
                        <div class="form-row col-6">
                          <div className="text-danger text-left">{submit_err}</div>
                          <div ><input className="p-2 pull-left btn-primary" type="submit" value={(slotid)?'Update':'Submit'}/></div>
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

export default Createslot;
