import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileUploadButton = () => {
  const fileInputRef = useRef(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const handleButtonClick = () => {
    // Programmatically trigger the file input click event
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Handle the selected file (you can upload it, process it, etc.)
    console.log('Selected file:', selectedFile.name);

    // Set the uploaded file name
    setUploadedFileName(selectedFile.name);

    // Show success notification
    toast.success(`File "${selectedFile.name}" uploaded successfully!`, {
      position: 'top-right',
      autoClose: 3000, // Duration of the notification in milliseconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div>
            {/* {uploadedFileName && (
        <div>
          <p> {uploadedFileName}</p>
        </div>
      )} */}

      <button className='bg-blue-100 text-green-500 font-bold p-2 px-4 rounded-md' onClick={handleButtonClick}>New Sales Invoice</button>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Display uploaded file name */}


      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
    </div>
  );
};

export default FileUploadButton;