import React, { Fragment, useState, useEffect } from "react";

//alert

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_WHATCLIENTSAY_DIALOG } from "../../store/whatclientsay/types.js";
import {
  createNewWHATCLIENTSAY,
  editWHATCLIENTSAY,
} from "../../store/whatclientsay/action.js";

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

const WhatClientSayDialog = (props) => {
  const dispatch = useDispatch();

  const {
    dialog: open,
    dialogData,
    WHATCLIENTSAY,
  } = useSelector((state) => state.WhatClientSay);

  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState("");
  const [profesion, setprofesion] = useState("");
  const [imageData, setImageData] = useState([]);
  const [imagePath, setImagePath] = useState(null);
  const [errors, setError] = useState({
    name: "",
    answer: "",
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData?.id);
      setName(dialogData?.name);
      setAnswer(dialogData?.review);
      setprofesion(dialogData?.profesion);
      setImagePath(`${baseURL}/${dialogData?.profile_url}`);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        name: "",
        answer: "",
      });
      setMongoId("");
      setName("");
      setAnswer("");
    },
    [open]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      const errors = {};
      if (!name) {
        errors.name = "Question can't be a blank!";
      }

      if (!answer) {
        errors.name = "Answer can't be a blank!";
      }

      return setError({ ...errors });
    }

    const data = {
      id: mongoId,
      question: name,
      ans: answer,
    };

    const formData = new FormData();
    formData?.append("profile_url", imageData);
    formData?.append("name", name);
    formData?.append("profesion", profesion);
    formData?.append("review", answer);
    formData?.append("id", dialogData?.id);

    if (mongoId) {
      props.editWHATCLIENTSAY(formData, mongoId);
    } else {
      props.createNewWHATCLIENTSAY(formData);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_WHATCLIENTSAY_DIALOG });
  };

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

  return (
    <Fragment>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={closePopup}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="responsive-dialog-title">
          What say our client
        </DialogTitle>
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
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label class="float-left">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Nmae"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>

                    <div class="form-group">
                      <label class="float-left">Profesion</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Profesion"
                        required
                        value={profesion}
                        onChange={(e) => {
                          setprofesion(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="float-left">Review</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter Review"
                        required
                        rows="5"
                        cols="2"
                        value={answer}
                        onChange={(e) => {
                          setAnswer(e.target.value);

                          if (!e.target.value.trim()) {
                            setError({
                              ...errors,
                              answer: "Answer can't be blank!",
                            });
                          } else {
                            setError({
                              ...errors,
                              answer: "",
                            });
                          }
                        }}
                      />
                      {errors.answer && (
                        <div className="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.answer}
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
                  </div>
                </div>

                <button
                  type="button"
                  class="btn btn-primary btn-block btn-round"
                  onClick={handleSubmit}
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

export default connect(null, { createNewWHATCLIENTSAY, editWHATCLIENTSAY })(
  WhatClientSayDialog
);
