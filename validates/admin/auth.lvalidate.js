module.exports.loginPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash('error', "Vui long nhap email");
    res.redirect(req.get('Referer'))
    return;
  }
  if (!req.body.password) {
    req.flash('error', "Vui long nhap password");
    res.redirect(req.get('Referer'))
    return;
  }

  next()
}