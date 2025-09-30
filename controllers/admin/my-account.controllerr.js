const md5 = require('md5');
const Account = require('../../models/account.model');
// [GET] /admin/my-account
module.exports.index = (req, res) => {
  res.render('admin/pages/my-account/index', {
    pageTitle: 'Thong tin tai khoan'
  })
}
// [GET] /admin/my-account/edit
module.exports.edit = (req, res) => {
  res.render('admin/pages/my-account/edit', {
    pageTitle: 'Chinh sua tai khoan'
  })
}
// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  const emailExist = await Account.findOne({
    _id: { $ne: res.locals.user.id },
    email: req.body.email,
    deleted: false,
  })

  if (emailExist) {
    req.flash('error', 'Email da ton tai')
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password)
    } else {
      delete req.body.password
    }

    await Account.updateOne({ _id: req.params.id }, req.body)
    req.flash('success', 'Cap nhap tai khoan thanh cong')
  }
  res.redirect(req.get('Referer') || `${systemConfig.prefexAdmin}/my-account`);
}