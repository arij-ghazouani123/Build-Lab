import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

export default function ProjectsList() {
    // Fetch User projects
    const userId= localStorage.getItem("idfromtoken");
    const [data, setData] = useState([]);
    const [ids, setIds] = useState([]);

    const handleDeleteChange =async (event3) => {
        event3.preventDefault();
        const response7 =  fetch(`/deleteProject/${handleRowClick()}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          });
      };
    const handleAddId = (id) => {
      setIds((prevIds) => [...prevIds, id]);
    };    useEffect(() => {
        axios.get(`http://localhost:9090/myProjects/${userId}`)
        .then(res => {
            console.log(res);
            setData(res.data)
        })
        .catch( err => {
            console.log(err)
        })
    })

    localStorage.getItem("projectidid");
    localStorage.setItem("projectidid",data.idfromtoken );

    //fetch User Role 


/*const [role, setRole] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:9090/project/myRole/63ffb6dcb63179ea4458f112/63ff20b3f5330d6b2cb16d55`)
        .then(res => {
            console.log(res);
            setRole(res.role)
        })
        .catch( err => {
            console.log(err)
        })
    })*/
    function handleRowClick(id) {
        console.log(`Clicked on project ${id}`);
        localStorage.setItem('projectIdFromProjectLists', id);
        // Store the id in state or local storage
        return id
      }
    
    
    return (
        <table className="table table-hover" style={{ border: "3px solid black", margin: 30 }}>
            <thead>
                <tr className='table-info'>
                    <th scope="col"></th>
                    <th scope="col">App Name</th>
                    <th scope="col">OS</th>
                    <th scope="col">Platform</th>
                    <th scope="col">Role</th>
                    <th scope="col">Options</th>
                    
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id} >
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.opSystem}</td>
                    <td>{item.platform}</td>
                    <td>Mantainer</td>
                    <td>
                      <button type="button" class="btn btn-primary" >Update</button>
                      <button type="button" class="btn btn-danger" onClick={(event) => { handleRowClick(item._id);handleDeleteChange(event);
}}>Delete</button>
                      <button type="button" class="btn btn-primary" onClick={() => handleRowClick(item._id)} ><NavLink className="nav-link" to="/invitation">Invite</NavLink></button>
                      

                    </td>
                  </tr>
                ))}
            
                                
            </tbody>
           
        </table>
        
    );


}