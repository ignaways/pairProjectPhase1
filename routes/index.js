const express = require(`express`);
const router = express.Router();
const Controller = require(`../controllers/controller.js`);

router.get(`/`, Controller.home);

router.get(`/signUp`, Controller.registerForm);
router.post(`/signUp`, Controller.postRegister);

router.get(`/signIn`, Controller.formSignIn);
router.post(`/signIn`, Controller.signIn);

router.get(`/logOut`, Controller.logOut);

router.get(`/product`, Controller.product);

router.get(`/profile/add`, Controller.formAddProfile);
router.post(`/profile/add`, Controller.addProfile)

const isSignIn = function (req, res, next) {;
  if (!req.session.userId) {
    const error = `Sign In First`;
    res.redirect(`/signIn?error=${error} signin`);
  } else {
    next();
  }
  // console.log("Time:", Date.now());
  // next();
};

const isAdmin = function (req, res, next) {
  if (req.session.userId && req.session.userRole === `user`) {
    const error = `You have no access`
    res.redirect(`/signIn?error=${error}`);
  } else {
    next();
  }
  // console.log("Time:", Date.now());
  // next();
};

router.use(isSignIn)

router.get(`/product/user`, Controller.productUser);



router.get(`/profile/edit/:id`, Controller.formEditProfile);

router.post(`/profile/edit/:id`, Controller.editProfile)

router.use(isAdmin)

router.get(`/product/admin`, Controller.productAdmin);

router.get(`/product/add`, Controller.formAddProduct);
router.post(`/product/add`, Controller.addProduct);

router.get(`/product/edit/:id`, Controller.formEditProduct);
router.post(`/product/edit/:id`, Controller.editProduct);

router.get(`/product/delete/:id`, Controller.deleteProduct);


router.get(`/categories`,Controller.showCategories)

router.get(`/categories/add`, Controller.formAddCategories);
router.post(`/categories/add`, Controller.AddCategories);

router.get(`/categories/edit/:id`, Controller.formEditCategories);
router.post(`/categories/edit/:id`, Controller.EditCategories);

router.get(`/categories/delete/:id`, Controller.deleteCategories);


module.exports = router;
