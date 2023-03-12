import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [selectedRepository, setSelectedRepository] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showRepositoryModal, setShowRepositoryModal] = useState(false);
  const handleRepositoryModalClose = () => setShowRepositoryModal(false);
  const handleRepositoryModalShow = () => setShowRepositoryModal(true);
  const [downloadLink, setDownloadLink] = useState(null);
  const [buildProgress, setBuildProgress] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isBuildComplete, setIsBuildComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: `Bearer ${"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"}`,
      },
    })
    .then(response => {
      setRepositories(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);


  return (
    <div>
      <h1>List of Repositories</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <Link to={`/branches/${repo.name}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
