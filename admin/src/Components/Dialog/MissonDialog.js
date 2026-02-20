import React, { Fragment, useState, useEffect } from "react";

//alert

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_MISSION_DIALOG } from "../../store/mission/types.js";
import { createNewMISSION, editMISSION } from "../../store/mission/action.js";


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

const MissonDialog = (props) => {
  const dispatch = useDispatch();

  const { dialog: open, dialogData, MISSION } = useSelector((state) => state.mission);

  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState("");
  const [errors, setError] = useState({
    name: "",
    answer: "",
  });



  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData?.id);
      setName(dialogData?.title);
      setAnswer(dialogData?.description);
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
      title: name,
      description: answer,
    };
    if (mongoId) {
      props.editMISSION(data, mongoId);
    } else {
      props.createNewMISSION(data);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_MISSION_DIALOG });
  };

  console.log("dialogData is dialogData", dialogData, mongoId);

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
        <DialogTitle id="responsive-dialog-title">Mission</DialogTitle>
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
                      <label class="float-left">Title</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Title"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              name: "Question can't be a blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              name: "",
                            });
                          }
                        }}
                      />
                      {errors.name && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.name}
                          </Typography>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="float-left">Description</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter Description"
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

export default connect(null, { createNewMISSION, editMISSION })(MissonDialog);
