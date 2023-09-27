import { Schema, model } from 'mongoose';
const productSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true
    }
)
const Product = model("Product", productSchema);
export default Product;