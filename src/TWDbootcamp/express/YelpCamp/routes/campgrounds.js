const express = require('express');
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require('../utils/ExpressError');
const { campgroundSchema } = require("../schemas");
const CampgroundController = require("../controllers/campgrounds");

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
    .post(catchAsync(CampgroundController.renderNewForm))

router.get('/new', CampgroundController.createCampground);

router.route('/:id')
    .get(catchAsync( CampgroundController.showCampground))
    .put(validateCampground, catchAsync(CampgroundController.updateCampground))
    .delete(catchAsync(CampgroundController.deleteCampground))

router.get('/:id/edit', catchAsync(CampgroundController.renderEditForm));

module.exports = router;