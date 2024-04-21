import { ValidateSingUp } from "@/lib/FormValidator";
import { registerNewUser } from "@/lib/db";

const sd = {
  statusInvalid: "invalid",
  statusValid: "valid",
  wrongRequesType: "wrong request type",
  userRegistered: "sing up successfull",
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const result = ValidateSingUp(data);
    if (result.status === "invalid") {
      return res.status(200).json({
        stats: sd.statusInvalid,
        message: result.message,
      });
    }
    // save recodt to database
    // registerNewUser(data);

    return res.status(200).json({
      stats: sd.statusValid,
      message: sd.userRegistered,
    });
  }
  res.status(400).json({
    stauts: sd.statusInvalid,
    message: sd.wrongRequesType,
  });
}
