const express = require('express');
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require('../utils/ExpressError');
const { campgroundSchema } = require("../schemas");
const CampgroundController = require("../controllers/campgrounds");
const multer = require('multer');
const { storage } = require('../cloudinary/');
const upload = multer({storage});

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if(error){
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
    return;
  }
}

router.route('/')
    .get(catchAsync(CampgroundController.index))
    .post(upload.array('image'), catchAsync(CampgroundController.createCampground))
/*    .post(upload.array('image'), (req, res) => {
        res.send(req.body, req.files);
    })*/
router.get('/new', CampgroundController.renderNewForm);

router.route('/:id')
    .get(catchAsync( CampgroundController.showCampground))
    .put(validateCampground, catchAsync(CampgroundController.updateCampground))
    .delete(catchAsync(CampgroundController.deleteCampground))

router.get('/:id/edit', catchAsync(CampgroundController.renderEditForm));

module.exports = router;