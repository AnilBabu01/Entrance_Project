const { config } = require("dotenv");
const Practical = require("../Models/practical.modal");
const respHandler = require("../Handlers");
config();

const Createpractical = async (req, res) => {
  let { course_id, sem_id, subject_id } = req.body;
  if (req.file != "" || course_id != "" || sem_id != "" || subject_id != "") {
    try {
      let ispractical = await Practical.findOne({
        where: { course_id: course_id, sem_id: sem_id, subject_id: subject_id },
      });
      if (ispractical) {
        return respHandler.error(res, {
          status: false,
          msg: "Allready Exist!!",
          error: [],
        });
      }

      let practical = await Practical.create({
        course_id: course_id,
        sem_id: sem_id,
        subject_id: subject_id,
        pdf_practical: `images/${req.file.filename}`,
      });

      if (practical) {
        return respHandler.success(res, {
          status: practical,
          data: practical,
          msg: "practical Added Successfully!!",
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

const Getpracticals = async (req, res) => {
  try {
    let practicals = await Practical.findAll({ order: [["id", "DESC"]] });
    return respHandler.success(res, {
      status: true,
      data: practicals,
      msg: "All practical Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};



const GetPracticalByIds = async (req, res) => {
  try {
    const { courseId, semId, subjectId } = req.params;
    let Syllabuss = await Practical.findAll({
      where: {
        course_id: courseId,
        sem_id: semId,
        subject_id: subjectId,
      },
    });
    return respHandler.success(res, {
      status: true,
      data: Syllabuss,
      msg: "Practicals by ids Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updatepractical = async (req, res) => {

  let { course_id, sem_id, subject_id } = req.body;

  try {
    let updatedData = {
      course_id: course_id,
      sem_id: sem_id,
      subject_id: subject_id,
    };

    if (req?.file?.path) {
      let existingBlog = await Practical.findOne({ where: { id: id } });

      if (existingBlog?.pdf_practical) {
        removefile(`public/upload/${existingBlog.pdf_practical.substring(7)}`);
      }

      updatedData.pdf_practical = `images/${req.file.filename}`;
    }

    let blogstatus = await Practical.update(updatedData, { where: { id: id } });

    if (blogstatus) {
      let updatedBlog = await Practical.findOne({ where: { id: id } });
      return respHandler.success(res, {
        status: true,
        data: updatedBlog,
        msg: "Practical Updated Successfully!!",
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


const Blockpractical = async (req, res) => {
  let { id } = req.params;

  try {
    let Ispractical = await Practical.findOne({
      where: {
        id: Number(id),
      },
    });

    if (Ispractical) {
      let practicalStatus = await Practical.update(
        {
          block: !Ispractical.block,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      if (practicalStatus) {
        let practical = await Practical.findOne({
          where: {
            id: Number(id),
          },
        });
        return respHandler.success(res, {
          status: true,
          data: practical,
          msg: `practical ${
            practical.block === 0 ? "Unblock" : "Block"
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

const Deletepractical = async (req, res) => {
  try {
    let { id } = req.params;

    let practical = await Practical.findOne({ id: Number(id) });
    if (practical) {
      await practical.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "practical Deleted Successfully!!",
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
  Createpractical,
  Getpracticals,
  updatepractical,
  Deletepractical,
  Blockpractical,
  GetPracticalByIds
};
