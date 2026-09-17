
const loginSchema = {
  username: { type: "string", allowSearch: false },
  password: { type: "string", allowSearch: false }
};

module.exports = {
  loginSchema
};