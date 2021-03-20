const router = require("express").Router();
const uploadImage = require("../middleware/multer");
const { getEvent, postEvent, getEventSearch } = require("../controller/event");

router.get("/", getEvent);
router.get("/filter", getEventSearch);
router.post("/", uploadImage, postEvent);

module.exports = router;
