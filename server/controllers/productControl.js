const Product = require("../models/products");
const Category = require("../models/productCategory");
const User = require("../models/user");
const { uploadImageToCloudinary } = require("../utils/imageUploader")

exports.createProduct = async (req, res) => {
    try {
        const userId = req.user.id;

        let {
            productName,
            productDescription,
            price,
            tag: _tag,
            category,
            status,
            quantityAvailable,
        } = req.body;

        const thumbnail = req.files.thumbnailImage;

        const tag = JSON.parse(_tag);

        console.log("Tag for Prodcut", tag);

        if (
            !productName ||
            !productDescription ||
            !price ||
            !tag.length ||
            !thumbnail ||
            !category ||
            !quantityAvailable
        ) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            })
        };

        if (!status || status === undefined) {
            status = "Draft"
        }

        const dealerDetails = await User.findById(userId, {
            accountType: "Dealer",
        });

        if (!dealerDetails) {
            return res.status(404).json({
                success: false,
                message: "Dealer Details Not Found",
            })
        };

        const categoryDetails = await Category.findById(category)
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            })
        };

        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        )

        console.log("Thumbnail Image", thumbnailImage);

        const newProduct = await Product.create({
            productName,
            productDescription,
            dealer: dealerDetails._id,
            price,
            tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            quantityAvailable,
        });

        await User.findByIdAndUpdate(
            {
                _id: dealerDetails._id,
            },
            {
                $push: {
                    products: newProduct._id,
                }
            },
            {
                new: true,
            }
        )

        const categoryDetails2 = await Category.findByIdAndUpdate(
            {
                _id: category,
            },
            {
                $push: {
                    products: newProduct._id,
                }
            },
            {
                new: true,
            },
        );

        console.log("Category Details 2", categoryDetails2);

        res.status(200).json({
            success: true,
            data: newProduct,
            message: "Product Created Successfully",
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to create Product",
            error: error.message,
        })
    }
}

exports.editProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const updates = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            })
        }

        if (req.files) {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            product.thumbnail = thumbnailImage.secure_url
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag") {
                    product[key] = JSON.parse(updates[key])
                } else {
                    product[key] = updates[key]
                }
            }
        }

        await product.save();

        
    } catch (error) {

    }
}