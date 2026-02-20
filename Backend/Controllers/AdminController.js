const { config } = require("dotenv");
const Setting = require("../Models/settings.modal");
const Faq = require("../Models/faq.modal");
const Blog = require("../Models/blog.modal");
const User = require("../Models/user.model");
const Note = require("../Models/notes.modal");
const Test = require("../Models/test.modal");
const Syllabus = require("../Models/syllabus.modal");
const OldQuestion = require("../Models/question.modal");
const Book = require("../Models/book.modal");
const Practical = require('../Models/practical.modal');

const respHandler = require("../Handlers");

config();



const UpdateSettings = async (req, res) => {
  let { id } = req.params;

  const {
    facebook_profile,
    linkedln_Profile,
    youtube_url,
    instagram_Profile,
    firebase,
    address,
    follow_us,
    about_us,
    hideText,
    hideTextStatus,
    mail_template,
    send_mail,
    app_password,
    privacy_Policy,
    terms_of_service
  } = req.body;

  try {
    let settingsRecord = await Setting.findOne({ where: { id } });

    if (!settingsRecord) {
      return respHandler.error(res, {
        status: false,
        msg: "Not found!!",
      });
    }

    let updateData = {
      firebase,
      address,
      follow_us,
      about_us,
      hideText,
      hideTextStatus,
      facebook_profile,
      linkedln_Profile,
      youtube_url,
      instagram_Profile,
      mail_template,
      send_mail,
      app_password,
      privacy_Policy,
      terms_of_service
    };

    // Update images only if they exist in the request
    if (req.files["about_img"]) {
      updateData.about_img = `images/${req.files["about_img"][0].filename}`;
    }

    if (req.files["home_screen_img"]) {
      updateData.home_screen_img = `images/${req.files["home_screen_img"][0].filename}`;
    }

    if (req.files["entrance_img"]) {
      updateData.entrance_img = `images/${req.files["entrance_img"][0].filename}`;
    }

    if (req.files["signin_img"]) {
      updateData.signin_img = `images/${req.files["signin_img"][0].filename}`;
    }

    if (req.files["signup_img"]) {
      updateData.signup_img = `images/${req.files["signup_img"][0].filename}`;
    }

    let updatedRowsCount = await Setting.update(updateData, { where: { id } });

    const updatedSettings = await Setting.findOne({ where: { id } });

    if (updatedRowsCount > 0) {
      return respHandler.success(res, {
        status: true,
        msg: "Settings updated successfully!",
        data: updatedSettings,
      });
    } else {
      return respHandler.error(res, {
        status: false,
        msg: "Nothing was updated. No changes detected.",
        error: [req.body],
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

const GetSettings = async (req, res) => {
  try {

    const updatedSettings = await Setting.findOne({});

    if (!updatedSettings) {
      return respHandler.error(res, {
        status: false,
        msg: "Not found!!",
      });
    }

    return respHandler.success(res, {
      status: true,
      msg: "Get settings successfully!",
      data: updatedSettings,
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const Dashboard = async (req, res) => {
  try {
    const faqCount = await Faq.findAll({});
    const blogCount = await Blog.findAll({});
    const userCount = await User.findAll({});
    const noteCount = await Note.findAll({});
    const testCount = await Test.findAll({});
    const syllabusCount = await Syllabus.findAll({});
    const OldQuestionCount = await OldQuestion.findAll({});
    const bookCount = await Book.findAll({});
    const practicalCount = await Practical.findAll({});



    let data = {
      totalFaqs: faqCount.length,
      totalBlogs: blogCount.length,
      totalUsers: userCount.length,
      totalNote: noteCount.length,
      totalTest: testCount.length,
      totalSyllabus: syllabusCount.length,
      totalQuestions: OldQuestionCount.length,
      totalbook: bookCount.length,
      totalpractical: practicalCount.length,
    };

    return respHandler.success(res, {
      status: true,
      msg: "DashBoard data fetch successfully!",
      data: data,
    });
  } catch (error) {
    return respHandler.error(res, {
      status: false,
      msg: "Something went wrong!!",
    });
  }
};
module.exports = {
  UpdateSettings,
  GetSettings,
  Dashboard,
};
