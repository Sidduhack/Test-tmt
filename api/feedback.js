import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  // Send email here

  return res.status(200).json({
    success: true,
    message: "Feedback received!"
  });
}
