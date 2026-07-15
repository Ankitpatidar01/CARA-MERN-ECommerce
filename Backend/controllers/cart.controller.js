import Cart from "../models/cart.model.js";

export async function getCart(req, res) {
    try {

        const cart = await Cart.find({
            userId: req.user.id
        }).populate("productId");

        return res.status(200).json(cart);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
}

export async function postCart(req, res) {

    try {

        const { productId } = req.body;

        let item = await Cart.findOne({
            userId: req.user.id,
            productId
        });

        if (item) {

            item.quantity += 1;
            await item.save();

        } else {

            item = new Cart({
                userId: req.user.id,
                productId,
                quantity: 1
            });

            await item.save();

        }

        return res.status(201).json(item);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

}

export async function deleteFromCart(req, res) {

    try {

        const deletedItem = await Cart.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!deletedItem) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        return res.status(200).json({
            message: "Item removed successfully"
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

}

export async function putCart(req, res) {

    try {

        const { quantity } = req.body;

        const item = await Cart.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id
            },
            {
                quantity
            },
            {
                new: true
            }
        );

        if (!item) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        return res.status(200).json(item);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

}

export async function clearCart(req, res) {

    try {

        await Cart.deleteMany({
            userId: req.user.id
        });

        return res.status(200).json({
            message: "Cart cleared successfully"
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

}