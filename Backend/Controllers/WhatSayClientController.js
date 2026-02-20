const { config } = require("dotenv");
const WhatSayClient = require("../Models/whatsayclient.modal");
const removefile = require("../Middleware/removefile");
const respHandler = require("../Handlers");
config();

const CreateWhatSayClient = async (req, res) => {
  let { name, profesion, review } = req.body;

  if (req.file != "" || name != "" || profesion != "" || review != "") {
    try {
      let createWhatSayClient = await WhatSayClient.create({
        name: name ?? "",
        profesion: profesion ?? "",
        review: review ?? "",
        profile_url: `images/${req.file.filename}`,
      });

      if (createWhatSayClient) {
        return respHandler.success(res, {
          status: true,
          data: createWhatSayClient,
          msg: "WhatSayClient Added Successfully!!",
        });
      }
    } catch (err) {
      return respHandler.error(res, {
        status: false,
        msg: "Something Went Wrong!!",
        error: [err.message],
      });
    }
  } else {
    return respHandler.error(res, {
      status: false,
      msg: "field are required!!",
    });
  }
};

const GetWhatSayClients = async (req, res) => {
  try {
    let games = await WhatSayClient.findAll({ order: [["id", "DESC"]] });
    return respHandler.success(res, {
      status: true,
      data: games,
      msg: "All New Game Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updateWhatSayClient = async (req, res) => {
  let { name, profesion, review, id } = req.body;

  try {
    let updatedData = {
      name: name,
      profesion: profesion,
      review: review,
    };

    if (req?.file?.path) {
      let existingWhatSayClient = await WhatSayClient.findOne({
        where: { id: id },
      });

      if (existingWhatSayClient?.profile_url) {
        removefile(
          `public/upload/${existingWhatSayClient.profile_url.substring(7)}`
        );
      }

      updatedData.profile_url = `images/${req.file.filename}`;
    }

    let WhatSayClientstatus = await WhatSayClient.update(updatedData, {
      where: { id: id },
    });

    if (WhatSayClientstatus) {
      let updatedWhatSayClient = await WhatSayClient.findOne({
        where: { id: id },
      });
      return respHandler.success(res, {
        status: true,
        data: updatedWhatSayClient,
        msg: "WhatSayClient Updated Successfully!!",
      });
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};
const BlockWhatSayClient = async (req, res) => {
  let { id } = req.params;

  try {
    let IsWhatSayClient = await WhatSayClient.findOne({
      where: {
        id: Number(id),
      },
    });

    if (IsWhatSayClient) {
      let WhatSayClientStatus = await WhatSayClient.update(
        {
          block: !IsWhatSayClient.block,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      if (WhatSayClientStatus) {
        let updatedWhatSayClient = await WhatSayClient.findOne({
          where: {
            id: Number(id),
          },
        });
        return respHandler.success(res, {
          status: true,
          data: updatedWhatSayClient,
          msg: `WhatSayClient ${
            updatedWhatSayClient.block === 0 ? "Unblock" : "Block"
          } Successfully!!`,
        });
      }
    } else {
      return respHandler.error(res, {
        status: false,
        msg: "Not found!!",
        error: [],
      });
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const DeleteWhatSayClient = async (req, res) => {
  try {
    let { id } = req.params;

    let SayClient = await WhatSayClient.findOne({ id: Number(id) });

    if (SayClient) {
      // removefile(`public/upload/${game?.gameimg.substring(7)}`);
      await WhatSayClient.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "WhatSayClient Deleted Successfully!!",
      });
    } else {
      return respHandler.error(res, {
        status: false,
        msg: "Something Went Wrong!!",
        error: ["not found"],
      });
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

module.exports = {
  CreateWhatSayClient,
  GetWhatSayClients,
  updateWhatSayClient,
  DeleteWhatSayClient,
  BlockWhatSayClient,
};
