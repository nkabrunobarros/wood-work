//  Nodes
import React from 'react';
import ForgotPasswordScreen from '../components/pages/forgotpassword/forgot-password';

//  Navigation

//  PropTypes

//  Styling

const ForgotPassword = () => {
  const props = {
    client: true,
  };

  return <ForgotPasswordScreen {...props} />;
};

ForgotPassword.propTypes = {

};

export default ForgotPassword;
