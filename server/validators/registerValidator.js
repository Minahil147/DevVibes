// Validation middleware for user registration
// Exports: validateRegister(req, res, next)
const allowedRoles = ["user", "moderator", "admin", "owner"];

const isEmail = (email) => {
  return typeof email === "string" && /\S+@\S+\.\S+/.test(email);
};

const isStrongPassword = (pw) => {
  return (
    typeof pw === "string" &&
    pw.length >= 8 &&
    /[A-Za-z]/.test(pw) &&
    /\d/.test(pw)
  );
};

const validateRegister = (req, res, next) => {
  const errors = [];
  const {
    email,
    username,
    firstName,
    lastName,
    password,
    confirmPassword,
    role,
  } = req.body || {};

  if (!email) errors.push({ field: "email", message: "Email is required." });
  else if (!isEmail(email))
    errors.push({ field: "email", message: "Email is invalid." });

  if (!username)
    errors.push({ field: "username", message: "Username is required." });
  else if (typeof username !== "string" || username.length < 3)
    errors.push({
      field: "username",
      message: "Username must be at least 3 characters.",
    });

  if (!firstName)
    errors.push({ field: "firstName", message: "First name is required." });
  else if (typeof firstName !== "string" || firstName.trim().length === 0)
    errors.push({ field: "firstName", message: "First name cannot be empty." });

  if (!lastName)
    errors.push({ field: "lastName", message: "Last name is required." });
  else if (typeof lastName !== "string" || lastName.trim().length === 0)
    errors.push({ field: "lastName", message: "Last name cannot be empty." });

  if (!password)
    errors.push({ field: "password", message: "Password is required." });
  else if (!isStrongPassword(password))
    errors.push({
      field: "password",
      message:
        "Password must be at least 8 characters and include letters and numbers.",
    });

  if (!confirmPassword)
    errors.push({
      field: "confirmPassword",
      message: "Please confirm your password.",
    });
  else if (password && confirmPassword !== password)
    errors.push({
      field: "confirmPassword",
      message: "Passwords do not match.",
    });

  if (role && !allowedRoles.includes(role))
    errors.push({
      field: "role",
      message: `Role must be one of: ${allowedRoles.join(", ")}`,
    });

  if (errors.length)
    return res.status(400).json({ message: "Validation failed.", errors });

  req.body.email = String(email).trim().toLowerCase();
  req.body.username = String(username).trim();
  req.body.firstName = String(firstName).trim();
  req.body.lastName = String(lastName).trim();

  next();
};

module.exports = {
  validateRegister,
};
