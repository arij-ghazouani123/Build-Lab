import { useState, useEffect } from 'react';
import { Octokit } from "@octokit/rest";
import "./ArtifactList.css";
import RepositorySelect from './RepositoriesSelect';
import JSZip from 'jszip';

function Artifact(props) {
  const [artifacts, setArtifacts] = useState([]);

  const downloadArtifact = async (url, name) => {
    const headers = {
      Authorization: `Bearer ${"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"}`,
      Accept: 'application/vnd.github.v3+json',
    };
    const response = await fetch(url, { headers });
    const blob = await response.blob();
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;

    // Extract APK file from ZIP artifact
    const zip = await JSZip.loadAsync(blob);
    const apkFile = Object.values(zip.files).find(file => file.name.endsWith('.apk'));
    if (!apkFile) {
      console.error('APK file not found in artifact ZIP');
      return;
    }
    const apkBlob = await apkFile.async('blob');
    const apkHref = URL.createObjectURL(apkBlob);
    a.href = apkHref;
    a.download = apkFile.name;
    a.click();
  };

  useEffect(() => {
    const owner = 'Mondher19';
    const repo = 'Build';

    fetch(`https://api.github.com/repos/${owner}/${repo}/actions/artifacts?per_page=1&page=1`, {
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${"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"}`,
  },
})
      .then((response) => response.json())
      .then((data) => {
        setArtifacts(data.artifacts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  return (
    <div className="artifact-container">
  
      <ul className="artifact-list">
    
  
   
    <h1 className="artifact-heading">Your Releases</h1>
        {artifacts.map((artifact) => (        
          <li key={artifact.id}>
            <button className="artifact-button" onClick={() => downloadArtifact(artifact.archive_download_url, artifact.name)}>
              Download {artifact.name}
            </button>
          </li>
        ))}
      </ul>
     
    </div>
  );
}
export default Artifact;
