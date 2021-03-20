const router = require("express").Router();
const event = require("./routes/event");

router.use("/event", event);

module.exports = router;
