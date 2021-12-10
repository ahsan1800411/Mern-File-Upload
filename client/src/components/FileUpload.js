import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  const [uploadFile, setUploadFile] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const {
        data: { fileName, filePath },
      } = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadFile({ fileName, filePath });
    } catch (error) {
      if (error.response.status === 500) {
        console.log('There is an server error , Please try again.');
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            id='cutsomFile'
            className='custom-file-input'
            onChange={onChange}
          />
          <label htmlFor='customFile' className='custom-file-label'>
            {fileName}
          </label>
        </div>
        <input
          type='submit'
          className='btn btn-primary btn-block'
          value='Upload'
        />
      </form>
      <div className='row mt-5'>
        <div className='col-md-6 m-auto'>
          <h3 className='text-center'>{uploadFile.fileName}</h3>
          <img src={uploadFile.filePath} className='img-fluid' alt='Upload' />
        </div>
      </div>
    </>
  );
};

export default FileUpload;
