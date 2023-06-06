import React, { useState, useEffect } from 'react';
import './App.css';


function FileInfoTooltip({ file }) {
  return (
    <div className="file-info-tooltip">
      <p><strong>Name:</strong> {file.name}</p>
      <p><strong>Extension:</strong> {file.extension}</p>
      <p><strong>Size:</strong> {file.size}</p>
    </div>
  );
}

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [folderSelected, setFolderSelected] = useState(false);

  const handleFolderSelect = (event) => {
    const selectedFiles = event.target.files;

    if (selectedFiles.length > 0) {
      const fileArray = Array.from(selectedFiles);

      const sortedFiles = fileArray.map((file) => {
        const fileName = file.name.split('.').slice(0, -1).join('.');
        const extension = file.name.split('.').pop();
        const size = file.size;

        return {
          name: fileName,
          extension,
          size,
        };
      });

      setFiles(sortedFiles);
      setFolderSelected(true);
    }
  };

  const formatSize = (size) => {
    if (size < 1024) {
      return size + ' bytes';
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + ' kB';
    } else if (size < 1024 * 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(2) + ' MB';
    }
  };

  const handleInfoClick = (file) => {
    setSelectedFile(file);
  };

  const handleTooltipHover = (event, file) => {
    const tooltipX = event.clientX;
    const tooltipY = event.clientY;

    setTooltipPosition({ x: tooltipX, y: tooltipY });
    setSelectedFile(file);
    setShowTooltip(true);
  };

  const handleTooltipLeave = () => {
    setShowTooltip(false);
  };

  useEffect(() => {
    if (folderSelected) {
      document.body.classList.add('hide-background');
    } else {
      document.body.classList.remove('hide-background');
    }
  }, [folderSelected]);

  return (
    <div>
 <h1 class="heading">
  <img src="main.jpg" alt="Icon" className="icon" />
  Welcome and Choose the folder!
</h1>
      {folderSelected ? null : (
        <label htmlFor="folderInput" className="custom-button">
          Choose Folder
          <input
            id="folderInput"
            type="file"
            webkitdirectory=""
            directory=""
            onChange={handleFolderSelect}
            multiple
          />
        </label>
      )}

      {files.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>File Size</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{file.name}</td>
                <td>{formatSize(file.size)}</td>
                <td>
                  <button
                    onMouseEnter={(e) => handleTooltipHover(e, file)}
                    onMouseLeave={handleTooltipLeave}
                    className="info-button"
                  >
                    Info
                  </button>
                  {showTooltip && selectedFile === file && (
                    <div
                      className="tooltip-box"
                      style={{ top: tooltipPosition.y, left: tooltipPosition.x }}
                    >
                      <FileInfoTooltip file={selectedFile} />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
       
    </div>
  );
}

export default App;
