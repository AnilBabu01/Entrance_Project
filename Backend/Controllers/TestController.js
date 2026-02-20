const { config } = require("dotenv");
const Test = require("../Models/test.modal");
const Result = require("../Models/result.modal");
const Topscores = require("../Models/topscres.modal");
const { QueryTypes } = require("sequelize");
const sequelize = require("../Helper/Connect");

const { getRandomName } = require("../Helper/AllFunction");

const respHandler = require("../Handlers");
config();

const CreateTest = async (req, res) => {
  let {
    category_id,
    course_id,
    physics_question,
    math_question,
    chemistry_question,
    english_question,
    computer_question,
    title,
    marksPerQuestion,
    time,
  } = req.body;

  // Proper validation: all fields must be present and not empty
  if (
    !category_id ||
    !course_id ||
    !physics_question ||
    !math_question ||
    !chemistry_question ||
    !english_question ||
    !computer_question
  ) {
    return respHandler.error(res, {
      status: false,
      msg: "All fields are required!",
    });
  }

  try {
    let newTest = await Test.create({
      category_id: category_id,
      course_id: course_id,
      title: title,
      physics_question: physics_question,
      math_question: math_question,
      chemistry_question: chemistry_question,
      english_question: english_question,
      computer_question: computer_question,
      marksPerQuestion: marksPerQuestion,
      time: time,
    });

    if (newTest) {
      let newTopscores = await Topscores.create({
        test_id: newTest.id,
        firstLevel: getRandomName(),
        secondLevel: getRandomName(),
        thirdLevel: getRandomName(),
      });

      if (newTopscores) {
        return respHandler.success(res, {
          status: true,
          data: newTest,
          msg: "Test Added Successfully!!",
        });
      }
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const GetTests = async (req, res) => {
  try {
    let tests = await Test.findAll({ order: [["id", "DESC"]] });
    return respHandler.success(res, {
      status: true,
      data: tests,
      msg: "All Test Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const GetTestByCategoryIdCourseId = async (req, res) => {
  try {
    const { category_id, course_id } = req.params;
    let { page = 1, limit = 10 } = req.query; // Default: page 1, limit 10

    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    // Count total records
    const countQuery = `
      SELECT COUNT(*) AS total 
      FROM tests 
      WHERE category_id = :category_id AND course_id = :course_id
    `;

    const countResult = await sequelize.query(countQuery, {
      type: QueryTypes.SELECT,
      replacements: { category_id, course_id },
    });

    const totalRecords = countResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    // Main query with pagination
    const query = `
      SELECT t.*, ts.firstLevel, ts.secondLevel, ts.thirdLevel, tsc.category_name, c.course_name
      FROM tests AS t
      INNER JOIN topscores AS ts ON t.id = ts.test_id
      INNER JOIN testcategories AS tsc ON t.category_id = tsc.id
      INNER JOIN courses AS c ON t.course_id = c.id
      WHERE t.category_id = :category_id AND t.course_id = :course_id
      LIMIT :limit OFFSET :offset
    `;

    const results = await sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements: { category_id, course_id, limit, offset },
    });

    return respHandler.success(res, {
      status: true,
      data: results,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords,
        limit,
      },
      msg: "Test Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const GetTestOnlyOne = async (req, res) => {
  try {
    const { courseId } = req.params;

    const query = `
      SELECT t.*, ts.firstLevel, ts.secondLevel, ts.thirdLevel, tsc.category_name, c.course_name
      FROM tests AS t
      INNER JOIN topscores AS ts ON t.id = ts.test_id
      INNER JOIN testcategories AS tsc ON t.category_id = tsc.id
      INNER JOIN courses AS c ON t.course_id = c.id
      WHERE t.course_id = :courseId  -- Filter by courseId
      ORDER BY t.id DESC  -- Order by latest first
      LIMIT 1  -- Get only the latest record
    `;

    const results = await sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements: { courseId }, // Pass courseId safely
    });

    return respHandler.success(res, {
      status: true,
      data: results.length ? results[0] : null, // Return single record
      msg: "Latest Test Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const GetTestByIDs = async (req, res) => {
  try {
    const { category_id, course_id, id } = req.params;

    // Base query
    let query = `
      SELECT t.*, ts.firstLevel, ts.secondLevel, ts.thirdLevel, tsc.category_name, c.course_name
      FROM tests AS t
      INNER JOIN topscores AS ts ON t.id = ts.test_id
      INNER JOIN testcategories AS tsc ON t.category_id = tsc.id
      INNER JOIN courses AS c ON t.course_id = c.id
    `;

    // Add conditions if parameters are provided
    let conditions = [];
    let replacements = {};

    if (id) {
      conditions.push("t.id = :id");
      replacements.id = id;
    }

    if (category_id) {
      conditions.push("t.category_id = :category_id");
      replacements.category_id = category_id;
    }

    if (course_id) {
      conditions.push("t.course_id = :course_id");
      replacements.course_id = course_id;
    }

    if (conditions.length) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    query += ` ORDER BY t.id DESC LIMIT 1`; // Order by latest first and get only 1 record

    // Execute the query
    const results = await sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });

    return respHandler.success(res, {
      status: true,
      data: results.length ? results[0] : null,
      msg: "Latest Test Fetched Successfully!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!",
      error: [err.message],
    });
  }
};

module.exports = { GetTestOnlyOne };

const updateTest = async (req, res) => {
  let {
    category_id,
    course_id,
    physics_question,
    math_question,
    chemistry_question,
    english_question,
    computer_question,
    title,
    marksPerQuestion,
    time,
    id,
  } = req.body;

  try {
    let Teststatus = await Test.update(
      {
        category_id: category_id,
        course_id: course_id,
        title: title,
        physics_question: physics_question,
        math_question: math_question,
        chemistry_question: chemistry_question,
        english_question: english_question,
        computer_question: computer_question,
        marksPerQuestion: marksPerQuestion,
        time: time,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (Teststatus) {
      let test = await Test.findOne({
        where: {
          id: id,
        },
      });
      return respHandler.success(res, {
        status: true,
        data: test,
        msg: "Test Updated Successfully!!",
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

const BlockTest = async (req, res) => {
  let { id } = req.params;

  try {
    let IsTest = await Test.findOne({
      where: {
        id: Number(id),
      },
    });

    if (IsTest) {
      let TestStatus = await Test.update(
        {
          block: !IsTest.block,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      if (TestStatus) {
        let test = await Test.findOne({
          where: {
            id: Number(id),
          },
        });
        return respHandler.success(res, {
          status: true,
          data: test,
          msg: `Test ${Test.block === 0 ? "Unblock" : "Block"} Successfully!!`,
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

const DeleteTest = async (req, res) => {
  try {
    let { id } = req.params;

    let test = await Test.findOne({ id: Number(id) });
    if (test) {
      await Test.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "Test Deleted Successfully!!",
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

const CreateResult = async (req, res) => {
  let {
    category_id,
    course_id,
    test_id,
    physics_question,
    math_question,
    chemistry_question,
    english_question,
    computer_question,
    title,
    marksPerQuestion,
    time,
  } = req.body;

  if (
    !category_id ||
    !course_id ||
    !physics_question ||
    !math_question ||
    !chemistry_question ||
    !english_question ||
    !computer_question
  ) {
    return respHandler.error(res, {
      status: false,
      msg: "All fields are required!",
    });
  }

  try {
    let newTest = await Result.create({
      category_id: category_id,
      course_id: course_id,
      user_id: req.user?.id,
      test_id: test_id,
      title: title,
      physics_question: physics_question,
      math_question: math_question,
      chemistry_question: chemistry_question,
      english_question: english_question,
      computer_question: computer_question,
      marksPerQuestion: marksPerQuestion,
      time: time,
    });

    if (newTest) {
      return respHandler.success(res, {
        status: true,
        data: newTest,
        msg: "Your result submit successfully!!",
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
  CreateTest,
  GetTests,
  updateTest,
  DeleteTest,
  BlockTest,
  GetTestByCategoryIdCourseId,
  GetTestOnlyOne,
  GetTestByIDs,
  CreateResult,
};
