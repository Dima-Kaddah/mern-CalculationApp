const validateSignUp = (value) => {

  let errors = {};
  if (!value.name) {
    errors.name = 'Name is required';
  } else if (value.name.length < 3) {
    errors.name = 'Name need to be more than 3 characters';
  }
  if (!value.email) {
    errors.email = 'Email address is required';
  } else if (/^\S+@\S+\.\S+$/.test(value)) {
    errors.email = 'Email address is invalid or already exist';
  }
  if (!value.password) {
    errors.password = 'Password is required';
  } else if (value.password.length <= 6) {
    errors.password = 'Password need to be more than 6 characters';
  }

  return errors;
};

const validateSignIn = (value) => {

  let errors = {};
  if (!value.email) {
    errors.email = 'Email address is required';
  } else if (/^\S+@\S+\.\S+$/.test(value)) {
    errors.email = 'Email address is invalid or not exist';
  }
  if (!value.password) {
    errors.password = 'Password is required';
  } else if (value.password.length <= 6) {
    errors.password = 'Password need to be more than 6 characters';
  }

  return errors;
};

exports.validateSignUp = validateSignUp;
exports.validateSignIn = validateSignIn;
