const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/auth');
const userLoginRegister = require('../controller/userLoginRegister/userLoginRegister');
const userGetData = require('../controller/userGetData/userGetData');
const {getRoles} = require('../controller/getRoles/getRoles')
const {getRolesById} = require('../controller/getRoles/getRolesById')
const {getCategories } = require('../controller/categories/getCategories')
const {getCategoryByID} = require('../controller/categories/getCategoryByID')
const { getPackages} = require('../controller/getPackages/getPackages')
const { getPackagesById } = require('../controller/getPackages/getPackagesById')
const { getPackageByCategoryID } = require('../controller/getPackages/getPackageByCategoryID')

// Define routes for user registration and login
router.post('/user/signup', userLoginRegister.userSignUp);
router.post('/user/login', userLoginRegister.userLogin);

// Password reset routes
router.post("/forgot-password", userLoginRegister.forgotPassword);
router.post("/reset-password/:token", userLoginRegister.resetPassword);

// Define route for getting user data
router.get('/user/getData/:id', verifyToken, userGetData.userGetData);


// Get all roles
router.get('/roles', getRoles);

//Get Roles By ID
router.get('/roles/:id' , getRolesById)


//Get all Categories
router.get('/categories', getCategories)

//Get Category by ID
router.get('/categories/:id' , getCategoryByID)


//Get all Packages
router.get('/packages' , getPackages)

//Get Packages by ID
router.get('/packages/:id' , getPackagesById)

//Get package by its category
router.get('/packages/category/:categoryId', getPackageByCategoryID);


module.exports = router;
