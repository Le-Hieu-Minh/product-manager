const Product = require('../../models/product.model');
const ProductCategory = require('../../models//product-category.model');
const productHelper = require('../../helpers/product')
// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false
  }).sort({ position: 'desc' })

  const newProduct = productHelper.priceNewProduct(products)

  res.render('client/pages/product/index', {
    pageTitle: 'Trang danh sach san pham',
    products: newProduct

  })
}


// [GET] /products/:slug
module.exports.detail = async (req, res) => {

  console.log(req.params.slug);
  try {

    const find = {
      deleted: false,
      slug: req.params.slug,
      status: 'active'
    }
    const product = await Product.findOne(find);


    res.render('client/pages/product/detail', {
      pageTitle: 'Trang chi tiet san pham',
      product: product
    })

  } catch (error) {
    res.redirect('/products')
  }


}
// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  console.log(req.params.slugCategory);
  const category = await ProductCategory.findOne({
    slug: req.params.slugCategory,
    deleted: false
  })
  const product = await Product.find({
    product_category_id: category.id,
    deleted: false
  })
  const newProduct = productHelper.priceNewProduct(product);

  res.render('client/pages/product/index', {
    pageTitle: category.title,
    products: newProduct

  })

}

