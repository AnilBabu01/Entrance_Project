const { config } = require("dotenv");
const { Op } = require("sequelize");
const Blog = require("../Models/blog.modal");
const removefile = require("../Middleware/removefile");
const respHandler = require("../Handlers");
config();

const CreateBlog = async (req, res) => {
  let { title, description, blog, category_id } = req.body;
  if (req.file != "" || title != "" || blog != "") {
    try {
      let createBlog = await Blog.create({
        title: title ?? "",
        description: description ?? "",
        blog: blog ?? "",
        category_id: category_id,
        img_url: `images/${req.file.filename}`,
      });

      if (createBlog) {
        return respHandler.success(res, {
          status: true,
          data: createBlog,
          msg: "Blog Added Successfully!!",
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

const GetBlogs = async (req, res) => {
  try {
    let games = await Blog.findAll({ order: [["id", "DESC"]] });
    return respHandler.success(res, {
      status: true,
      data: games,
      msg: "All New Game Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const updateBlog = async (req, res) => {
  let { title, description, blog, id, img_url, category_id } = req.body;

  try {
    let updatedData = {
      title: title,
      blog: blog,
      description: description,
      category_id: category_id,
    };

    if (req?.file?.path) {
      let existingBlog = await Blog.findOne({ where: { id: id } });

      if (existingBlog?.img_url) {
        removefile(`public/upload/${existingBlog.img_url.substring(7)}`);
      }

      updatedData.img_url = `images/${req.file.filename}`;
    }

    let blogstatus = await Blog.update(updatedData, { where: { id: id } });

    if (blogstatus) {
      let updatedBlog = await Blog.findOne({ where: { id: id } });
      return respHandler.success(res, {
        status: true,
        data: updatedBlog,
        msg: "Blog Updated Successfully!!",
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

const BlockBlog = async (req, res) => {
  let { id } = req.params;

  try {
    let IsBlog = await Blog.findOne({
      where: {
        id: Number(id),
      },
    });

    if (IsBlog) {
      let BlogStatus = await Blog.update(
        {
          block: !IsBlog.block,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      if (BlogStatus) {
        let blog = await Blog.findOne({
          where: {
            id: Number(id),
          },
        });
        return respHandler.success(res, {
          status: true,
          data: blog,
          msg: `Blog ${blog.block === 0 ? "Unblock" : "Block"} Successfully!!`,
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

const DeleteBlog = async (req, res) => {
  try {
    let { id } = req.params;

    let blog = await Blog.findOne({ id: Number(id) });

    if (blog) {
      // removefile(`public/upload/${game?.gameimg.substring(7)}`);
      await Blog.destroy({
        where: {
          id: Number(id),
        },
      });

      return respHandler.success(res, {
        status: true,
        data: Number(id),
        msg: "Blog Deleted Successfully!!",
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

const GetBlogsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    let blogs = await Blog.findAndCountAll({
      where: { category_id: id },
      order: [["id", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return respHandler.success(res, {
      status: true,
      data: blogs.rows,
      total: blogs.count,
      totalPages: Math.ceil(blogs.count / limit),
      currentPage: parseInt(page),
      msg: "Blogs fetched successfully!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something went wrong!",
      error: [err.message],
    });
  }
};

const SearchBlog = async (req, res) => {
  try {
    const { search } = req.params;

    let whereCondition = {};

    if (search) {
      whereCondition = {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    let blogs = await Blog.findAll({
      where: whereCondition,
      order: [["id", "DESC"]],
    });

    return res.json({
      status: true,
      data: blogs,
      msg: "Blogs fetched successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      msg: "Something went wrong!",
      error: err.message,
    });
  }
};

const GetLatestBlogs = async (req, res) => {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : 5;
    let page = req.query.page ? parseInt(req.query.page) : 1;

    let offset = (page - 1) * limit;

    let { count, rows: blogs } = await Blog.findAndCountAll({
      order: [["id", "DESC"]],
      limit: limit,
      offset: offset,
    });

    return respHandler.success(res, {
      status: true,
      data: {
        blogs,
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit),
        },
      },
      msg: "Latest blogs fetched successfully!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something went wrong!",
      error: [err.message],
    });
  }
};

const GetBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    let games = await Blog.findOne({
      where: { id: id },
      order: [["id", "DESC"]],
    });
    return respHandler.success(res, {
      status: true,
      data: games,
      msg: "All New Game Fetch Successfully!!",
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

module.exports = {
  CreateBlog,
  GetBlogs,
  updateBlog,
  DeleteBlog,
  BlockBlog,
  GetBlogsByCategory,
  SearchBlog,
  GetLatestBlogs,
  GetBlogById,
};
