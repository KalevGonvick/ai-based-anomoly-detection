import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import csv from 'csv';

// CSS of the CSV Dropzone component
const acceptStyle = {
    borderColor: '#00e676'
};
const rejectStyle = {
    borderColor: '#ff1744'
};
const baseStyle = {
    'flex': '1',
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'padding': '20px',
    'borderWidth': '2px',
    'borderRadius': '2px',
    'borderStyle': 'dashed',
    'backgroundColor': '#fafafa',
    'color': '#bdbdbd',
    'outline': 'none',
    'transition': 'border .24s ease-in-out',
};

const CSVDropzone = () => {
  const [files, setFiles] = useState([]);
  // List element of the the uploaded files
  const filesItem = files.length !== 0 ?
    files.map(file => <li key={file.path}>{file.name} - {file.size} bytes</li>) :
    <li key='default'>No files selected</li>;

  // Send CSV data to python server
  const sendFiles = (filesList) => {
    // Only sends data if all files are finished loading
    if (filesList.length !== files.length) { return; }
    const serverURL = 'http://fadsgagag.com';
    let filesObj = {'files': filesList};
    fetch(serverURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(filesObj)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Request Succeeded: ', data);
    })
    .catch((error) => {
      console.error('Request failed: ', error);
    });
  }

  // Event handler for when csv files are dropped in the dropzone
  const onDropAccepted = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
  }, []);

  // Upload button handler
  const onClick = () => {
    const filesList = [];
    // Extract the data from each csv file
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        csv.parse(reader.result, (err, data) => {
          let fileData = [];
          data.forEach(row => {
            // Convert data from string into integer
            let rowInt = row.map(numStr => parseInt(numStr));
            fileData.push(rowInt);
          });
          // Format data into object to jsonfy
          let fileObj = {'fileName': file.name, 'data': fileData};
          filesList.push(fileObj);
          sendFiles(filesList);
        });
      };
      reader.readAsBinaryString(file);
    });
  }

  // Dropzone attributes
  const { getRootProps, getInputProps, acceptedFiles, rejectedFiles } = useDropzone({
    onDropAccepted,
    accept: '.csv',
    minSize: 0,
  });

  // Dropzone dynamic css
  const style = useMemo(() => ({
    ...baseStyle,
    ...(rejectedFiles.length>0 && rejectStyle),
    ...((acceptedFiles.length !== 0 && rejectedFiles.length === 0) && acceptStyle),
  }), [
      acceptedFiles,
      rejectedFiles,
  ]);
  
  return (
    <div className="container text-center mt-5">
      <div style={style} {...getRootProps()}>
        <input {...getInputProps()} />
        { (acceptedFiles.length === 0 && rejectedFiles.length === 0) && 'Click here or drop a CSV file to upload' }
        { (acceptedFiles.length !== 0 && rejectedFiles.length === 0) && 'File(s) Selected' }
        { (rejectedFiles.length !== 0) && 'Invalid File(s)' }
      </div>
      <button onClick={onClick}>Upload</button>
      <aside>
        <h4>Files</h4>
        <ul>
          { filesItem }
        </ul>
      </aside>
    </div>
  );
};

export default CSVDropzone;