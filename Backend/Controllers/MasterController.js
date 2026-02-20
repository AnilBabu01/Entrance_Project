const { config } = require("dotenv");
const TestCategory = require("../Models/testcategory.modal");
const Counse = require("../Models/course.modal");
const BlogCategory = require("../Models/blogcategory.modal");
const Sem = require("../Models/sem.modal");
const Subject = require("../Models/subject.modal");

const respHandler = require("../Handlers");
config();

const CreateTestcategory = async (req, res) => {
  let { category_name } = req.body;
  if (category_name != "") {
    try {
      let isTestcategory = await TestCategory.findOne({
        where: { category_name: category_name },
      });
      if (isTestcategory) {
        return respHandler.error(res, {
          status: false,
          msg: "Allready Exist!!",
          error: [],
        });
      }

      let Testcategory = await TestCategory.create({
        category_name: category_name,
      });

      if (Testcategory) {
        return respHandler.success(res, {
          status: true,
          data: Testcategory,
          msg: "Test Category Added Successfully!!",
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

const GetTestcategorys = async (req, res) => {
  try {
    let Testcategorys = await TestCategory.findAll();
    return respHandler.success(res, {
      status: true,
      data: Testcategorys,
      msg: "All Test Category Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const GetTestActiveCategory = async (req, res) => {
  try {
    let Testcategorys = await TestCategory.findAll({
      where: {
        block: false,
      },
    });

    return respHandler.success(res, {
      status: true,
      data: Testcategorys,
      msg: "All Test Category Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updateTestcategory = async (req, res) => {
  let { category_name, id } = req.body;

  try {
    let Testcategorystatus = await TestCategory.update(
      {
        category_name: category_name,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (Testcategorystatus) {
      let Testcategory = await TestCategory.findOne({
        where: {
          id: id,
        },
      });
      return respHandler.success(res, {
        status: true,
        data: Testcategory,
        msg: "Test Category Updated Successfully!!",
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
const BlockTestcategory = async (req, res) => {
  let { id } = req.params;

  try {
    let Iscategory = await TestCategory.findOne({ where: { id } });

    if (!Iscategory) {
      return respHandler.error(res, {
        status: false,
        msg: "Category not found!",
        error: [],
      });
    }

    let updatedCategory = await Iscategory.update(
      { block: !Iscategory.block },
      {
        where: {
          id: id,
        },
      }
    );

    return respHandler.success(res, {
      status: true,
      data: updatedCategory,
      msg: `Test Category ${
        updatedCategory.block ? "Blocked" : "Unblocked"
      } Successfully!`,
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something went wrong!",
      error: [err.message],
    });
  }
};

const DeleteTestcategory = async (req, res) => {
  try {
    let { id } = req.params;
    let Testcategory = await TestCategory.findOne({ id: Number(id) });
    if (Testcategory) {
      await TestCategory.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "Test Category Deleted Successfully!!",
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

const CreateCourse = async (req, res) => {
  let { course_name } = req.body;
  if (course_name != "") {
    try {
      let isCourse = await Counse.findOne({
        where: { course_name: course_name },
      });
      if (isCourse) {
        return respHandler.error(res, {
          status: false,
          msg: "Allready Exist!!",
          error: [],
        });
      }

      let course = await Counse.create({
        course_name: course_name,
      });

      if (course) {
        return respHandler.success(res, {
          status: true,
          data: course,
          msg: "Course Added Successfully!!",
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

const GetCourse = async (req, res) => {
  try {
    let course = await Counse.findAll({
      order: [["id", "DESC"]],
    });
    return respHandler.success(res, {
      status: true,
      data: course,
      msg: "All Course Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const GetAppCourse = async (req, res) => {
  try {
    let course = await Counse.findAll({
      where: {
        block: 1,
      },
      order: [["id", "DESC"]],
    });
    return respHandler.success(res, {
      status: true,
      data: course,
      msg: "All Course Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const GetCourseByID = async (req, res) => {
  try {
    const { id } = req.params;
    let course = await Counse.findAll({
      where: {
        id: id,
      },
      order: [["id", "DESC"]],
    });
    return respHandler.success(res, {
      status: true,
      data: course,
      msg: "All Course Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updateCourse = async (req, res) => {
  let { course_name, id } = req.body;

  try {
    let coursestatus = await Counse.update(
      {
        course_name: course_name,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (coursestatus) {
      let course = await Counse.findOne({
        where: {
          id: id,
        },
      });
      return respHandler.success(res, {
        status: true,
        data: course,
        msg: "Course Updated Successfully!!",
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

const BlockCourse = async (req, res) => {
  let { id } = req.params;

  try {
    let Iscourse = await Counse.findOne({
      where: {
        id: Number(id),
      },
    });

    if (Iscourse) {
      let TestCoursestatus = await Counse.update(
        {
          block: !Iscourse.block,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      if (TestCoursestatus) {
        let TestCourse = await Counse.findOne({
          where: {
            id: Number(id),
          },
        });
        return respHandler.success(res, {
          status: true,
          data: TestCourse,
          msg: `Course ${
            TestCourse.block === 0 ? "Unblock" : "Block"
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

const DeleteCourse = async (req, res) => {
  try {
    let { id } = req.params;

    let isCourse = await Counse.findOne({ id: Number(id) });
    if (isCourse) {
      await Counse.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "Course Deleted Successfully!!",
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

const CreateBlogCategory = async (req, res) => {
  let { category_name } = req.body;
  if (category_name != "") {
    try {
      let isBlogCategory = await BlogCategory.findOne({
        where: { category_name: category_name },
      });
      if (isBlogCategory) {
        return respHandler.error(res, {
          status: false,
          msg: "Allready Exist!!",
          error: [],
        });
      }

      let blogcategory = await BlogCategory.create({
        category_name: category_name,
      });

      if (blogcategory) {
        return respHandler.success(res, {
          status: true,
          data: blogcategory,
          msg: "Blog Category Added Successfully!!",
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

const GetBlogCategory = async (req, res) => {
  try {
    let blogcategory = await BlogCategory.findAll({
      where: {
        block: false,
      },
    });
    return respHandler.success(res, {
      status: true,
      data: blogcategory,
      msg: "All Blog Category Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updateBlogCategory = async (req, res) => {
  let { category_name, id } = req.body;

  try {
    let BlockBlogCategorytatus = await BlogCategory.update(
      {
        category_name: category_name,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (BlockBlogCategorytatus) {
      let blogcategory = await BlogCategory.findOne({
        where: {
          id: id,
        },
      });
      return respHandler.success(res, {
        status: true,
        data: blogcategory,
        msg: "Blog Category Updated Successfully!!",
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

const BlockBlogCategory = async (req, res) => {
  let { id } = req.params;

  try {
    let isBlogCategory = await BlogCategory.findOne({
      where: {
        id: Number(id),
      },
    });

    if (isBlogCategory) {
      let Blogstatus = await BlogCategory.update(
        {
          block: !isBlogCategory.block,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      if (Blogstatus) {
        let blogcategory = await BlogCategory.findOne({
          where: {
            id: Number(id),
          },
        });
        return respHandler.success(res, {
          status: true,
          data: blogcategory,
          msg: `Blog Category ${
            blogcategory.block === 0 ? "Unblock" : "Block"
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

const DeleteBlogCategory = async (req, res) => {
  try {
    let { id } = req.params;

    let isBlogCategory = await BlogCategory.findOne({ id: Number(id) });
    if (isBlogCategory) {
      await BlogCategory.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "Blog Category Deleted Successfully!!",
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

const CreateSem = async (req, res) => {
  let { sem_name, course_id } = req.body;
  if ((sem_name != "", course_id != "")) {
    try {
      let isSem = await Sem.findOne({
        where: { sem_name: sem_name, course_id: course_id },
      });
      if (isSem) {
        return respHandler.error(res, {
          status: false,
          msg: "Allready Exist!!",
          error: [],
        });
      }

      let sem = await Sem.create({
        sem_name: sem_name,
        course_id: course_id,
      });

      if (sem) {
        return respHandler.success(res, {
          status: true,
          data: sem,
          msg: "Sem Added Successfully!!",
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

const GetSem = async (req, res) => {
  try {
    let sem = await Sem.findAll({
      order: [["id", "DESC"]],
    });
    return respHandler.success(res, {
      status: true,
      data: sem,
      msg: "All Sem Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const GetSemByCourseId = async (req, res) => {
  try {
    let { id } = req.params;

    let sem = await Sem.findAll({
      where: {
        course_id: id,
      },
    });
    return respHandler.success(res, {
      status: true,
      data: sem,
      msg: "All Sem By Course Id Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updateSem = async (req, res) => {
  let { sem_name, course_id, id } = req.body;

  try {
    let semstatus = await Sem.update(
      {
        sem_name: sem_name,
        course_id: course_id,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (semstatus) {
      let sem = await Sem.findOne({
        where: {
          id: id,
        },
      });
      return respHandler.success(res, {
        status: true,
        data: sem,
        msg: "Sem Updated Successfully!!",
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

const DeleteSem = async (req, res) => {
  try {
    let { id } = req.params;

    let isSem = await Sem.findOne({ id: Number(id) });
    if (isSem) {
      await Sem.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "Sem Deleted Successfully!!",
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

const CreateSubject = async (req, res) => {
  let { subject_name, description, course_id, sem_id } = req.body;
  if (
    subject_name != "" ||
    course_id != "" ||
    sem_id != "" ||
    description != ""
  ) {
    try {
      let isSubject = await Subject.findOne({
        where: {
          subject_name: subject_name,
          course_id: course_id,
          description: description,
          sem_id: sem_id,
        },
      });
      if (isSubject) {
        return respHandler.error(res, {
          status: false,
          msg: "Allready Exist!!",
          error: [],
        });
      }

      let subject = await Subject.create({
        subject_name: subject_name,
        course_id: course_id,
        description: description,
        sem_id: sem_id,
      });

      if (subject) {
        return respHandler.success(res, {
          status: true,
          data: subject,
          msg: "Subject Added Successfully!!",
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

const GetSubject = async (req, res) => {
  try {
    let subject = await Subject.findAll({
      order: [["id", "DESC"]],
    });
    return respHandler.success(res, {
      status: true,
      data: subject,
      msg: "All Subject Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updateSubject = async (req, res) => {
  let { subject_name, description, course_id, sem_id, id } = req.body;

  try {
    let subjecttatus = await Subject.update(
      {
        subject_name: subject_name,
        description: description,
        course_id: course_id,
        sem_id: sem_id,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (subjecttatus) {
      let subject = await Subject.findOne({
        where: {
          id: id,
        },
      });
      return respHandler.success(res, {
        status: true,
        data: subject,
        msg: "Subject Updated Successfully!!",
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

const DeleteSubject = async (req, res) => {
  try {
    let { id } = req.params;

    let isSubject = await Subject.findOne({ id: Number(id) });
    if (isSubject) {
      await Subject.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "Subject Deleted Successfully!!",
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

const GetSubjectBySemIdAndCourseId = async (req, res) => {
  try {
    const { courseId, sem } = req.params;

    let subject = await Subject.findAll({
      where: {
        course_id: courseId,
        sem_id: sem,
      },
      order: [["id", "DESC"]],
    });

    return respHandler.success(res, {
      status: true,
      data: subject,
      msg: "Subjects fetched successfully!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something went wrong!",
      error: [err.message],
    });
  }
};

const GetSubjectId = async (req, res) => {
  try {
    const { id } = req.params;

    let subject = await Subject.findOne({
      where: {
        id: id,
      },
      order: [["id", "DESC"]],
    });

    return respHandler.success(res, {
      status: true,
      data: subject,
      msg: "Subjects fetched successfully!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something went wrong!",
      error: [err.message],
    });
  }
};

module.exports = {
  CreateTestcategory,
  GetTestcategorys,
  updateTestcategory,
  DeleteTestcategory,
  BlockTestcategory,
  CreateCourse,
  GetCourse,
  updateCourse,
  DeleteCourse,
  BlockCourse,
  CreateBlogCategory,
  GetBlogCategory,
  updateBlogCategory,
  DeleteBlogCategory,
  BlockBlogCategory,
  CreateSem,
  GetSem,
  updateSem,
  DeleteSem,
  GetSemByCourseId,
  CreateSubject,
  GetSubject,
  updateSubject,
  DeleteSubject,
  GetSubjectBySemIdAndCourseId,
  GetTestActiveCategory,
  GetCourseByID,
  GetSubjectId,
  GetAppCourse,
};
