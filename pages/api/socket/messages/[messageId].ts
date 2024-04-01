import { currentProfile } from "@/lib/current-profile";
import { NextApiResponseServerIo } from "@/type";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  console.log(123);

  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method not supported" });
  }
  try {
    const profile = await currentProfile(req);
    const d = req.body;
    const { content, fileUrl } = req.query;
    if (!profile) {
      return res.status(404).json({ message: "Unauthorized" });
    }

    console.log(d);

    return res.status(200).json({ message: "success" });
  } catch (error) {}
}
