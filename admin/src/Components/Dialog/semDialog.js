import React, { Fragment, useState, useEffect } from "react";

//alert

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_SEM_DIALOG } from "../../store/sem/types";
import { createNewSEM, editSEM } from "../../store/sem/action";


//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//custom javascript
import "../../dist/js/custom.min.js";
import "../../dist/js/app-style-switcher";
import "../../dist/js/sidebarmenu";
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

const SEMDialog = (props) => {
  const dispatch = useDispatch();

  const { dialog: open, dialogData, SEM } = useSelector((state) => state.sem);

  const { COURSE } = useSelector((state) => state.course);

  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [course, setCourse] = useState([]);
  const [errors, setError] = useState({
    name: "",
  });



  useEffect(() => {
    if (COURSE) {
      setCourse(COURSE);
    }
  }, [COURSE]);

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData?.id);
      setName(dialogData?.sem_name);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        name: "",
      });
      setMongoId("");
      setName("");
    },
    [open]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      const errors = {};
      if (!name) {
        errors.name = "Sem name can't be a blank!";
      }

      return setError({ ...errors });
    }

    const data = {
      id: mongoId,
      sem_name: name,
      course_id:courseId
    };
    if (mongoId) {
      props.editSEM(data, mongoId);
    } else {
      props.createNewSEM(data);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_SEM_DIALOG });
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
        <DialogTitle id="responsive-dialog-title">Semester</DialogTitle>
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
                    <div className="form-group">
                      <label className="float-left">Course</label>
                      <select
                        className="form-control"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                      >
                        <option value="">Select a course</option>
                        {course.map((cat, index) => (
                          <option key={index} value={cat.id}>
                            {cat.course_name}
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
                      <label class="float-left">Semester Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Semester Name"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              name: "Semester can't be a blank!",
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

export default connect(null, { createNewSEM, editSEM })(SEMDialog);
