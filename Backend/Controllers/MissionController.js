const { config } = require("dotenv");
const Mission = require("../Models/mission.modal");
const respHandler = require("../Handlers");
config();

const Createmission = async (req, res) => {
  let { title, description } = req.body;
  if (title != "" || description != "") {
    try {
      let ismission = await Mission.findOne({
        where: { title: title },
      });
      if (ismission) {
        return respHandler.error(res, {
          status: false,
          msg: "Allready Exist!!",
          error: [],
        });
      }

      let mission = await Mission.create({
        title: title,
        description: description,
      });

      if (mission) {
        return respHandler.success(res, {
          status: true,
          data: mission,
          msg: "mission Added Successfully!!",
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

const Getmissions = async (req, res) => {
  try {
    let missions = await Mission.findAll({ order: [["id", "DESC"]] });
    return respHandler.success(res, {
      status: true,
      data: missions,
      msg: "All mission Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const GetmissionsWebSite = async (req, res) => {
  try {
    let missions = await Mission.findAll({
      where: {
        block: false,
      },
      order: [["id", "DESC"]],
    });
    return respHandler.success(res, {
      status: true,
      data: missions,
      msg: "All mission Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updatemission = async (req, res) => {
  let { title, description, id } = req.body;

  try {
    let missionstatus = await Mission.update(
      {
        title: title,
        description: description,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (missionstatus) {
      let mission = await Mission.findOne({
        where: {
          id: id,
        },
      });
      return respHandler.success(res, {
        status: true,
        data: mission,
        msg: "Mission Updated Successfully!!",
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

const Blockmission = async (req, res) => {
  let { id } = req.params;

  try {
    let Ismission = await Mission.findOne({
      where: {
        id: Number(id),
      },
    });

    if (Ismission) {
      let missionStatus = await Mission.update(
        {
          block: !Ismission.block,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      if (missionStatus) {
        let mission = await Mission.findOne({
          where: {
            id: Number(id),
          },
        });
        return respHandler.success(res, {
          status: true,
          data: mission,
          msg: `mission ${
            mission.block === 0 ? "Unblock" : "Block"
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

const Deletemission = async (req, res) => {
  try {
    let { id } = req.params;

    let mission = await Mission.findOne({ id: Number(id) });
    if (mission) {
      await Mission.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "mission Deleted Successfully!!",
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
  Createmission,
  Getmissions,
  updatemission,
  Deletemission,
  Blockmission,
  GetmissionsWebSite
};
