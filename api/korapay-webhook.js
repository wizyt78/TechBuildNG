module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({message:"Method not allowed"});
  // Keep this endpoint lightweight. For production, store the webhook event/order
  // in your database and verify the transaction server-to-server before marking an order paid.
  const event = req.body || {};
  console.log("KoraPay webhook received:", JSON.stringify(event));
  return res.status(200).json({received:true});
};
