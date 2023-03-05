import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ProjectsList() {
    // Fetch User projects
    const userId='63ff20b3f5330d6b2cb16d55'
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:9090/project/myProjects/${userId}`)
        .then(res => {
            console.log(res);
            setData(res.data)
        })
        .catch( err => {
            console.log(err)
        })
    })



    //fetch User Role 


const [role, setRole] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:9090/project/myRole/63ffb6dcb63179ea4458f112/63ff20b3f5330d6b2cb16d55`)
        .then(res => {
            console.log(res);
            setRole(res.role)
        })
        .catch( err => {
            console.log(err)
        })
    })

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
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.opSystem}</td>
                        <td>{item.platform}</td>
                        <td>Mantainer</td>
                        <td> <button type="button" class="btn btn-primary" >Update</button>
                        <button type="button" class="btn btn-danger" >Delete</button></td>
                        
                        
                    </tr>
                ))}
            
                                
            </tbody>
        </table>
    );


}