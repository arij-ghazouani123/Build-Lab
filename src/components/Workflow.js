import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Workflow(props) {

    const [workflowRuns, setWorkflowRuns] = useState([]);

// Fetch the workflow runs for the repository on component mount
useEffect(() => {
    axios.get('https://api.github.com/repos/Mondher19/Build/actions/runs', {
      headers: {
        Authorization: `Bearer ${"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"}`,
      },
    })
    .then(response => {
      setWorkflowRuns(response.data.workflow_runs);
  
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  
  





  
  return (
    <div>
       
       <table>
        <thead>
          <tr>
           
            <th>Event</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {workflowRuns.map(workflowRun => (
            <tr key={workflowRun.id}>
           
              <td>{workflowRun.event}</td>
              <td>{workflowRun.status}</td>
             

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Workflow;
