import Razorpay from "razorpay";

export async function createOrder(req, res) {

  try {

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET
    });

    console.log(req.body);

    console.log("print amount : " , req.body.amount)

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "receipt_order"
    };

    const order = await razorpay.orders.create(options);

    console.log(order)

    res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order
    });

    console.log(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
}