import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';
import history from '../../app/History';
import ExcelFileDrop from '../../app/components/FileDrop';
import getFileSize from '../../app/utilities/getFileSize';

const UploadVerificationData = (props) => {
  const {
    title,
    files,
    setUploadFiles,
    upload,
    setDateCurrentTo,
    dateCurrentTo,
  } = props;

  const removeFile = (removedFile) => {
    const found = files.findIndex((file) => (file === removedFile));
    files.splice(found, 1);
    setUploadFiles([...files]);
  };

  const handleCalendarChange = (event) => {
    const { value } = event.target;
    setDateCurrentTo(value);
  };

  return (
    <div id="upload-verification-data" className="page">
      <h2>{title}</h2>
      <p>ICBC data current to: {dateCurrentTo}</p>
      <div className="compact">
        <div className="bordered">
          <div className="content">
            <div className="panel panel-default">
              <ExcelFileDrop setFiles={setUploadFiles} maxFiles={1} />
              <div className="files">
                <div className="row">
                  <div className="col-7 header"><label htmlFor="filename">Filename</label></div>
                  <div className="col-3 size header"><label htmlFor="filesize">Size</label></div>
                  {/* <div className="col-2 size header"><label htmlFor="securityscan">Security<br />Scan</label></div> */}
                  <div className="col-2 actions header" />
                </div>
                {files.map((file) => (
                  <div className="row" key={file.name}>
                    <div className="col-7">{file.name}</div>
                    <div className="col-3 size">{getFileSize(file.size)}</div>
                    {/* <div className="col-2 size">
                      <div className="check" type="button">
                        <FontAwesomeIcon icon="check" />
                      </div>
                    </div> */}
                    <div className="col-2 actions">
                      <button
                        className="delete"
                        onClick={() => {
                          removeFile(file);
                        }}
                        type="button"
                      >
                        <FontAwesomeIcon icon="trash" />
                      </button>
                    </div>
                  </div>
                ))}

                <div>
                  <div className="row">
                    <label id="date-label" htmlFor="current-to">Date current to:</label>
                    <div>
                      <input
                        type="date"
                        id="date-current-to"
                        name="date-current-to"
                        onChange={handleCalendarChange}
                      />
                      <FontAwesomeIcon icon="calendar-alt" className="calendar-icon" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="action-bar">
                <span className="left-content">
                  <button
                    className="button"
                    onClick={() => {
                      history.goBack();
                    }}
                    type="button"
                  >
                    <FontAwesomeIcon icon="arrow-left" /> Back
                  </button>
                </span>

                <span className="right-content">
                  <button
                    disabled={files.length === 0}
                    className="button primary"
                    onClick={() => upload()}
                    type="button"
                  >
                    <FontAwesomeIcon icon="upload" /> Upload
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="clearfix" />
    </div>
  );
};

UploadVerificationData.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape).isRequired,
  setUploadFiles: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  upload: PropTypes.func.isRequired,
  setDateCurrentTo: PropTypes.func.isRequired,
  dateCurrentTo: PropTypes.string.isRequired,
};

export default UploadVerificationData;