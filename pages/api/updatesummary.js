import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";
import { findPenById, updateSummary } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const credentials = await getServerSession(req, res, authOptions);

      if (!credentials) {
        return res
          .status(200)
          .json({ status: "invalid", message: "you are not authorized" });
      }

      const summary = req.body.summary;
      const penid = req.body.penid;
      const userid = credentials?.userData?.id;

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

      const result = updateSummary(penid, summary);

      return res
        .status(200)
        .json({ status: "valid", message: "summary updated successfull ..." });
    } catch (err) {
      console.log(err);
      return res
        .status(200)
        .json({ status: "invalid", messaeg: "internal server error" });
    }
  }
  return res
    .status(200)
    .json({ status: "invalid", messaeg: "internal server error ... " });
}
