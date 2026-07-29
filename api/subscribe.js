import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  // Check if already subscribed
  const { data: existing } = await supabase
    .from("subscribers")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return res.status(200).json({
      success: true,
      message: "You are already subscribed!"
    });
  }

  const { error } = await supabase
    .from("subscribers")
    .insert({ email });

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }

  return res.status(200).json({
    success: true,
    message: "Thanks for subscribing!"
  });
}
