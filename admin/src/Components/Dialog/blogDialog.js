/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState, useEffect } from "react";

//alert

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_BLOG_DIALOG } from "../../store/blog/types.js";
import { editBLOG, createBLOG } from "../../store/blog/action.js";

import { getBlogCategory } from "../../store/blogCategory/action.js";
//server path
import { baseURL } from "../../util/config.js";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//custom javascript
import "../../dist/js/custom.min.js";
import "../../dist/js/app-style-switcher.js";
import "../../dist/js/sidebarmenu.js";
import "../../dist/js/feather.min.js";
import "../../assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js";

//icon
import Cancel from "@material-ui/icons/Cancel";
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";

//dialog
import Dialog from "@material-ui/core/Dialog";
import TextEditor from "../Common/TextEditor.jsx";

const BlogDialog = (props) => {
  const dispatch = useDispatch();

  const {
    dialog: open,
    dialogData,
    BLOG,
  } = useSelector((state) => state.addBlog);

  const { BlogCategory } = useSelector((state) => state.blog);

  const [imageData, setImageData] = useState([]);
  const [imagePath, setImagePath] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [blogHtml, setBlogHtml] = useState("");
  const [categories, setcategories] = useState([]);

  const [errors, setError] = useState({
    name: "",
    image: "",
    bio: "",
  });

  useEffect(() => {
    if (BlogCategory) {
      setcategories(BlogCategory);
    }
  }, [BlogCategory]);

  useEffect(() => {
    if (dialogData) {
      setBlogHtml(dialogData?.blog);
      setImagePath(`${baseURL}/${dialogData?.img_url}`);
      setTitle(dialogData?.title);
      setDescription(dialogData?.description);
      setCategory(dialogData?.category_id);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        title: "",
        description: "",
        image: "",
        blogHtml: "",
        category_id: "",
      });
      setTitle("");
      setDescription("");
      setBlogHtml("");
      setCategory("");
      setImageData([]);
      setImagePath(null);
      dispatch(getBlogCategory());
    },
    [open]
  );

  const handleInputImage = (e) => {
    if (e.target.files[0]) {
      setImageData(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    if (!title || !description || !imagePath || !blogHtml || !category) {
      const errors = {};
      if (!title) {
        errors.title = "Title can't be a blank!";
      }
      if (!description) {
        errors.description = "Description can't be blank!";
      }

      //   if (imageData.length === 0) {
      //     errors.image = "Please select an Image!";
      //   }

      if (!blogHtml) {
        errors.blogHtml = "Blog Html can't be blank!";
      }

      if (!category) {
        errors.category = "Please select an category!";
      }

      return setError({ ...errors });
    } else {
      const formData = new FormData();
      formData?.append("img_url", imageData);
      formData?.append("title", title);
      formData?.append("description", description);
      formData?.append("blog", blogHtml);
      formData?.append("category_id", category);
      formData?.append("id", dialogData?.id);
      if (dialogData) {
        props.editBLOG(formData, dialogData?.id);
      } else {
        props.createBLOG(formData);
      }
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_BLOG_DIALOG });
  };

  useEffect(() => {
    console.log("Updated Blog HTML:", blogHtml);
  }, [blogHtml]);

  return (
    <Fragment>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={closePopup}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="xl"
        style={{ width: "100%", maxWidth: "none" }}
      >
        <DialogTitle id="responsive-dialog-title">Blog</DialogTitle>

        <IconButton
          style={{
            position: "absolute",
            right: 0,
            color: "#5E72E4",
          }}
        >
          <Tooltip title="Close">
            <Cancel onClick={closePopup} />
          </Tooltip>
        </IconButton>
        <DialogContent>
          <div class="modal-body pt-1 px-1 pb-3">
            <div class="d-flex flex-column text-center">
              <form>
                <div className="form-group">
                  <label className="float-left">Category</label>
                  <select
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a Category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat.id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.category}
                      </Typography>
                    </div>
                  )}
                </div>

                <div class="form-group">
                  <label class="float-left">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Name"
                    required
                    value={title}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => {
                      setTitle(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          title: "Title can't be a blank!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          title: "",
                        });
                      }
                    }}
                  />
                  {errors.title && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.title}
                      </Typography>
                    </div>
                  )}
                </div>
                <div class="form-group ">
                  <label class="float-left">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Description"
                    required
                    value={description}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => {
                      setDescription(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          description: "Description can't be a blank!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          description: "",
                        });
                      }
                    }}
                  />
                  {errors.description && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.description}
                      </Typography>
                    </div>
                  )}
                </div>

                <div class="form-group">
                  <label class="float-left">Image</label>
                  <input
                    class="form-control"
                    type="file"
                    accept="image/jpg ,image/jpeg ,image/png"
                    required=""
                    onChange={handleInputImage}
                  />
                  {errors.image && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.image}
                      </Typography>
                    </div>
                  )}
                  <div className="row mb-0 ml-2">
                    {imagePath && (
                      <Fragment>
                        <img
                          src={imagePath}
                          class="mt-3 rounded float-left mb-2"
                          height="50px"
                          width="50px"
                        />
                      </Fragment>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <TextEditor
                    onChange={(content) => {
                      console.log("Editor Content:", content);
                      setBlogHtml(content);
                    }}
                    blogHtml={blogHtml}
                    setBlogHtml={setBlogHtml}
                  />
                  {errors.blogHtml && (
                    <div className="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.blogHtml}
                      </Typography>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  class="btn btn-primary btn-block btn-round"
                  onClick={() => handleSubmit()}
                  onKeyPress={handleKeyPress}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default connect(null, { createBLOG, editBLOG })(BlogDialog);
