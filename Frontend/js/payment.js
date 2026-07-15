const checkOutBtn = document.getElementById('checkout-btn');

if (checkOutBtn) {

    checkOutBtn.addEventListener('click', async () => {

        const response = await fetch(`${API_URL}/payment`,
            {
                method: "POST",

                headers: authHeaders,

                body: JSON.stringify({
                    amount: finalTotal
                })
            }
        );

        const data = await response.json();

        console.log(data);

        const options = {

            key: data.key,

            amount: data.order.amount,

            currency: "INR",

            name: "E-Commerce Website",

            description: "Test Transaction",

            order_id: data.order.id,

            handler: async function (response) {

                console.log(response);

                const verifyResponse = await fetch(`${API_URL}/payment/verify`,
                    {
                        method: "POST",

                        headers: authHeaders,

                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                    }
                );

                const verifyData = await verifyResponse.json();

                console.log(verifyData);

                if (verifyData.success) {

                    const orderResponse = await fetch(`${API_URL}/orders`, {
                        method: "POST",
                        headers: authHeaders,
                        body: JSON.stringify({
                            paymentId: response.razorpay_payment_id
                        })
                    });

                    const orderData = await orderResponse.json();

                    if (orderData.success) {
                        window.location.href = "success.html";
                    }
                    else {
                        alert(orderData.message);
                    }

                }
                else {
                    alert("Payment Verification Failed");
                }

            },

            theme: {
                color: "#3399cc"
            }

        };

       const rzp = new Razorpay(options);

        rzp.on("payment.failed", function (response) {

            console.log(response.error);

            alert(response.error.description);

        });

        rzp.open();

    });

}
