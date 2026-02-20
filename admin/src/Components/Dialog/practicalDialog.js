import React, { Fragment, useState, useEffect } from "react";

//alert
import { baseURL } from "../../util/config.js";
//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_PRACTICAL_DIALOG } from "../../store/practical/types.js";
import { createNewPRACTICAL, editPRACTICAL } from "../../store/practical/action.js";
import { GetSemByCourseId } from "../../store/sem/action.js";
import { GetSubjectByCourseIdSemId } from "../../store/subject/action.js";
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

const PRACTICALDialog = (props) => {
  const dispatch = useDispatch();

  const {
    dialog: open,
    dialogData,
    PRACTICAL: note,
  } = useSelector((state) => state.Practical);

  const { SEM, SEMLIST } = useSelector((state) => state.sem);

  const { COURSE } = useSelector((state) => state.course);

  const { SUBJECT, SUBJECTLIST } = useSelector((state) => state.subject);

  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [imageData, setImageData] = useState([]);
  const [imagePath, setImagePath] = useState(null);
  const [PRACTICAL, setPRACTICAL] = useState("");
  const [courseId, setCourseId] = useState("");
  const [course, setCourse] = useState([]);
  const [semId, setsemId] = useState("");
  const [sem, setsem] = useState([]);
  const [subjectList, setsubjectList] = useState([]);
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
    }

    if (SUBJECTLIST && SUBJECTLIST.length > 0) {
      setsubjectList(SUBJECTLIST);
    } else if (SUBJECT && SUBJECT.length > 0) {
      setsubjectList(SUBJECT);
    }
  }, [COURSE, SEMLIST, SEM, SUBJECT, SUBJECTLIST]);

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData?.id);
      setName(dialogData?.subject_id);
      setCourseId(dialogData?.course_id);
      setsemId(dialogData?.sem_id);
      setPRACTICAL(dialogData?.questions);
      setImagePath(`${baseURL}/${dialogData?.pdf_practical}`);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        name: "",
      });
      setMongoId("");
      setName("");
      setCourseId("");
      setsemId("");
      setPRACTICAL("");
    },
    [open]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      const errors = {};
      if (!name) {
        errors.name = "PRACTICAL name can't be a blank!";
      }

      return setError({ ...errors });
    }

    const formData = new FormData();
    formData?.append("pdf_practical", imageData);
    formData?.append("course_id", courseId);
    formData?.append("sem_id", semId);
    formData?.append("subject_id", name);
    formData?.append("id", dialogData?.id);

    if (mongoId) {
      props.editPRACTICAL(formData, mongoId);
    } else {
      props.createNewPRACTICAL(formData);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_PRACTICAL_DIALOG });
  };

  const handleCourseChange = (selectedId) => {
    setCourseId(selectedId);
    dispatch(GetSemByCourseId(selectedId));
  };

  const handleSemChange = (selectedId) => {
    setsemId(selectedId);
    dispatch(GetSubjectByCourseIdSemId(courseId, selectedId));
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
        <DialogTitle id="responsive-dialog-title">PRACTICAL</DialogTitle>
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
                    </div>
                    <div className="form-group">
                      <label className="float-left">Semester</label>
                      <select
                        className="form-control"
                        value={semId}
                        onChange={(e) => handleSemChange(e.target.value)}
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
                      <label class="float-left">PRACTICAL Name</label>

                      <select
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      >
                        <option value="">Select a subject</option>
                        {subjectList.map((cat, index) => (
                          <option key={index} value={cat.id}>
                            {cat.subject_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div class="form-group">
                      <label class="float-left">PDF</label>
                      <input
                        class="form-control"
                        type="file"
                        accept="application/pdf"
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

export default connect(null, { createNewPRACTICAL, editPRACTICAL })(PRACTICALDialog);
