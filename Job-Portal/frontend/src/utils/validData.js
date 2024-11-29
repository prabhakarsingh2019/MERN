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
    case "username":
      if (!value.trim()) {
        error = "Username is required e.g. johndoe";
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

export const validateEditField = (name, value) => {
  let error = "";

  switch (name) {
    case "fullName":
      error = value.trim() ? "" : "Full Name is required.";
      break;

    case "username":
      if (!value.trim()) {
        error = "Username is required.";
      } else if (value.length < 3) {
        error = "Username must be at least 3 characters.";
      }
      break;

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      error = value.trim()
        ? emailRegex.test(value)
          ? ""
          : "Invalid email format."
        : "Email is required.";
      break;

    case "linkedin":
    case "github":
      error =
        value.trim() && !value.startsWith("http") ? "Must be a valid URL." : "";
      break;

    case "contactNumber":
      const phoneRegex = /^[0-9]{10}$/;
      error =
        value.trim() && !phoneRegex.test(value)
          ? "Contact Number must be a valid 10-digit number."
          : "";
      break;

    case "bio":
      error = value.length > 500 ? "Bio cannot exceed 500 characters." : "";
      break;

    default:
      break;
  }

  return error;
};
