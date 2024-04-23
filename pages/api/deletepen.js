import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";
import { deletePenById, findPenById } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const credentials = await getServerSession(req, res, authOptions);
      if (!credentials) {
        return res
          .status(200)
          .json({ status: "invalid", message: "you are not authorized" });
      }
      const userid = credentials?.userData?.id;
      const penid = req.body.penid;
      // console.log(userid, penid);
      // fetch pen data
      const pen = await findPenById(penid);
      if (!pen) {
        return res
          .status(200)
          .json({ status: "invalid", message: "pen not found" });
      }
      if (pen.authorid != userid) {
        return res
          .status(200)
          .json({ status: "invalid", message: "this is not your pen ..." });
      }
      // valid

      const result = await deletePenById(penid);

      return res
        .status(200)
        .json({ status: "valid", message: "pen deleted successfully" });
    } catch (err) {
      console.log(err);
      return res
        .status(200)
        .json({ status: "invalid", message: "internal sever error occured" });
    }

    return res
      .status(200)
      .json({ status: "valid", message: "pen delted successfully" });
  }
  return res.status(200).json({ status: "invalid", message: "invalid reques" });
}
