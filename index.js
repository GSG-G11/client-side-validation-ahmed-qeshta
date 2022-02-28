// ----- Helper Selector ---------------
const querySelector = (selector) => document.querySelector(selector);

const createElement = (tagName, className, parent) => {
  const element = document.createElement(tagName);
  element.className = className;
  parent.appendChild(element);
  return element;
};

const addListener = (selector, eventName, callback) => {
  querySelector(selector).addEventListener(eventName, callback);
};

const handleError = (id, errorId, message) => {
  const label = querySelector(id);
  const errorText = createElement('p', 'error', label);
  errorText.id = `${errorId}`;
  errorText.textContent = message;
};

const removeHandleError = (id) => {
  const errorText = querySelector(id);
  if (typeof errorText !== undefined && errorText !== null) {
    errorText.remove();
  }
};

const checkEmail = () => {
  const { value: email } = querySelector('#email');
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  removeHandleError('#email-label-error');
  if (!regexEmail.test(email) || email.length <= 0) {
    handleError(
      '#email-label',
      'email-label-error',
      'Please Enter a valid E-mail',
    );
  } else if (email.length <= 8 || email.length >= 100) {
    handleError(
      '#email-label',
      'email-label-error',
      'Email at least 8 characters,and less than 100 characters',
    );
  } else {
    return true;
  }
};

const checkPassword = () => {
  const { value: password } = querySelector('#password');
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  removeHandleError('#password-label-error');
  if (!regexPassword.test(password) || password.length <= 0) {
    handleError(
      '#password-label',
      'password-label-error',
      'Please Enter a valid Password,password has (0-9,a-z,A-Z,%!@#...)',
    );
  } else if (password.length <= 8 || password.length >= 255) {
    handleError(
      '#password-label',
      'password-label-error',
      'Password at least 8 characters,and less than 255 characters',
    );
  } else {
    return true;
  }
};

const checkConfirmPassword = () => {
  const { value: password } = querySelector('#password');
  const { value: confirmPassword } = querySelector('#confirmPassword');
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  removeHandleError('#confirm-password-label-error');
  if (confirmPassword != password) {
    handleError(
      '#confirm-password-label',
      'confirm-password-label-error',
      "Sorry! Your Passwords don't match",
    );
  } else if (confirmPassword.length <= 8 || confirmPassword.length >= 255) {
    handleError(
      '#confirm-password-label',
      'confirm-password-label-error',
      'Password at least 8 characters,and less than 255 characters',
    );
  } else if (
    !regexPassword.test(confirmPassword) ||
    confirmPassword.length <= 0
  ) {
    handleError(
      '#confirm-password-label',
      'confirm-password-label-error',
      'Please Enter a valid Password,password has (0-9,a-z,A-Z,%!@#...)',
    );
  } else {
    return true;
  }
};

const handleSubmitFrom = (event) => {
  if (checkEmail() || checkPassword() || checkConfirmPassword()) {
    event.preventDefault();
    console.log('done');
  } else {
    event.preventDefault();
    console.log('done_error');
  }
};

addListener('#email', 'focusout', checkEmail);
addListener('#password', 'focusout', checkPassword);
addListener('#confirmPassword', 'focusout', checkConfirmPassword);

addListener('form', 'submit', handleSubmitFrom);
