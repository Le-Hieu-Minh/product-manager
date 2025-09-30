const ProductCategory = require('../../models/product-category.model')
const systemConfig = require('../../config/system');
const createTreeHelper = require('../../helpers/createTree')

// [GET] /admin/product-category
module.exports.index = async (req, res) => {

  let find = {
    deleted: false
  }

  const record = await ProductCategory.find(find);
  const newRecord = createTreeHelper.tree(record);

  res.render('admin/pages/product-category/index', {
    pageTitle: 'Trang danh muc san pham',
    record: newRecord
  })
}

// [GET] /admin/product-category/create
module.exports.create = async (req, res) => {


  let find = {
    deleted: false
  }



  const record = (await ProductCategory.find(find));

  const newRecord = createTreeHelper.tree(record);



  res.render('admin/pages/product-category/create', {
    pageTitle: 'Trang danh muc san pham',
    record: newRecord
  })
}

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
  // const permission = res.locals.role.permissions;
  // if (permission.includes('products-catagory_create')) {
  //   console.log('Ban co quyen');
  // } else {
  //   console.log('Ban ko co quyen');
  // }


  if (req.body.position == '') {
    const cout = await ProductCategory.countDocuments();
    req.body.position = cout + 1;

  } else {
    req.body.position = parseInt(req.body.position)
  }

  const record = new ProductCategory(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefexAdmin}/product-category`);
  console.log(req.body);

}

// [GET] /admin/product-category/edit:id
module.exports.edit = async (req, res) => {

  try {
    const id = req.params.id;

    const data = await ProductCategory.findOne({
      _id: id,
      deleted: false
    })

    const record = await ProductCategory.find({ deleted: false });

    const newRecord = createTreeHelper.tree(record);

    res.render('admin/pages/product-category/edit', {
      pageTitle: 'Trang sua danh muc san pham',
      data: data,
      record: newRecord,
    })
  } catch (error) {
    res.redirect(`${systemConfig.prefexAdmin}/product-category`)
  }


}


// [PATCH] /admin/product-category/edit
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position)

  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date()
  }

  await ProductCategory.updateOne({ _id: id }, {
    ...req.body,
    $push: { updatedBy: updatedBy }
  })

  res.redirect(req.get('Referer') || `${systemConfig.prefexAdmin}/product-category/edit`)

}