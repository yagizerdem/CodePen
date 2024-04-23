import { ValidateSingUp } from "@/lib/FormValidator";
import { getUserByEmail, registerNewUser } from "@/lib/db";
import { encrypt } from "@/lib/passwordHelper";

const sd = {
  statusInvalid: "invalid",
  statusValid: "valid",
  wrongRequesType: "wrong request type",
  userRegistered: "sing up successfull",
  alreadyRegistered: "user has already registered",
  internalServerError: "internal server error occured",
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const result = ValidateSingUp(data);
    if (result.status === "invalid") {
      return res.status(200).json({
        status: sd.statusInvalid,
        message: result.message,
      });
    }

    try {
      var user = await getUserByEmail(data.email);
    } catch (err) {
      console.log(err);
    }
    // user already defined
    if (user) {
      return res.status(200).json({
        status: sd.statusInvalid,
        message: sd.alreadyRegistered,
      });
    }

    // save recodt to database
    data.password = await encrypt(data.password);

    const register = await registerNewUser(data);
    if (!register) {
      return res.status(200).json({
        status: sd.statusInvalid,
        message: sd.internalServerError,
      });
    }
    return res.status(200).json({
      status: sd.statusValid,
      message: sd.userRegistered,
    });
  }
  res.status(400).json({
    status: sd.statusInvalid,
    message: sd.wrongRequesType,
  });
}
