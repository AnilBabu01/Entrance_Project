const { config } = require("dotenv");
const Book = require("../Models/book.modal");
const respHandler = require("../Handlers");
config();

const Createbook = async (req, res) => {
  let { course_id, sem_id, subject_id } = req.body;
  if (req.file != "" || course_id != "" || sem_id != "" || subject_id != "") {
    try {
      let isbook = await Book.findOne({
        where: { course_id: course_id, sem_id: sem_id, subject_id: subject_id },
      });
      if (isbook) {
        return respHandler.error(res, {
          status: false,
          msg: "Allready Exist!!",
          error: [],
        });
      }

      let book = await Book.create({
        course_id: course_id,
        sem_id: sem_id,
        subject_id: subject_id,
        pdf_book: `images/${req.file.filename}`,
      });

      if (book) {
        return respHandler.success(res, {
          status: book,
          data: book,
          msg: "book Added Successfully!!",
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

const Getbooks = async (req, res) => {
  try {
    let books = await Book.findAll({ order: [["id", "DESC"]] });
    return respHandler.success(res, {
      status: true,
      data: books,
      msg: "All book Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const GetBookByIds = async (req, res) => {
  try {
    const { courseId, semId, subjectId } = req.params;
    let Syllabuss = await Book.findAll({
      where: {
        course_id: courseId,
        sem_id: semId,
        subject_id: subjectId,
      },
    });
    return respHandler.success(res, {
      status: true,
      data: Syllabuss,
      msg: "Books by ids Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updatebook = async (req, res) => {
  let { course_id, sem_id, subject_id } = req.body;

  try {
    let updatedData = {
      course_id: course_id,
      sem_id: sem_id,
      subject_id: subject_id,
    };

    if (req?.file?.path) {
      let existingBlog = await Book.findOne({ where: { id: id } });

      if (existingBlog?.pdf_book) {
        removefile(`public/upload/${existingBlog.pdf_book.substring(7)}`);
      }

      updatedData.pdf_book = `images/${req.file.filename}`;
    }

    let blogstatus = await Book.update(updatedData, { where: { id: id } });

    if (blogstatus) {
      let updatedBlog = await Book.findOne({ where: { id: id } });
      return respHandler.success(res, {
        status: true,
        data: updatedBlog,
        msg: "Book Updated Successfully!!",
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

const Blockbook = async (req, res) => {
  let { id } = req.params;

  try {
    let Isbook = await Book.findOne({
      where: {
        id: Number(id),
      },
    });

    if (Isbook) {
      let bookStatus = await Book.update(
        {
          block: !Isbook.block,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      if (bookStatus) {
        let book = await Book.findOne({
          where: {
            id: Number(id),
          },
        });
        return respHandler.success(res, {
          status: true,
          data: book,
          msg: `book ${book.block === 0 ? "Unblock" : "Block"} Successfully!!`,
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

const Deletebook = async (req, res) => {
  try {
    let { id } = req.params;

    let book = await Book.findOne({ id: Number(id) });
    if (book) {
      await book.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "book Deleted Successfully!!",
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
  Createbook,
  Getbooks,
  updatebook,
  Deletebook,
  Blockbook,
  GetBookByIds
};
