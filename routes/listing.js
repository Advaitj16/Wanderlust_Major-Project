    const express = require("express");
const router =  express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {listingSchema, reviewSchema} = require("../schema");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const { isLoggedIn,isOwner,validateListing }  = require("../middleware");
const multer = require('multer');
const {storage} = require("../cloudConfig");
const upload = multer({storage});

const {index , renderNewForm,showListing, createListng, renderEditForm, updateListing, destroyListing} = require("../controllers/listings");

router.route("/")
.get( wrapAsync(index)) // Index Route
.post(
    isLoggedIn, 
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(createListng));  //Create Route

  //New Route
router.get("/new", isLoggedIn,renderNewForm);  

router.route("/:id")
.get(wrapAsync(showListing)) //show route
.put(isLoggedIn,isOwner, upload.single('listing[image]'),validateListing, wrapAsync(updateListing))//update route
.delete(isLoggedIn,isOwner,wrapAsync(destroyListing));//delete route


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(renderEditForm));


module.exports = router ;