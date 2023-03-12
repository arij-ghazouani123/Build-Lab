import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NewProjectModal from './NewProjectModal';
import ProjectsList from './ProjectsList';
import Repositorie from '../components/RepositoriesSelect';
import "./Dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faProjectDiagram, faCog } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('build');

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h3>Dashboard</h3>
        </div>
        <ul className="list-unstyled components">
          <li className="">
            <NavLink to="#" className="nav-link" onClick={() => handleTabClick('overview')}>
              <FontAwesomeIcon icon={faHome} />
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="#" className="nav-link" onClick={() => handleTabClick('build')}>
              <FontAwesomeIcon icon={faProjectDiagram} />
              Build 
            </NavLink>
          </li>
          <li>
            <NavLink to="#" className="nav-link" onClick={() => handleTabClick('test')}>
              <i className="fas fa-project-diagram"></i>
              Test
            </NavLink>
          </li>
          <li>
            <NavLink to="#" className="nav-link" onClick={() => handleTabClick('distribute')}>
              <i className="fas fa-project-diagram"></i>
              Distribute
            </NavLink>
          </li>
          <li>
            <NavLink to="#" className="nav-link" onClick={() => handleTabClick('analytics')}>
              <i className="fas fa-project-diagram"></i>
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink to="#" className="nav-link" onClick={() => handleTabClick('settings')}>
              <FontAwesomeIcon icon={faCog} />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="content">
        {currentTab === 'overview' && (
          <h1>Overview</h1>
          
          // render overview content
        )}
        {currentTab === 'build' && (
            <div className="">
        <h1>Build</h1>
        <Repositorie></Repositorie>
      </div>
          
          // render build content
        )}
        {currentTab === 'test' && (
          <h1>Test</h1>
          // render test content
        )}
        {currentTab === 'distribute' && (
          <h1>Distribute</h1>
          // render distribute content
        )}
        {currentTab === 'analytics' && (
          <h1>Analytics</h1>
          // render analytics content
        )}
        {currentTab === 'settings' && (
          <h1>Settings</h1>
          // render settings content
        )}
      </div>
    </div>
  );
};

export default Dashboard;
