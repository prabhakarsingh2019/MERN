export const validEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const validPassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  return regex.test(password);
};

export const validateData = (name, value) => {
  let error = "";
  switch (name) {
    case "fullName":
      if (!value.trim()) {
        error = "Full name is required e.g. Jhon Doe";
      }
      break;
    case "email":
      if (!value.trim()) {
        error =
          "please enter your email address is required e.g. jhondoe@example.com";
      } else if (!validEmail(value)) {
        error = "Invalid email address e.g. jhondoe@example.com";
      }
      break;
    case "password":
      if (!value.trim()) {
        error = "Password is required e.g. Jhon@123";
      } else if (!validPassword(value)) {
        error =
          "Password must be at least 8 characters long and contain at least one uppercase letter one lowercase letter, one number and one special character ";
      }
      break;
    default:
      break;
  }
  return error;
};
