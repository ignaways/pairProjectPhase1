const { response } = require("express");
const res = require("express/lib/response");
const { categories, Product, Profile, User } = require(`../models/index.js`);
var bcrypt = require('bcryptjs');

class Controller {
  static home(req, res) {
    
    res.redirect("/product");
    
  }
  static product(req, res) {
    const { categoryId } = req.query;
    let fn = categoryId ? { categoryId } : "";
    categories
      .findAll({
        include: {
          model: Product,
          where: fn,
        },
      })
      .then((dataProduct) => res.render("product", { dataProduct }))
      .catch((err) => res.send(err));
  }

  static productAdmin(req, res) {
    // console.log(req.session);
    const { categoryId } = req.query;
    const session = req.session
    let fn = categoryId ? { categoryId } : "";
    categories
      .findAll({
        include: {
          model: Product,
          where: fn,
        },
      })
      .then((dataProduct) => res.render("productAdmin", { dataProduct,session }))
      .catch((err) => res.send(err));
  }
  // ========================== EDIT PROFILE ==========================
  static formEditProfile(req, res) {
    User.findAll()
      .then((result) => {
        res.render(`formEditProfile`, { result });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static editProfile(req, res) {
    const { name, address, gender, phoneNumber, email, birthdayDate } =
      req.body;
    User.update({ name, address, gender, phoneNumber, email, birthdayDate })
      .then((result) => {
        res.redirect(`/profile`);
      })
      .catch((err) => {
        rescape.send(err);
      });
  }
  // ========================== SHOW CATEGORY ==========================
  static showCategories(req, res) {
    categories
      .findAll({ include: { model: Product } })
      .then((dataCategories) => res.render("categories", { dataCategories }))
      .catch((err) => res.send(err));
  }
  // ========================== ADD CATEGORY ==========================
  static formAddCategories(req, res) {
    res.render("addCategoriesForm");
  }
  static AddCategories(req, res) {
    const { name } = req.body;
    categories
      .create({ name })
      .then(() => res.redirect("/categories"))
      .catch((err) => res.send(err));
  }
  // ========================== EDIT CATEGORY ==========================
  static formEditCategories(req, res) {
    const id = req.params.id;
    categories.findByPk(id)
    .then((dataCategory)=> res.render("editCategoriesForm",{dataCategory}))
    .catch((err)=>res.send(err))
  }
  static EditCategories(req, res) {
    const id = req.params.id;
    const { name } = req.body;
    categories
      .update({ name },{where:{id:id}})
      .then(() => res.redirect("/categories"))
      .catch((err) => res.send(err));
  }
  // ========================== DELETE CATEGORY ==========================
  static deleteCategories(req, res) {
    const id = req.params.id;
    // console.log(id);
    categories
      .destroy({ where: { id: id } })
      .then(() => res.redirect("/categories"))
      .catch((err) => res.send(err));
  }

  // ========================== ADD PRODUCT ==========================
  static formAddProduct(req, res) {
    categories.findAll()
    .then((dataCategory) => res.render("addProductForm",{dataCategory}))
    .catch((err)=> res.send(err))
  }
  static addProduct(req, res) {
    const { name,imageUrl,description,price,categoryId} = req.body;
    Product
      .create( { name,imageUrl,description,price,categoryId})
      .then(() => res.redirect("/product/admin"))
      .catch((err) => res.send(err));
  }
  // ========================== EDIT PRODUCT ==========================
  static formEditProduct(req, res) {
    const id = req.params.id;
    Product.findByPk(id,{include:{model: categories}})
    .then((dataProduct)=> res.render("editProductForm",{dataProduct}))
    .catch((err)=>res.send(err))
  }
  static editProduct(req, res) {
    const id = req.params.id;
    const { name,imageUrl,description,price } = req.body;
    Product
      .update({ name,imageUrl,description,price },{where:{id:id}})
      .then(() => res.redirect("/product/admin"))
      .catch((err) => res.send(err));
  }
  static deleteProduct(req, res) {
    const id = req.params.id;
    // console.log(id);
    Product
      .destroy({ where: { id: id } })
      .then(() => res.redirect("/product/admin"))
      .catch((err) => res.send(err));
  }

  static registerForm(req, res) {
    res.render(`formSignUp`);
  }

  static postRegister(req, res) {
    const { userName, email ,password, role } = req.body;
    // console.log(req.body);
    User.create({ userName, email ,password, role })
      .then((newUser) => {
        res.redirect(`/product`);
      })
      .catch((err) => res.send(err));
  }

  static formSignIn(req, res) {
    const { error } = req.query;
    res.render(`formSignIn`, { error });
  }

  static signIn(req, res) {
    const { email, password } = req.body;

    User.findOne({ where: { email } })
      .then((user) => {
        // console.log(user);
        if (user) {
          // console.log(user);
          const isValidPassword = bcrypt.compareSync(password, user.password);
          if (isValidPassword && user.role === 'admin') {
            // console.log(req.session.user.id)
            req.session.userId = user.id
            req.session.userName = user.userName
            req.session.userRole = user.role
            // console.log(req.session);
            return res.redirect(`/product/admin`);
          } else {
            // const error = `invalid email/password`;
            req.session.userId = user.id
            req.session.userName = user.userName
            req.session.userRole = user.role
            return res.redirect(`/categories`);
          }
        } else {
          const error = `invalid email/password`;
          return res.redirect(`/signIn?error=${error}`);
        }
      })
      // .catch((err) => res.send(err));
      .catch((err) => console.log(err+'<<<<<<'));
  }

  static logOut(req, res) {
    req.session.destroy(err => {
      if(err) console.log(err)
      else {
        res.redirect(`/product`)
      }
    })
  }
}

module.exports = Controller;
