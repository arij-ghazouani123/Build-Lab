import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './InviteForm.css';
const InviteForm = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const [errors, setErrors] = useState({});
  const  Project = localStorage.getItem("projectIdFromProjectLists");

  const handleContributorChange =async (event3) => {
    event3.preventDefault();
    const response7 =  fetch(`/addcontributortoproject/${Project}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role })
      });
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = {};

    if (email.trim() === '') {
      errors.email = 'Email is required';
    }
  
    if (Object.keys(errors).length === 0) {
      const senderemail = localStorage.getItem('emailformtoken');
      //recuperer l'id du projet -> projectname
      //const projectName = localStorage.getItem('projectID');
      const response2 = fetch(`/emailinvitation/${Project}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  email, role, senderemail }),
        
      });
      localStorage.setItem('EmailFromInvitation', JSON.stringify(email));
      localStorage.setItem('RoleFromInvitation', JSON.stringify(role));

    // Logic to send invitation using email, projectName and role
  }
  setErrors(errors);
  };
  return (
    <form className="invite-form-container" onSubmit={(event) => { handleSubmit(event);  handleContributorChange(event); }}>
    <label htmlFor="email" className="form-label">
      Email
    </label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      placeholder="Indiquez l'adresse email de la personne que vous souhaitez inviter pour votre projet."

    />
      {errors.email && <span className="error-message">{errors.email}</span>}   

    
    <label htmlFor="role" className="form-label">
      Role
    </label>
    <select
      id="role"
      value={role}
      onChange={(event1) => setRole(event1.target.value)}
      className="role-select"
    >
      <option value="Developer">Developer</option>
      <option value="Tester">Tester</option>
      <option value="Maintainer">Maintainer</option>

    </select>
    <button type="submit" onClick={(event) => {handleSubmit(event); handleContributorChange(event);}} className="btn-invite">
      Inviter
    </button>
  </form>
  );
};

export default InviteForm;