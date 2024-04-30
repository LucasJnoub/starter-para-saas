// app/api/predictions/get.ts

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

    const response = await axios.get("https://api.replicate.com/v1/predictions", {
      headers: {
        Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Failed to fetch predictions:", error);
    res.status(500).json({ error: "Failed to fetch predictions" });
  }
}
