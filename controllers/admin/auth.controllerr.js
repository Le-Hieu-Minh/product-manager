const Account = require('../../models/account.model')
const Role = require('../../models/role.model')
const systemConfig = require('../../config/system');
var md5 = require('md5');

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {

  if (req.cookies.token) {
    res.redirect(`${systemConfig.prefexAdmin}/dashboard`);
  } else {
    res.render('admin/pages/auth/login', {
      pageTitle: 'Dang nhap',

    })
  }

}
// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  const user = await Account.findOne({
    email: email,
    deleted: false
  });
  console.log(user);

  if (!user) {
    req.flash('error', 'Email không tồn tại');
    return res.redirect(req.get('Referer'));
  }

  if (md5(password) !== user.password) {
    req.flash('error', 'Sai mật khẩu');
    return res.redirect(req.get('Referer'));
  }

  if (user.status === 'inactive') {
    req.flash('error', 'Tài khoản đã bị khóa');
    return res.redirect(req.get('Referer'));
  }

  res.cookie('token', user.token)
  res.redirect(`${systemConfig.prefexAdmin}/dashboard`);
};

module.exports.logout = async (req, res) => {
  res.clearCookie('token')
  res.redirect(`${systemConfig.prefexAdmin}/auth/login`);
}