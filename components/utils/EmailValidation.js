/* eslint-disable no-useless-escape */

function EmailValidation(email) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (regex.test(email) === false) {
    return false;
  }
  return true;
}

export {
  EmailValidation
};