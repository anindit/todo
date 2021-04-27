import React, {Component,useState,useEffect} from 'react';
import axios from 'axios';
import {
  Redirect,
  Link
} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import moment from 'moment';

function Slot(props)
{

    const [allslots, getAllSlots] = useState([]);
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [slotnumber, setSlotNumber] = useState(''); 
    const [carnumber, setCarNumber] = useState(''); 
    const [submit_err, Submiterr] = useState('');
    const [submit_err_un, Submiterrun] = useState('');
    useEffect(() => {
    
        load_allslots();
      },[offset]);

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
              perPage:perPage,
              offset:offset
            },
          };

        console.log(config);
        axios
            .get(`${window.$siteurl}/admin/slot/allslots`, config)
        .then((response) =>{
          if(response.data.status==1)
          {
            getAllSlots(response.data.result);
            setPageCount(Math.ceil(response.data.resulttotalnotes.length / perPage))
          }        
          else{
           
          }
        })
    }

    const handlePageClick = (e) => {
      
      const selectedPage = e.selected;
     
      setOffset(selectedPage + 1)
  };
    function slotDelete(slotid,index)
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

        console.log(config);
        axios
            .get(`${window.$siteurl}/admin/slot/delslot`, config)
        .then((response) =>{
          //console.log(response.data)
          if(response.data.status==1)
          {
            let datas = allslots.filter((e, i) => i !== index);
            getAllSlots(datas);
          }  
          else if(response.data.status==2)
          {
            alert(response.data.msg)
          }           
          else{
          
           
          }
        })
    }

    function ShowcarNumber(id,car,carslotid)
    {
      if(car)
      {
        return(
          <p>{car} <Link onClick={()=>FreeSlot(id,carslotid)}>Free up this slot</Link></p>
        )

      }
      else{
        return 'NA';
      }

    }

    function FreeSlot(id,carslotid)
    {
      var token = localStorage.getItem("token");
      var data = { 'carslotid':carslotid,'id':id };
       const config = {
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
         },
       };
       axios
         .post(`${window.$siteurl}/admin/slot/freeslot`, data, config)
       .then((response) =>{
         console.log(response.data)
         if(response.data.status==1)
         {
          load_allslots()
         }        
         else{

           Submiterr(response.data.msg)
           load_allslots()
           
          
         }
       })
    }

    function Search_parkcar()
    {

      var error=0;
      
      if(carnumber=='')
      {
        Submiterr('Please enter car number!')
        
      }
      else{
        var token = localStorage.getItem("token");
       var data = { 'carnumber':carnumber,'type':1 };
        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(`${window.$siteurl}/admin/slot/searchslots`, data, config)
        .then((response) =>{
          console.log(response.data)
          if(response.data.status==1)
          {
            getAllSlots(response.data.result);
          }        
          else{

            Submiterr(response.data.msg)
            getAllSlots([])
            
           
          }
        })
      }

    }

    function Search_unparkcar()
    {

      var error=0;
      
      if(slotnumber=='')
      {
        Submiterr('Please enter slot number!')
        
      }
      else{
        var token = localStorage.getItem("token");
       var data = { 'slotnumber':slotnumber,'type':2 };
        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(`${window.$siteurl}/admin/slot/searchslots`, data, config)
        .then((response) =>{
          console.log(response.data)
          if(response.data.status==1)
          {
            getAllSlots(response.data.result);
          }        
          else{

            Submiterr(response.data.msg)
            getAllSlots([])
           
          }
        })
      }

    }
 
    return (
      <div id="main-content">
        <div className="container-fluid">
            <div className="block-header">
                <div className="row clearfix">
                    <div className="col-md-6 col-sm-12">
                        <h1>Slots</h1>
                    </div>  
                </div>
            </div>

            <div className="row clearfix">
            <div className="col-lg-12">
            <div className="p-2 pull-right btn-primary"> <Link style={{'color':'#fff'}} to="/slot/createslot">Create Slots</Link></div>
              </div>
              <div className="col-lg-8">
              <div className="row clearfix">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="form-group">
                         <div>Park a Car</div>
                          <input type="text" onChange={(e)=>setCarNumber(e.target.value)} className="form-control" placeholder="Car Number"/>
                        </div>
                    </div>                   
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="form-group">
                        <div style={{'marginTop':20}}></div>
                        <div className="btn btn-primary" onClick={()=>Search_parkcar()}>Search</div>
                      </div>
                    </div>
                </div>
                <div style={{'color':'red'}}>{submit_err}</div>
              </div>

              <div className="col-lg-8">
              <div className="row clearfix">
                   
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="form-group">
                        <div>Unpark a Car</div>
                          <input type="text" onChange={(e)=>setSlotNumber(e.target.value)} className="form-control" placeholder="Slot Number"/>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="form-group">
                        <div style={{'marginTop':20}}></div>
                        <div className="btn btn-primary" onClick={()=>Search_unparkcar()}>Search</div>
                      </div>
                    </div>
                </div>
                <div style={{'color':'red'}}>{submit_err_un}</div>
              </div>
              
            <div className="col-lg-12">
              
                
                <div className="table-responsive">
                    <table className="table table-hover table-custom spacing8">
                        <thead>
                            <tr> 
                                <th><b>#</b></th>
                                <th><b>Slot Number</b></th>
                                <th><b>Created Date (only current date)</b></th>
                                <th><b>Booked By</b></th>
                                <th className="text-center"><b>Action</b></th>
                            </tr>
                        </thead>
                        <tbody>

                            {(allslots.length>0)?allslots.map((slot,index) => (
                                 <tr>
                                    <td className="w60">
                                        {index+1}
                                       
                                    </td>
                                    <td>
                                       {slot.slotnumber}
                                    </td>                                    
                                    <td>
                                       {moment(slot.created).format('YYYY/MM/DD')}
                                    </td>  
                                    <td>
                                      {ShowcarNumber(slot._id,slot.carnumber,slot.carslotid)}
                                    </td>    
                                    
                                    <td className="text-center">
                                        <Link to={"/slot/editslot/" + slot._id}><i className="icon-pencil"></i></Link>
                                        <Link onClick={()=>slotDelete(slot._id,index)}><i className="icon-trash"></i></Link>
                                    </td>
                                </tr>
                            )):'No data available'}
                           
                           
                        </tbody>
                    </table>
                    {(allslots.length>10)?<ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>:''}
                </div>
            </div>
             
            </div>

        </div>
    </div>
    );
  
}

export default Slot;
