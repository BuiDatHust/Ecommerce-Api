const Product  = require('../models/product.models')
const Rating = require('../models/rating.models')
const Category = require('../models/category.models')

exports.getPaginatePage = async (limit, offset) => {
    const products = await Product.find().skip(offset).limit(limit)
    const product =  await Product.find()

    const totalPage = Math.ceil(product.length/limit)

    return {products,totalPage} 
}


exports.getPaginateSort = async (limit, offset,sortBy,typeSort) => {
    const product =  await Product.find().sort({sortBy: typeSort})
    const totalPage = Math.ceil(product.length/limit)

    const products = await Product.find().sort({sortBy: typeSort}).skip(offset).limit(limit)

    return {products,totalPage} 
}

exports.getPaginatePrice =async (limit, offset,sortBy,typeSort,minPrice,maxPrice) =>{
    const product =  await Product.find({price: {$gte: minPrice, $lte: maxPrice}})
    const totalPage = Math.ceil(product.length/limit)

    const products = await Product.find({price: {$gte: minPrice, $lte: maxPrice}}).sort({sortBy: typeSort}).skip(offset).limit(limit)

    return {products,totalPage}
}

exports.calInfoPaginate =  (page,size) =>{
    const limit = size ? +size : 2;
    const offset = page ? page * limit : 0;

    return {limit, offset} 
}

exports.getCategoryProduct = async ( categoryName,limit,offset ) => {
    const product = await Product.find({category: categoryName})
    const totalPage = Math.ceil(product.length/limit)

    const products =  await Product.find({category: categoryName}).skip(offset).limit(limit)

    return {products,totalPage}
}

exports.getDetailProduct = async (productId) => {
    try {
        const product = await Product.findOne({_id:productId})

        return product
    } catch (error) {
        throw error
    }
}

exports.getSearchProduct = async (text) => {
    const products  = await Product.find({ $text:{ $search: text}}).sort( { score: { $meta: "textScore" } } )

    return products 
}

exports.updateScoreProduct = async (productId, score) => {
    try {
        const newRating = await Rating.create({productId, rating: score})
        const result = await Rating.aggregate([
            {
                $match: {
                    _id: productId,
                },
                $group:{
                    _id: "$item",
                    avgAmount: { $avg: { $multiply: [ "$price", "$quantity" ] } },
                    avgQuantity: { $avg: "$quantity" }
                }
            }

        ])
        console.log(result)
    } catch (error) {
        console.log(error) 
    }
}

exports.createProduct = async (...value) => {

    try {
        const category = await Category.findOne({ name: value[0].category})
        if(!category) {
            await Category.create({name: value[0].category})
        }

        const newProduct = await Product.create(value)

        return newProduct
    } catch (error) {
        console.log(error)
    }
}

exports.updateProduct= async (value,productId) => {
    console.log(value,productId)

    try {
        const updateProduct = await Product.findOneAndUpdate({_id:productId},value, {new:true})

        return updateProduct
    } catch (error) {
        console.log(error)
    }
}