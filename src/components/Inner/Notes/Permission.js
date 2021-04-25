import React, {Component,useState,useEffect} from 'react';
import axios from 'axios';
import {
  Redirect,
  Link
} from "react-router-dom";
import $ from "jquery";
import {icon,avatar1,avatar2,avatar3,avatar5,us,gb,russia,arabia,france,avatar6,user,logo,noimage} from '../../../static/localimages';

function Permission(props)
{
    const [resultmsg, getResultmsg] = useState('');
    const [errres, setError] = useState(0);
    const [allmodules, getAllModules] = useState([]);
    const [selectedmodules, getAllSelectedModules] = useState([]);

    const [permissionmodules, getAllUserpermissionModules] = useState([]);

    useEffect(() => {
     
        load_allmodules();
      },[]);

      useEffect(() => {
        
        getAllSelectedModules(selectedmodules)
        console.log('---selectedmodules---')

        console.log(selectedmodules)
    }, [selectedmodules]);

    useEffect(() => {
     
      setTimeout(() => getResultmsg(''), 1000);
      setTimeout(() => setError(1), 1000)
  }, [resultmsg]);

  useEffect(() => {
     
    getAllUserpermissionModules(permissionmodules);

    permissionmodules.map(module =>{
      //console.log('---module.permission_module_id----'+module.permission_module_id)
      //console.log('---module.permission_status----'+module.permission_status)
        if(module.permission_status===1)
        {          
          getAllSelectedModules(selectedmodules => ([...selectedmodules, module.permission_module_id]));
        }
      

    })

}, [permissionmodules]);

    function load_allmodules()
    {
      var userid=props.match.params.id;
        var token = localStorage.getItem("token");
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            params: {
              userid: userid,
            },
          };

        console.log(config);
        axios
            .get(`${window.$siteurl}/admin/users/allmodules`, config)
        .then((response) =>{
          if(response.data.status==1)
          {
            getAllUserpermissionModules(response.data.userpermission)
            getAllModules(response.data.result);
            $(".page-loader-wrapper").hide();
            //setProfileData(response.data.result)
            //console.log('---profileData---')
          // console.log(profileData)
            //console.log('----'+profileData.fl)

            console.log(permissionmodules)
          }        
          else{
           // seterr_msg(response.data.msg)
           
          }
        })
    }

    function handleModuleSelect(event)
    {
      let check = event.target.checked;
      let checked_module = event.target.value;
     console.log(selectedmodules)
      console.log(check)
      console.log(checked_module)
     
      if(check){      
        console.log(22222)
        getAllSelectedModules(selectedmodules => ([...selectedmodules, parseInt(checked_module)]));
         
      }else{ 
        console.log(111111)
        console.log(selectedmodules) 
        console.log(checked_module) 
          var index = selectedmodules.indexOf(parseInt(checked_module));     
          console.log(index)     
          
          if (index > -1) {
            console.log(3333)
            getAllSelectedModules(selectedmodules.filter(tool => tool != checked_module));
          
          }         
      }

    }

    function submitPermission()
    {
      var userid=props.match.params.id;

      if(selectedmodules.length>0)
      {
        const loginuser = { userid:userid,selectedmodules: selectedmodules};
        console.log(loginuser)
        axios.post(`${window.$siteurl}/admin/users/submitPermission`, loginuser)
        .then((response) =>{
          if(response.data.status==1)
          {
            getResultmsg(response.data.msg);
            setError(0)
          }        
          else{
            getResultmsg(response.data.msg);        
            setError(2)  
          }
        })
      }
      else{
        alert('Must select a module!')
      }
    }

    function err_msg_show()
    {
      console.log('==='+errres)
      if(errres==0)
      {
        return(
          <div style={{'color':'green'}}>{resultmsg}</div>
        )

      }
      else if(errres==2)
      {
        return(
          <div style={{'color':'red'}}>{resultmsg}</div>
        )
      }

      

    }

    function checkbox_section(id)
    {
      //console.log(permissionmodules)
     // console.log('---id----'+id)
      return permissionmodules.map(module =>{
        //console.log('---module.permission_module_id----'+module.permission_module_id)
        //console.log('---module.permission_status----'+module.permission_status)
          if((module.permission_module_id===id) && (module.permission_status===1))
          {
            
            return(
                <input type="checkbox" defaultChecked="true"  onClick={(e)=>handleModuleSelect(e)} value={id} aria-label="Checkbox for following text inputsss"/>
            )

          }
          else if((module.permission_module_id===id) && (module.permission_status!==1)){
            return(
              <input type="checkbox"  onClick={(e)=>handleModuleSelect(e)} value={id} aria-label="Checkbox for following text inputwww"/>
            )
          }

      })
    }


    return (
      <div id="main-content">
        <div className="container-fluid">
            <div className="block-header">
                <div className="row clearfix">
                    <div className="col-md-6 col-sm-12">
                        <h1>User Permissions</h1>
                    </div>  
                </div>
            </div>

            <div className="row clearfix">
            <div className="col-12">
                <div className="table-responsive">
                      {err_msg_show()}
                      <table className="table table-hover table-custom spacing8">
                          <thead>
                              <tr> 
                                  <th><b>#</b></th>
                                  <th><b>Module Name</b></th>
                                  <th><b>Module Action</b></th>                                
                                  <th className="text-center"><b>Action</b></th>
                              </tr>
                          </thead>
                          <tbody>

                              {allmodules.map((module,index) => (
                                  <tr>
                                      <td>{index+1}</td>
                                      <td className="w60">                                       
                                        {module.module_name}
                                      </td>
                                      <td>
                                        {module.module_action}
                                      </td>                                    
                                      <td className="text-center">

                                        {checkbox_section(module.id)}
                                        
                                          
                                      
                                      </td>
                                  </tr>
                              ))}
                            
                            
                          </tbody>
                      </table>
                      <button onClick={()=>submitPermission()} className="btn btn-primary">
                        <span className="">Submit</span>
                      </button>
                    
                </div>
            </div>
             
            </div>

        </div>
    </div>
    );
  
}

export default Permission;
