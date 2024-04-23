import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { findPenById, savePen } from "@/lib/db";
const sd = {
  statusInvalid: "invalid",
  statusValid: "valid",
  invalidSession: "invalid session",
  successmsg: "pen saved successfully !",
  errorOccured: "error occured",
};
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // protectin api route
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res
          .status(200)
          .json({ status: sd.statusValid, message: sd.invalidSession });
      }
      const credentials = req.body.credentials;
      const user = credentials?.data?.userData;
      if (!user || Object.keys(user).length == 0) {
        return res.status(400).json({ status: sd.statusInvalid });
      }

      const html = req.body.html;
      const css = req.body.css;
      const js = req.body.js;
      const title = req.body.title;
      const authorid = user.id;
      var result = await savePen({ html, css, js, title, authorid });

      return res
        .status(200)
        .json({ status: sd.statusValid, message: sd.successmsg });
    } catch (err) {
      console.log(err);
      return res
        .status(200)
        .json({ status: sd.statusInvalid, message: sd.errorOccured });
    }
  }
  if (req.method === "GET") {
    try {
      const { penid } = req.query;
      const pen = await findPenById(penid);
      return res.status(200).json({ status: sd.statusValid, pen });
    } catch (err) {
      console.log(err);
      return res.status(200).json({ status: sd.statusInvalid });
    }
  }
  return res
    .status(200)
    .json({ status: sd.statusInvalid, message: sd.errorOccured });
}
