const bcrypt = require("bcrypt");
const saltRounds = 12;
export async function encrypt(password) {
  var result = bcrypt.hash(password, saltRounds);
  return result;
}

export async function comparePassword(password, hash) {
  var result = await bcrypt.compare(password, hash);
  return result;
}
