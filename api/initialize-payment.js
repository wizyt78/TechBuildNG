module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({message:"Method not allowed"});
  const secret = process.env.KORAPAY_SECRET_KEY;
  if (!secret) return res.status(500).json({message:"KORAPAY_SECRET_KEY is not configured on the server."});

  try {
    const {productId, productTitle, amount, name, email} = req.body || {};
    const prices = { standard: {price:150000,min:50000}, custom: {price:180000,min:70000}, banking: {price:180000,min:100000}, cars: {price:140000,min:70000}, tracking: {price:100000,min:50000}, clothing: {price:157000,min:80000}, celebrity: {price:150000,min:75000}, truck: {price:160000,min:80000}, ecommerce: {price:170000,min:85000}, socialmedia: {price:150000,min:70000} };
    if (!prices[productId]) return res.status(400).json({message:"Invalid package."});
    const n = Number(amount);
    const cfg = prices[productId];
    if (!Number.isInteger(n) || n < cfg.min || n > cfg.price) {
      return res.status(400).json({message:`Amount must be between ₦${cfg.min.toLocaleString()} and ₦${cfg.price.toLocaleString()}.`});
    }
    if (!name || !email) return res.status(400).json({message:"Name and email are required."});

    const siteUrl = process.env.SITE_URL || `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}`;
    const reference = `TBNG-${productId.toUpperCase()}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

    const response = await fetch("https://api.korapay.com/merchant/api/v1/charges/initialize", {
      method:"POST",
      headers: {
        "Authorization": `Bearer ${secret}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        amount:n,
        currency:"NGN",
        reference,
        narration:`${productTitle || "TechBuild NG website package"} payment`,
        redirect_url:`${siteUrl}/success.html?ref=${encodeURIComponent(reference)}`,
        notification_url:`${siteUrl}/api/korapay-webhook`,
        merchant_bears_cost:false,
        customer:{name, email},
        metadata:{product: productId, brand:"TechBuildNG"}
      })
    });
    const data = await response.json();
    if (!response.ok || !data?.status || !data?.data?.checkout_url) {
      return res.status(502).json({message:data?.message || "KoraPay could not initialize the payment.", details:data});
    }
    return res.status(200).json({checkout_url:data.data.checkout_url, reference:data.data.reference || reference});
  } catch (error) {
    return res.status(500).json({message:"Payment initialization failed.", error:error.message});
  }
};
