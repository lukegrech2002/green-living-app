import dbConnect from "@/lib/mongodb";
import Activity from "../../../models/Activity";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const activity = await Activity.findById(id);
        if (!activity) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: activity });
      } catch (err) {
        res.status(400).json({ success: false, data: err });
      }
      break;
    case "PUT":
      try {
        const activity = await Activity.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!activity) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: activity });
      } catch (err) {
        res.status(400).json({ success: false, data: err });
      }
      break;
    case "DELETE":
      try {
        const deletedActivity = await Activity.findByIdAndDelete(id);
        if (!deletedActivity) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: {} });
      } catch (err) {
        res.status(500).json({ success: false, data: err });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
