import React, {Component,useState,useEffect} from 'react';
import axios from 'axios';
import {
  Redirect,
  Link
} from "react-router-dom";

function Bookslot(props)
{
    const [slotnumber, setSlotNumber] = useState('');  
    const [slotnumber_err, setslotnumber_err] = useState('');

    const [carnumber, setCarNumber] = useState('');  
    const [carnumber_err, setCarNumber_err] = useState('');
    
    const [err_msg, seterr_msg] = useState('');
    const [redirect, setredirect] = useState(0);
    const [userData, getUserData] = useState([]);

    const [editslotsec, EditSlotSection] = useState(0);
    const [slotid, SetSlotId] = useState(0);
    const [submit_err, Submiterr] = useState('');
    const [allslots, getAllSlots] = useState([]);
    
    useEffect(() => {
    
      //console.log(Object.keys(props).length)
      console.log(props)
      if(props.match.params.id)
      {
        EditSlotSection(1)
        SetSlotId(props.match.params.id)
       
        
      }
      else{
        EditSlotSection(0);
        
      }
      load_allslots();
        
    },[]);

    function load_allslots()
    {
        var userid=localStorage.getItem('userid');
        var token = localStorage.getItem("token");
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            params: {
              userid: userid,
              perPage:50,
              offset:0
            },
          };

        console.log(config);
        axios
            .get(`${window.$siteurl}/admin/slot/unbookslot`, config)
        .then((response) =>{
          if(response.data.status==1)
          {
            

            if(response.data.result.length>0)
            {
              getAllSlots(response.data.result);
            }
            else{
              setslotnumber_err('All slots are booked!')
            }
          }        
          else{
           
          }
        })
    }
    
    
    function getSlots()
    {

      return allslots.map((slot,index) => {
           return(
            <option value={slot._id}>{slot.slotnumber}</option>
           )
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
      if(carnumber=='')
      {
        error++;
        setCarNumber_err('Car Number is Required!')
      }
      
      
     
      if(error==0)
      {
        setslotnumber_err('');
        setCarNumber_err('');
       
        var token = localStorage.getItem("token");

        const formData = new FormData();
        var data={}; 
        if(editslotsec==0)
        {
          data = { 'carnumber':carnumber,'slotnumber': slotnumber,'editslotsec':editslotsec,'slotid':0  };
        }
        else{
          data = { 'carnumber':carnumber,'slotnumber': slotnumber,'editslotsec':editslotsec,'slotid':slotid  };
         
        }
    
        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(`${window.$siteurl}/admin/slot/bookslot`, data, config)
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
                          <h1>Book Slot</h1>
                         
                      </div>  
                  </div>
              </div>
              <div className="p-2 pull-right btn-primary"><Link style={{'color':'#fff'}} to="/slot">Back to Slot</Link></div>
              <div className="row clearfix">
              <div className="col-8">
              
                  <div className="table-responsive">
                      <form method="POST" onSubmit={(e)=>onFormSubmit(e)} >                       
                        <div class="form-row col-6">
                          <label for="exampleInputEmail1">Car Number</label>   

                          <input type="text" value={carnumber} className="form-control bg-white text-dark" onChange={(e)=>setCarNumber(e.target.value)}/>
                          <div className="text-danger text-left">{carnumber_err}</div>
                        </div>

                        <div class="form-row col-6">
                          <label for="exampleInputEmail1">Select Slot Number</label> 
                          <select 
                          className="form-control bg-white text-dark"
                            value={slotnumber} 
                            onChange={(e)=>setSlotNumber(e.target.value)} 
                          >
                            <option value="">Please select</option>
                            {getSlots()}
                          </select>
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

export default Bookslot;
