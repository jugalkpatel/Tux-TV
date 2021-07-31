const validateSignUpCredentials = (uname, email, password) => {
  const emailRegex = new RegExp(/[^@]+@[^@]+\.[a-zA-Z]{2,}/);
  const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  if (
    uname.length <= 20 &&
    uname.length >= 3 &&
    emailRegex.test(email) &&
    passwordRegex.test(password)
  ) {
    return true;
  }

  return false;
};

const validateLoginCredentials = (email, password) => {
  const emailRegex = new RegExp(/[^@]+@[^@]+\.[a-zA-Z]{2,}/);
  const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  if (emailRegex.test(email) && passwordRegex.test(password)) {
    return true;
  }

  return false;
};

export { validateLoginCredentials, validateSignUpCredentials };
