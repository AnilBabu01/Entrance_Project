const { config } = require("dotenv");
const Faq = require("../Models/faq.modal");
const respHandler = require("../Handlers");
config();

const CreateFaq = async (req, res) => {
  let { question, ans } = req.body;
  if (question != "" || ans != "") {
    try {
      let isFaq = await Faq.findOne({
        where: { ans: ans },
      });
      if (isFaq) {
        return respHandler.error(res, {
          status: false,
          msg: "Allready Exist!!",
          error: [],
        });
      }

      let faq = await Faq.create({
        question: question,
        ans: ans,
      });

      if (faq) {
        return respHandler.success(res, {
          status: true,
          data: faq,
          msg: "Faq Added Successfully!!",
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

const GetFaqs = async (req, res) => {
  try {
    let faqs = await Faq.findAll({ order: [["id", "DESC"]],});
    return respHandler.success(res, {
      status: true,
      data: faqs,
      msg: "All Faq Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updateFaq = async (req, res) => {
  let { question, ans, id } = req.body;

  try {
    let faqstatus = await Faq.update(
      {
        question: question,
        ans: ans,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (faqstatus) {
      let faq = await Faq.findOne({
        where: {
          id: id,
        },
      });
      return respHandler.success(res, {
        status: true,
        data: faq,
        msg: "Faq Updated Successfully!!",
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



const BlockFaq = async (req, res) => {
  let { id } = req.params;

  try {
    let IsFaq = await Faq.findOne({
      where: {
        id: Number(id),
      },
    });

    if (IsFaq) {
      let FaqStatus = await Faq.update(
        {
          block: !IsFaq.block,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      if (FaqStatus) {
        let faq = await Faq.findOne({
          where: {
            id: Number(id),
          },
        });
        return respHandler.success(res, {
          status: true,
          data: faq,
          msg: `Faq ${
            faq.block === 0 ? "Unblock" : "Block"
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

const DeleteFaq = async (req, res) => {
  try {

    let { id } = req.params;

    let faq = await Faq.findOne({ id: Number(id) });
    if (faq) {
      await Faq.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "Faq Deleted Successfully!!",
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
  CreateFaq,
  GetFaqs,
  updateFaq,
  DeleteFaq,
  BlockFaq
};
