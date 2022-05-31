const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require("../utils/catchAsync");
const ReviewController = require("../controllers/reviews");

router.post('/', catchAsync(ReviewController.createReview));

router.delete('/:reviewId', catchAsync(ReviewController.deleteReview));

module.exports = router;