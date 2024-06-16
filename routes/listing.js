const express= require("express");
const router= express.Router();
const wrapAsync=require ("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});

router
    .route("/")
    .get(wrapAsync(listingController.index))//Index Route
    .post(isLoggedIn, //Create route
        upload.single("listing[image][url]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );

//New Route
router.get("/new",
    isLoggedIn,
    listingController.renderNewForm);
//New route has to be placed above the show route due to id conflict

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing)) //Show route
    .put(isLoggedIn,
        isOwner,
        upload.single("listing[image][url]"),
        validateListing,
        wrapAsync(listingController.updateListing)) //Update Route
    .delete(isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing)); //Delete Route

//Edit route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router;