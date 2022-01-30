import dbConnect from "@/lib/dbConnect";
import Activity from "../../../models/Activity.js";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const activities = await Activity.find();
        res.status(200).json({ success: true, data: activities });
      } catch (err) {
        res.status(400).json({ success: false, data: err });
      }
      break;
    case "POST":
      try {
        const activity = await Activity.create(req.body);
        res.status(201).json({ success: true, data: activity });
      } catch (err) {
        res.status(500).json({ success: false, data: err });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
