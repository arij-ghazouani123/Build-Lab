import React, { useState, useEffect } from "react";
import axios from "axios";

const BranchList = ({ match }) => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/octocat/${match.params.repo}/branches`)
      .then((response) => {
        setBranches(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [match.params.repo]);

  return (
    <div>
      <h1>List of Branches for {match.params.repo}</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Commit</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch.name}>
              <td>{branch.name}</td>
              <td>{branch.commit.sha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BranchList;
