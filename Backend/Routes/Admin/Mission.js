const express = require("express");
const router = express.Router();
const MissionController = require("../../Controllers/MissionController");

const AdminAuth = require("../../Middleware/AdminAuth");

router
  .route("/mission/:id?", AdminAuth)
  .post(MissionController.Createmission)
  .put(MissionController.updatemission)
  .get(MissionController.Getmissions)
  .delete(MissionController.Deletemission);


  router
  .route("/block-mission/:id")
  .get(AdminAuth, MissionController.Blockmission);


module.exports = router;
