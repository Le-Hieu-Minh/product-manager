module.exports.createPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash('error', "Vui long nhap ho ten");
    res.redirect(req.get('Referer'))
    return;
  }
  if (!req.body.email) {
    req.flash('error', "Vui long nhap email");
    res.redirect(req.get('Referer'))
    return;
  }

  if (!req.body.password) {
    req.flash('error', "Vui long nhap mat khau");
    res.redirect(req.get('Referer'))
    return;
  }

  next()
}

module.exports.editPatch = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash('error', "Vui long nhap ho ten");
    res.redirect(req.get('Referer'))
    return;
  }

  if (!req.body.email) {
    req.flash('error', "Vui long nhap email");
    res.redirect(req.get('Referer'))
    return;
  }


  next()
}