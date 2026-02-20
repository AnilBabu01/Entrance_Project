import React, { Fragment, useState, useEffect } from "react";

//alert

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_QUESTIONMODAL_DIALOG } from "../../store/questionmodal/types.js";
import { createNewQUESTIONMODAL, editQUESTIONMODAL } from "../../store/questionmodal/action.js";
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

import TextEditor from "../Common/TextEditor.jsx";

const QUESTIONMODALDialog = (props) => {
  const dispatch = useDispatch();

  const {
    dialog: open,
    dialogData,
    QUESTIONMODAL:note,
  } = useSelector((state) => state.QUESTIONMODAL);

  const { SEM, SEMLIST } = useSelector((state) => state.sem);

  const { COURSE } = useSelector((state) => state.course);

  const { SUBJECT,SUBJECTLIST } = useSelector((state) => state.subject);

  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [QUESTIONMODAL, setQUESTIONMODAL] = useState("");
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


  }, [COURSE, SEMLIST, SEM, SUBJECT,SUBJECTLIST]);

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData?.id);
      setName(dialogData?.subject_id);
      setCourseId(dialogData?.course_id);
      setsemId(dialogData?.sem_id);
      setQUESTIONMODAL(dialogData?.questions)
    }
  }, [dialogData]);

  console.log("SUBJECT", SUBJECTLIST);

  useEffect(
    () => () => {
      setError({
        name: "",
      });
      setMongoId("");
      setName("");
      setCourseId("");
      setsemId('');
      setQUESTIONMODAL("");
    },
    [open]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      const errors = {};
      if (!name) {
        errors.name = "QUESTIONMODAL name can't be a blank!";
      }

      return setError({ ...errors });
    }

    const data = {
      id: mongoId,
      course_id: courseId,
      sem_id: semId,
      subject_id: name,
      questions: QUESTIONMODAL,
    };
    if (mongoId) {
      props.editQUESTIONMODAL(data, mongoId);
    } else {
      props.createNewQUESTIONMODAL(data);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_QUESTIONMODAL_DIALOG });
  };

  const handleCourseChange = (selectedId) => {
    setCourseId(selectedId);
    dispatch(GetSemByCourseId(selectedId));
  };

  const handleSemChange = (selectedId) => {
    setsemId(selectedId);
    dispatch(GetSubjectByCourseIdSemId(courseId, selectedId));
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
        <DialogTitle id="responsive-dialog-title">QUESTIONMODAL</DialogTitle>
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
                      <label class="float-left">QUESTIONMODAL Name</label>

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

                    <div className="form-group">
                      <TextEditor
                        onChange={(content) => {
                          setQUESTIONMODAL(content);
                        }}
                        blogHtml={QUESTIONMODAL}
                        setBlogHtml={setQUESTIONMODAL}
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

export default connect(null, { createNewQUESTIONMODAL, editQUESTIONMODAL })(
  QUESTIONMODALDialog
);
