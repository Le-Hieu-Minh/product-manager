const Product = require('../../models/product.model');
const filterStatusHelper = require('../../helpers/filterStatus')
const searchHelper = require('../../helpers/search')
const paginationHelper = require('../../helpers/pagination');
const systemConfig = require('../../config/system');


// [GET] /admin/products
module.exports.products = async (req, res) => {

  const filterStatus = filterStatusHelper(req.query)

  let find = {
    deleted: false
  }

  if (req.query.status) {
    find.status = req.query.status
  }

  const objectSearch = searchHelper(req.query)

  if (objectSearch.keyword) {
    find.title = objectSearch.regex
  }

  const coutProduct = await Product.countDocuments(find);

  let pagination = paginationHelper(
    {
      currentPage: 1,
      limitItem: 4
    },
    req.query,
    coutProduct
  )

  const products = await Product.find(find).sort({ position: 'descending' }).limit(pagination.limitItem).skip(pagination.skip);

  res.render('admin/pages/products/index', {
    pageTitle: 'Trang danh sach san pham',
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: pagination
  })
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status })
  req.flash('success', "Cap nhap trang thai thanh cong")
  res.redirect(req.get('Referer') || '/admin/products')
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");


  switch (type) {
    case 'active':
      await Product.updateMany({ _id: { $in: ids } }, { status: 'active' })
      req.flash('success', `Cap nhap thanh cong trang thai ${ids.length} san pham thanh cong`)
      break;
    case 'inactive':
      await Product.updateMany({ _id: { $in: ids } }, { status: 'inactive' })
      req.flash('success', `Cap nhap thanh cong trang thai ${ids.length} san pham thanh cong`)

      break;
    case 'delete-all':
      await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deleteAt: new Date() })
      req.flash('success', `Xoa ${ids.length} san pham thanh cong`)
      break;
    case 'change-position':
      for (const item of ids) {
        let [id, position] = item.split('-')
        position = parseInt(position)
        await Product.updateOne({ _id: id }, {
          position: parseInt(position)
        })
        req.flash('success', `thay doi vi tri san pham thanh cong`)
      }
      break;

    default:
      break;
  }

  res.redirect(req.get('Referer') || '/admin/products')


}
// [DELETE] /admin/products/delete
module.exports.deleteItem = async (req, res) => {

  const id = req.params.id;

  // await Product.deleteOne({ _id: id })

  await Product.updateOne({ _id: id }, {
    deleted: true,
    deleteAt: new Date()
  })


  res.redirect(req.get('Referer') || '/admin/products')

}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {

  res.render('admin/pages/products/create', {
    pageTitle: 'Trang them moi san pham',

  })

}
// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {

  if (!req.body.title) {
    req.flash('error', "Vui long nhap tieu de");
    res.redirect(req.get('Referer'))
    return;
  }

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);



  if (req.body.position == '') {
    const coutProduct = await Product.countDocuments();
    req.body.position = coutProduct + 1;

  } else {
    req.body.position = parseInt(req.body.position)
  }

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  const product = new Product(req.body);
  await product.save();
  res.redirect(`${systemConfig.prefexAdmin}/products`);

}
// [Get] / admin / products / edit / :id
module.exports.edit = async (req, res) => {
  try {

    const find = {
      deleted: false,
      _id: req.params.id
    }
    const product = await Product.findOne(find);
    console.log(product);

    res.render('admin/pages/products/edit', {
      pageTitle: 'Trang sua san pham',
      product: product
    })


  } catch (error) {
    req.flash('error', `san pham khong ton tai`)
    res.redirect(`${systemConfig.prefexAdmin}/products`)
  }


}

// [PATCH] /admin/products/edit/id:
module.exports.editPatch = async (req, res) => {



  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);


  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }


  try {
    await Product.updateOne({ _id: req.params.id }, req.body);
    req.flash('success', `Cap nhap thanh cong`)

  } catch (error) {
    req.flash('error', `Cap nhap that bai`)

  }

  res.redirect(req.get('Referer') || '/admin/products/edit')
}

// [Get] /admin/products/detail/:id
module.exports.detail = async (req, res) => {


  const find = {
    deleted: false,
    _id: req.params.id
  }
  const product = await Product.findOne(find);

  console.log(product);


  res.render('admin/pages/products/detail', {
    pageTitle: 'Trang sua san pham',
    product: product
  })



}