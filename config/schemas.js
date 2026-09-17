const loginSchema = {
  username: { type: "string", allowSearch: false },
  password: { type: "string", allowSearch: false }
};

const productSearchSchema = {
  productName: { type: "string", allowSearch: true },
  category: { type: "string", allowSearch: false }
};

module.exports = {
  loginSchema,
  productSearchSchema
};