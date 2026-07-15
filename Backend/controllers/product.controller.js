import Product from "../models/product.model.js";

export async function getProduct(req, res) {
    try {

        const { category } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        const products = await Product.find(filter);

        res.json(products);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function postProduct(req, res) {
    try {

        const product = new Product(req.body);

        await product.save();

        res.json(product);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function deleteProduct(req,res){

    try{

        const { id } = req.params;

        const product =
        await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({
                message:"Product not found"
            });
        }

        return res.json({
            message:"Product deleted successfully"
        });

    }
    catch(err){

        return res.status(500).json({
            error:err.message
        });

    }

}

export async function updateProduct(req,res){

    try{

        const { id } = req.params;

        const product =
        await Product.findByIdAndUpdate(
            id,
            req.body,
            { new:true }
        );

        if(!product){
            return res.status(404).json({
                message:"Product not found"
            });
        }

        return res.json(product);

    }
    catch(err){

        return res.status(500).json({
            error:err.message
        });

    }

}

export async function getSingleProduct(req,res){

    try{

        const product =
        await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({
                message:"Product not found"
            });
        }

        return res.json(product);

    }
    catch(err){

        return res.status(500).json({
            error:err.message
        });

    }
}