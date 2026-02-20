const { config } = require("dotenv");
const Syllabus = require("../Models/syllabus.modal");
const respHandler = require("../Handlers");
config();

const CreateSyllabus = async (req, res) => {
  let { course_id, sem_id, subject_id, syllabus } = req.body;
  if (course_id != "" || sem_id != "" || subject_id != "" || syllabus != "") {
    try {
      let isSyllabus = await Syllabus.findOne({
        where: {
          course_id: course_id,
          sem_id: sem_id,
          subject_id: subject_id,
          syllabus: syllabus,
        },
      });
      if (isSyllabus) {
        return respHandler.error(res, {
          status: false,
          msg: "Allready Exist!!",
          error: [],
        });
      }

      let Newsyllabus = await Syllabus.create({
        course_id: course_id,
        sem_id: sem_id,
        subject_id: subject_id,
        syllabus: syllabus,
      });

      if (Newsyllabus) {
        return respHandler.success(res, {
          status: true,
          data: Newsyllabus,
          msg: "Syllabus Added Successfully!!",
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

const GetSyllabuss = async (req, res) => {
  try {
    let Syllabuss = await Syllabus.findAll({ order: [["id", "DESC"]] });
    return respHandler.success(res, {
      status: true,
      data: Syllabuss,
      msg: "All Syllabus Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const GetSyllabusByIds = async (req, res) => {
  try {
    const { courseId, semId, subjectId } = req.params;

    console.log("from GetSyllabusByIds ",courseId, semId, subjectId);

    let Syllabuss = await Syllabus.findOne({
      where: {
        course_id: courseId,
        sem_id: semId,
        subject_id: subjectId,
      },
    });
    return respHandler.success(res, {
      status: true,
      data: Syllabuss,
      msg: "Syllabus by ids Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updateSyllabus = async (req, res) => {
  let { course_id, sem_id, subject_id, syllabus, id } = req.body;

  try {
    let Syllabusstatus = await Syllabus.update(
      {
        course_id: course_id,
        sem_id: sem_id,
        subject_id: subject_id,
        syllabus: syllabus,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (Syllabusstatus) {
      let Updatedsyllabus = await Syllabus.findOne({
        where: {
          id: id,
        },
      });
      return respHandler.success(res, {
        status: true,
        data: Updatedsyllabus,
        msg: "Syllabus Updated Successfully!!",
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

const BlockSyllabus = async (req, res) => {
  let { id } = req.params;

  try {
    let IsSyllabus = await Syllabus.findOne({
      where: {
        id: Number(id),
      },
    });

    if (IsSyllabus) {
      let SyllabusStatus = await Syllabus.update(
        {
          block: !IsSyllabus.block,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      if (SyllabusStatus) {
        let syllabus = await Syllabus.findOne({
          where: {
            id: Number(id),
          },
        });
        return respHandler.success(res, {
          status: true,
          data: syllabus,
          msg: `Syllabus ${
            syllabus.block === 0 ? "Unblock" : "Block"
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

const DeleteSyllabus = async (req, res) => {
  try {
    let { id } = req.params;

    let syllabus = await Syllabus.findOne({ id: Number(id) });
    if (syllabus) {
      await Syllabus.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "Syllabus Deleted Successfully!!",
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
  CreateSyllabus,
  GetSyllabuss,
  updateSyllabus,
  DeleteSyllabus,
  BlockSyllabus,
  GetSyllabusByIds,
};
