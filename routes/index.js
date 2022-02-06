const express= require('express');

const router= express.Router();
const homeController= require('../controllers/home_controller.js');

router.get('/', homeController.home);

router.use('/users', require('./users')); 
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));
router.use('/friendship', require('./friendship'));


router.use('/api', require('./api/index'));
// console.log('routes');

module.exports= router;