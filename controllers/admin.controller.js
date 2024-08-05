const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")

exports.getAllorder = asyncHandler(async (req, res) => {
    // const result = await Order.find().populate("products")

    const result = await Order.find()
        .populate({
            path: 'products',
            populate: { path: 'sellerId' }
        });

    res.status(200).json({ message: "all order Fetch succes", result })
})