const { config } = require("dotenv");
const QuestionModal = require("../Models/question.modal");
const respHandler = require("../Handlers");
config();

const CreatequestionModal = async (req, res) => {
  let { course_id, sem_id, subject_id, questions } = req.body;
  if (questions != "") {
    try {
      let isquestionModal = await QuestionModal.findOne({
        where: {
          questions: questions,
          course_id: course_id,
          sem_id: sem_id,
          subject_id: subject_id,
        },
      });
      if (isquestionModal) {
        return respHandler.error(res, {
          status: false,
          msg: "Allready Exist!!",
          error: [],
        });
      }

      let questionModal = await QuestionModal.create({
        questions: questions,
        course_id: course_id,
        sem_id: sem_id,
        subject_id: subject_id,
      });

      if (questionModal) {
        return respHandler.success(res, {
          status: questionModal,
          data: questionModal,
          msg: "Question Modal Added Successfully!!",
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

const GetquestionModals = async (req, res) => {
  try {
    let questionModals = await QuestionModal.findAll({
      order: [["id", "DESC"]],
    });
    return respHandler.success(res, {
      status: true,
      data: questionModals,
      msg: "All Question Modal Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};


const GetOldQuestionModalByIds = async (req, res) => {
  try {
    const { courseId, semId, subjectId } = req.params;
    let Syllabuss = await QuestionModal.findAll({
      where: {
        course_id: courseId,
        sem_id: semId,
        subject_id: subjectId,
      },
    });
    return respHandler.success(res, {
      status: true,
      data: Syllabuss,
      msg: "Old question modal by ids Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updatequestionModal = async (req, res) => {
  let { questions, course_id, sem_id, subject_id, id } = req.body;

  try {
    let questionModalstatus = await QuestionModal.update(
      {
        questions: questions,
        course_id: course_id,
        sem_id: sem_id,
        subject_id: subject_id,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (questionModalstatus) {
      let questionModal = await QuestionModal.findOne({
        where: {
          id: id,
        },
      });
      return respHandler.success(res, {
        status: true,
        data: questionModal,
        msg: "Question Modal Updated Successfully!!",
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

const BlockquestionModal = async (req, res) => {
  let { id } = req.params;

  try {
    let IsquestionModal = await QuestionModal.findOne({
      where: {
        id: Number(id),
      },
    });

    if (IsquestionModal) {
      let questionModalStatus = await QuestionModal.update(
        {
          block: !IsquestionModal.block,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      if (questionModalStatus) {
        let questionModal = await QuestionModal.findOne({
          where: {
            id: Number(id),
          },
        });
        return respHandler.success(res, {
          status: true,
          data: questionModal,
          msg: `uestion Modal ${
            questionModal.block === 0 ? "Unblock" : "Block"
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

const DeletequestionModal = async (req, res) => {
  try {
    let { id } = req.params;

    let questionModal = await QuestionModal.findOne({ id: Number(id) });
    if (questionModal) {
      await questionModal.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "Question Modal Deleted Successfully!!",
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
  CreatequestionModal,
  GetquestionModals,
  updatequestionModal,
  DeletequestionModal,
  BlockquestionModal,
  GetOldQuestionModalByIds
};
