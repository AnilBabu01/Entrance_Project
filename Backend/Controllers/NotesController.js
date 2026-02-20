const { config } = require("dotenv");
const Notes = require("../Models/notes.modal");
const Unit = require("../Models/units.modal");
const respHandler = require("../Handlers");
config();

const CreateNotes = async (req, res) => {
  let { course_id, sem_id, subject_id, unit } = req.body;
  if (course_id != "" || sem_id != "" || subject_id != "" || unit != "") {
    try {
      let isNotes = await Unit.findOne({
        where: {
          course_id: course_id,
          sem_id: sem_id,
          subject_id: subject_id,
          unit: unit,
        },
      });
      if (isNotes) {
        return respHandler.error(res, {
          status: false,
          msg: "Allready Exist!!",
          error: [],
        });
      }

      let notes = await Unit.create({
        course_id: course_id,
        sem_id: sem_id,
        subject_id: subject_id,
        unit: unit,
      });

      if (notes) {
        return respHandler.success(res, {
          status: true,
          data: notes,
          msg: "Unit Added Successfully!!",
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

const GetNotess = async (req, res) => {
  try {
    let Notess = await Unit.findAll({ order: [["id", "DESC"]] });
    return respHandler.success(res, {
      status: true,
      data: Notess,
      msg: "All unit fetch successfully!!",
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
    let Syllabuss = await Unit.findAll({
      where: {
        course_id: courseId,
        sem_id: semId,
        subject_id: subjectId,
      },
    });
    return respHandler.success(res, {
      status: true,
      data: Syllabuss,
      msg: "Unit by ids Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updateNotes = async (req, res) => {
  let { course_id, sem_id, subject_id, unit, id } = req.body;

  try {
    let Notesstatus = await Unit.update(
      {
        course_id: course_id,
        sem_id: sem_id,
        subject_id: subject_id,
        unit: unit,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (Notesstatus) {
      let notes = await Unit.findOne({
        where: {
          id: id,
        },
      });
      return respHandler.success(res, {
        status: true,
        data: notes,
        msg: "Unit Updated Successfully!!",
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

const BlockNotes = async (req, res) => {
  let { id } = req.params;

  try {
    let IsNotes = await Unit.findOne({
      where: {
        id: Number(id),
      },
    });

    if (IsNotes) {
      let NotesStatus = await Unit.update(
        {
          block: !IsNotes.block,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      if (NotesStatus) {
        let notes = await Unit.findOne({
          where: {
            id: Number(id),
          },
        });
        return respHandler.success(res, {
          status: true,
          data: notes,
          msg: `Unit ${Unit.block === 0 ? "Unblock" : "Block"} Successfully!!`,
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

const DeleteNotes = async (req, res) => {
  try {
    let { id } = req.params;

    let notes = await Unit.findOne({ id: Number(id) });
    if (notes) {
      await Unit.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "Unit Deleted Successfully!!",
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

const CreateUnit = async (req, res) => {
  let { course_id, sem_id, subject_id, unit_id, note } = req.body;
  if (course_id != "" || sem_id != "" || subject_id != "" || note != "") {
    try {
      let isNotes = await Notes.findOne({
        where: {
          course_id: course_id,
          sem_id: sem_id,
          subject_id: subject_id,
          unit_id: unit_id,
          note: note,
        },
      });
      if (isNotes) {
        return respHandler.error(res, {
          status: false,
          msg: "Allready Exist!!",
          error: [],
        });
      }

      let notes = await Notes.create({
        course_id: course_id,
        sem_id: sem_id,
        subject_id: subject_id,
        unit_id: unit_id,
        note: note,
      });

      if (notes) {
        return respHandler.success(res, {
          status: true,
          data: notes,
          msg: "Note Added Successfully!!",
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

const GetUnit = async (req, res) => {
  try {
    let Notess = await Notes.findAll({ order: [["id", "DESC"]] });
    return respHandler.success(res, {
      status: true,
      data: Notess,
      msg: "All Note fetch successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const GetUnitByIds = async (req, res) => {
  try {
    const { id } = req.params;
    let Syllabuss = await Notes.findOne({
      where: {
        id: id,
      },
    });
    return respHandler.success(res, {
      status: true,
      data: Syllabuss,
      msg: "Note by id Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updateUnit = async (req, res) => {
  let { course_id, sem_id, subject_id, unit_id, note, id } = req.body;

  try {
    let Notesstatus = await Notes.update(
      {
        course_id: course_id,
        sem_id: sem_id,
        subject_id: subject_id,
        note: note,
        unit_id: unit_id,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (Notesstatus) {
      let notes = await Notes.findOne({
        where: {
          id: id,
        },
      });
      return respHandler.success(res, {
        status: true,
        data: notes,
        msg: "Note Updated Successfully!!",
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

const BlockUnit = async (req, res) => {
  let { id } = req.params;

  try {
    let IsNotes = await Notes.findOne({
      where: {
        id: Number(id),
      },
    });

    if (IsNotes) {
      let NotesStatus = await Notes.update(
        {
          block: !IsNotes.block,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      if (NotesStatus) {
        let notes = await Notes.findOne({
          where: {
            id: Number(id),
          },
        });
        return respHandler.success(res, {
          status: true,
          data: notes,
          msg: `Note ${Notes.block === 0 ? "Unblock" : "Block"} Successfully!!`,
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

const DeleteUnit = async (req, res) => {
  try {
    let { id } = req.params;

    let notes = await Notes.findOne({ id: Number(id) });
    if (notes) {
      await Notes.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "Note Deleted Successfully!!",
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
  CreateNotes,
  GetNotess,
  updateNotes,
  DeleteNotes,
  BlockNotes,
  GetSyllabusByIds,
  CreateUnit,
  GetUnit,
  updateUnit,
  DeleteUnit,
  BlockUnit,
  GetUnitByIds,
};
