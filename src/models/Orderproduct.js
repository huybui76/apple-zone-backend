import mongoose, { Schema, model, mongo } from 'mongoose';
const orderSchema = new Schema(
    {

        orderItems: [
            {
                name: { type: String, required: true },
                amount: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },

            }
        ],
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            phone: { type: Number, required: true },

        },

        paymentMethod: { type: String, required: true },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        isPaid: { type: Boolean, required: true },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, required: true },
        deliveredAt: { type: Date },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }

    },
    {
        timestamps: true
    }
)
const Order = model("Order", orderSchema);
export default Order;