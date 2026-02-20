import React, { Fragment, useState, useEffect } from "react";

//alert

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_SUBJECT_DIALOG } from "../../store/subject/types";
import { createNewSUBJECT, editSUBJECT } from "../../store/subject/action";
import { GetSemByCourseId } from "../../store/sem/action.js";

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

const SUBJECTDialog = (props) => {
  const dispatch = useDispatch();

  const {
    dialog: open,
    dialogData,
    SUBJECT,
  } = useSelector((state) => state.subject);
  const { SEM, SEMLIST } = useSelector((state) => state.sem);

  const { COURSE } = useSelector((state) => state.course);

  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [course, setCourse] = useState([]);
  const [semId, setsemId] = useState("");
  const [sem, setsem] = useState([]);
  const [description, setdescription] = useState("");
  const [errors, setError] = useState({
    name: "",
  });

  useEffect(() => {
    if (COURSE) {
      setCourse(COURSE);
    }
    if (SEMLIST && SEMLIST.length > 0) {
      setsem(SEMLIST);
    } else if (SEM && SEM.length > 0) {
      setsem(SEM);
      console.log("from SEM list", SEM);
    }
  }, [COURSE, SEMLIST, SEM]);
  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData?.id);
      setName(dialogData?.subject_name);
      setCourseId(dialogData?.course_id);
      setsemId(dialogData?.sem_id);
      setdescription(dialogData?.description);
      dispatch(GetSemByCourseId(dialogData?.course_id));
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        name: "",
      });
      setMongoId("");
      setName("");
      setdescription("");
      setCourseId("");
      setsemId("");
    },
    [open]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      const errors = {};
      if (!name) {
        errors.name = "Subject name can't be a blank!";
      }

      return setError({ ...errors });
    }

    const data = {
      id: mongoId,
      subject_name: name,
      course_id: courseId,
      description: description,
      sem_id: semId,
    };
    if (mongoId) {
      props.editSUBJECT(data, mongoId);
    } else {
      props.createNewSUBJECT(data);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_SUBJECT_DIALOG });
  };

  const handleCourseChange = (selectedId) => {
    setCourseId(selectedId);
    dispatch(GetSemByCourseId(selectedId));
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
        <DialogTitle id="responsive-dialog-title">Subject</DialogTitle>
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
                        onChange={(e) => handleCourseChange(e.target.value)}
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
                    <div className="form-group">
                      <label className="float-left">Semester</label>
                      <select
                        className="form-control"
                        value={semId}
                        onChange={(e) => setsemId(e.target.value)}
                      >
                        <option value="">Select a semester</option>
                        {sem.map((cat, index) => (
                          <option key={index} value={cat.id}>
                            {cat.sem_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="float-left">Subject Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Subject Name"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <label class="float-left">Description</label>
                      <textarea
                        type="text"
                        id="input-username"
                        class="form-control"
                        placeholder="Enter Subject description"
                        rows="3"
                        cols="2"
                        value={description}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setdescription(newValue);
                        }}
                      />
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

export default connect(null, { createNewSUBJECT, editSUBJECT })(SUBJECTDialog);
