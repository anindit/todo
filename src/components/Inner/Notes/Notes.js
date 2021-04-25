import React, {Component,useState,useEffect} from 'react';
import axios from 'axios';
import {
  Redirect,
  Link
} from "react-router-dom";
import ReactPaginate from 'react-paginate';

function Notes(props)
{

    const [allnotes, getAllNotes] = useState([]);
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)
    
    useEffect(() => {
    
        load_allnotes();
      },[offset]);

    function load_allnotes()
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
            .get(`${window.$siteurl}/admin/notes/allnotes`, config)
        .then((response) =>{
          if(response.data.status==1)
          {
            getAllNotes(response.data.result);
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
    function noteDelete(noteid,index)
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

        console.log(config);
        axios
            .get(`${window.$siteurl}/admin/notes/delnote`, config)
        .then((response) =>{
          if(response.data.status==1)
          {
            let datas = allnotes.filter((e, i) => i !== index);
            getAllNotes(datas);
          }        
          else{
          
           
          }
        })
    }

    function handlePageChange()
    {

    }
 
    return (
      <div id="main-content">
        <div className="container-fluid">
            <div className="block-header">
                <div className="row clearfix">
                    <div className="col-md-6 col-sm-12">
                        <h1>Notes</h1>
                    </div>  
                </div>
            </div>

            <div className="row clearfix">
            <div className="col-12">
              <div className="p-2 pull-right btn-primary"> <Link style={{'color':'#fff'}} to="/notes/createnotes">Create Notes</Link></div>
              
                <div className="table-responsive">
                    <table className="table table-hover table-custom spacing8">
                        <thead>
                            <tr> 
                                <th><b>#</b></th>
                                <th><b>Title</b></th>
                                <th><b>Description</b></th>
                                <th className="text-center"><b>Action</b></th>
                            </tr>
                        </thead>
                        <tbody>

                            {(allnotes.length>0)?allnotes.map((note,index) => (
                                 <tr>
                                    <td className="w60">
                                        {index+1}
                                       
                                    </td>
                                    <td>
                                       {note.title}
                                    </td>                                    
                                    <td>
                                    {note.desciption}
                                    </td>
                                    
                                    <td className="text-center">
                                        <Link to={"/notes/editnote/" + note._id}><i className="icon-pencil"></i></Link>
                                        <Link onClick={()=>noteDelete(note._id,index)}><i className="icon-trash"></i></Link>
                                    </td>
                                </tr>
                            )):'No data available'}
                           
                           
                        </tbody>
                    </table>
                    {(allnotes.length>0)?<ReactPaginate
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

export default Notes;
