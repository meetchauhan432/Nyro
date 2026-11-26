export function validateLogin({ mobile, password }) {
  const errors = {};

  if (!/^\d{10}$/.test(mobile.trim())) {
    errors.mobile = 'Enter a 10-digit mobile number.';
  }
  if (!password) {
    errors.password = 'Enter your password.';
  }

  return errors;
}