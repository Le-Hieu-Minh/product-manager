const Product = require('../../models/product.model')
const productHelper = require('../../helpers/product')
// [GET] /home
module.exports.index = async (req, res) => {
  //lay ra san pham noi bat
  const productFeatured = await Product.find({
    featured: '1',
    deleted: false,
    status: 'active'
  }).limit(6)
  console.log(productFeatured);
  const newProductFeatured = productHelper.priceNewProduct(productFeatured);

  //hien thi ra san pham moi nhat
  const newProductNew = await Product.find({
    deleted: false,
    status: 'active'
  }).sort({ position: 'desc' }).limit(6)


  res.render('client/pages/home/index', {
    pageTitle: 'Trang chu',
    productFeatured: newProductFeatured,
    newProductNew: newProductNew
  })
}