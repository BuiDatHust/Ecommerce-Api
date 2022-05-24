const ProductService = require('../services/product.services')
const fs = require('fs')
const {validateBody} = require('../validations/validateUpdateBody')

const getProduct = async (req, res) => {
    let {page,size} = req.query    
    console.log("process is running:", process.pid)
    const {limit,offset} =  ProductService.calInfoPaginate(page,size)
    page= page? parseInt(page) : 0

    try {
        const paginate = await ProductService.getPaginatePage(limit,offset)
        const products = paginate.products
        const totalPage = paginate.totalPage
        return res.send({
            totalPages: totalPage ,
            currentPage: page ,
            products: products 
        })
    } catch (error) {
        console.log(error)
        return res.send({error:error})
    }
    
}

const getFilterProduct =async (req, res) =>{
    let {sortBy,page,size,typeSort,minPrice,maxPrice,rating} = req.query ;

    const {limit,offset} =  ProductService.calInfoPaginate(page,size)
    page= page? parseInt(page) : 0

    try {
        let {products,totalPage} = await ProductService.getPaginateSort(limit, offset,sortBy,typeSort)
        if(minPrice && maxPrice ){
            minPrice= parseInt(minPrice)
            maxPrice= parseInt(maxPrice)

            const paginate = await ProductService.getPaginatePrice(limit,offset,sortBy,typeSort,minPrice,maxPrice )
            products = paginate.products
            totalPage = paginate.totalPage
        }
        
        return res.status(200).send({
            totalPages: totalPage ,
            currentPage: page ,
            products: products 
        })
    } catch (error) {
        console.log(error)
        return res.send({error})
    }
}

const getCategoryProduct = async (req, res) => {
    const {categoryName } = req.params 
    let {page,size} = req.query

    const {limit,offset} =  ProductService.calInfoPaginate(page,size)
    page= page? parseInt(page) : 0

    const {products,totalPage} = await ProductService.getCategoryProduct(categoryName,limit,offset)

    res.status(200).send({
        products:products,
        totalPages:totalPage,
        currentPage:page
    })
}

const getFilterCategory = async (req, res) => {

}

const getDetailProduct = async (req, res) => {
    const {productId} = req.params

    const product = await ProductService.getDetailProduct(productId)
    res.send({product:product})
}

const searchProduct = async (req, res) => {
    const {name} = req.query

    
    const products = await ProductService.getSearchProduct(name)
    
    res.status(200).send({products: products})
}

const rateProduct = async (req, res) => {
    let { score,productId } = req.body 
    await ProductService.updateScoreProduct(productId, score)
}

const createProduct = async (req, res) => {
    let { categoryName,name, description,price,survive, productClassify,images  } = req.body

    price = parseInt(price)
    survive = parseInt(survive)

    imagesArr = images.map((image) => {
        return {
            data: fs.readFileSync(`/home/buidat/Desktop/EcommerceApi/src/api/v1/assets/images/${image}`),
            contentType: 'image/jpeg'
        }
    })

    const newProduct = await ProductService.createProduct({category:categoryName,name, description,price,survive, productClassify,images:imagesArr})
    
    res.status(200).send({newProduct})

}

const updateProduct = async (req, res) => {
    const {productId} = req.body  
    const val = validateBody(req.body, 'productId')
    
    const updateProduct = await ProductService.updateProduct(val, productId)

    res.status(200).send({updateProduct})
}

const deleteProduct = async (req, res) => {

}

module.exports = {
    getProduct,
    getFilterProduct,
    getDetailProduct ,
    searchProduct ,
    getCategoryProduct,
    getFilterCategory,
    rateProduct,
    createProduct,
    updateProduct,
}