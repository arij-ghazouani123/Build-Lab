import React from 'react';
import { NavLink } from 'react-router-dom';
import NewProjectModal from './NewProjectModal';
import ProjectsList from './ProjectsList';
import Repositorie from '../components/RepositoriesSelect';
import "./Dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faProjectDiagram, faCog } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h3>Dashboard</h3>
        </div>
        <ul className="list-unstyled components">
          <li className="">
          <NavLink to="#" className="nav-link">
                        <FontAwesomeIcon icon={faHome} />
                        All Apps
                        </NavLink>
          </li>
          <li>
          <NavLink to="#" className="nav-link">
            <FontAwesomeIcon icon={faProjectDiagram} />
            Manger 1 
            </NavLink>
          </li>
          <li>
            <NavLink to="#" className="nav-link">
              <i className="fas fa-project-diagram"></i>
              Manger 1 

            </NavLink>
          </li>
       
        </ul>
      </nav>

      <div className="content">
        <h1>Build</h1>
        <ProjectsList></ProjectsList>
      </div>
    </div>
  );
};

export default Dashboard;
