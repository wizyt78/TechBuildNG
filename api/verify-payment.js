module.exports = async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({message:"Method not allowed"});
  const secret = process.env.KORAPAY_SECRET_KEY;
  if (!secret) return res.status(500).json({message:"KORAPAY_SECRET_KEY is not configured on the server."});
  const reference = String(req.query.reference || "").trim();
  if (!reference) return res.status(400).json({message:"Missing payment reference."});

  try {
    const response = await fetch(`https://api.korapay.com/merchant/api/v1/charges/${encodeURIComponent(reference)}`, {
      headers:{ "Authorization": `Bearer ${secret}` }
    });
    const data = await response.json();
    if (!response.ok || !data?.status) return res.status(200).json({success:false,message:data?.message || "Payment could not be verified."});
    const tx = data.data || {};
    return res.status(200).json({
      success:true,
      status:tx.status,
      amount:Number(tx.amount || tx.amount_expected || 0),
      currency:tx.currency || "NGN",
      reference:tx.reference || reference
    });
  } catch (error) {
    return res.status(500).json({success:false,message:"Verification failed."});
  }
};
