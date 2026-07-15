import crypto from "crypto";

export async function verifyPayment(req, res) {

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        console.log(req.body);

        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_SECRET
            )
            .update(body.toString())
            .digest("hex");

        const isAuthentic =
            expectedSignature === razorpay_signature;

        if (isAuthentic) {

            return res.status(200).json({
                success: true,
                message: "Payment verified successfully"
            });

        } else {

            return res.status(400).json({
                success: false,
                message: "Invalid signature"
            });

        }

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

}