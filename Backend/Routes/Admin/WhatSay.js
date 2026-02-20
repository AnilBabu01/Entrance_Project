const express = require("express");
const router = express.Router();
const WhatSayClientController = require("../../Controllers/WhatSayClientController");
const upload = require("../../Middleware/upload");
const AdminAuth = require("../../Middleware/AdminAuth");

router
  .route("/whatsayclient/:id?", AdminAuth)
  .post(upload.single("profile_url"), WhatSayClientController.CreateWhatSayClient)
  .put(upload.single("profile_url"), WhatSayClientController.updateWhatSayClient)
  .get(WhatSayClientController.GetWhatSayClients)
  .delete(WhatSayClientController.DeleteWhatSayClient);

  router
  .route("/block-whatsayclient/:id")
  .get(AdminAuth, WhatSayClientController.BlockWhatSayClient);


module.exports = router;
