const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const DEFAULT_ERROR = 500;

const handleError = (res, err) => {
  console.error(err);
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: "Invalid data supplied" });
  }
  if (err.code === 11000) {
    return res
      .status(CONFLICT)
      .send({ message: "A user with this email already exists" });
  }
  return res
    .status(DEFAULT_ERROR)
    .send({ message: "An error has occurred on the server" });
};

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  DEFAULT_ERROR,
  handleError,
};
