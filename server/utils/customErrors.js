// Custom error constructor function

const customError = (code, message) => {
  const error = new Error(message);
  error.status = code;
  return error;
};

// Custom errors

const routeNotFound = () => customError(404, "Route not found.");

const invalidUserId = () =>
  customError(400, "Invalid user id. Must be a positive integer.");

const userIdNotFound = () => customError(404, "User id not found.");

const emailAlreadyInUse = () =>
  customError(409, "The email submitted is already in use.");

const relAlreadyRegistered = () =>
  customError(409, "Relationship already registered.");

const relNotAllowed = () => customError(409, "Relationship not allowed.");

const relNotFound = () => customError(404, "Relationship not found.");

const attributeIsNotString = (attributeName) =>
  customError(400, `Attribute ${attributeName} is undefined or not a string.`);

module.exports = {
  routeNotFound,
  emailAlreadyInUse,
  invalidUserId,
  userIdNotFound,
  relAlreadyRegistered,
  relNotAllowed,
  relNotFound,
  attributeIsNotString,
};
