const express = require("express");
const router = express.Router();
const NotesController = require("../../Controllers/NotesController");

const AdminAuth = require("../../Middleware/AdminAuth");

router
  .route("/notes/:id?", AdminAuth)
  .post(NotesController.CreateNotes)
  .put(NotesController.updateNotes)
  .get(NotesController.GetNotess)
  .delete(NotesController.DeleteNotes);


  router
  .route("/block-notes/:id")
  .get(AdminAuth, NotesController.BlockNotes);


  router
  .route("/unit/:id?", AdminAuth)
  .post(NotesController.CreateUnit)
  .put(NotesController.updateUnit)
  .get(NotesController.GetUnit)
  .delete(NotesController.DeleteUnit);


  router
  .route("/block-unit/:id")
  .get(AdminAuth, NotesController.BlockUnit);


module.exports = router;
