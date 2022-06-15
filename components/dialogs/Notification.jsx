
  import React from 'react';
  import PropTypes from 'prop-types';
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  const Notification = () => {
    return (
        <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    );
  };
  Notification.PropTypes = {
    open: PropTypes.boolean,
    handleClose: PropTypes.any,
  };
  export default Notification;
  