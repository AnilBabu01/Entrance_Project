import React, { Fragment, useState, useEffect } from "react";

//alert

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_NOTES_DIALOG } from "../../store/notes/types.js";
import { createNewNOTES, editNOTES } from "../../store/notes/action.js";
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

const NOTESDialog = (props) => {
  const dispatch = useDispatch();

  const {
    dialog: open,
    dialogData,
    NOTES: note,
  } = useSelector((state) => state.NOTES);

  const { SEM, SEMLIST } = useSelector((state) => state.sem);

  const { COURSE } = useSelector((state) => state.course);

  const { NOTESUNIT } = useSelector((state) => state.NOTESUNIT);

  const { SUBJECT, SUBJECTLIST } = useSelector((state) => state.subject);

  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [NOTES, setNOTES] = useState("");
  const [courseId, setCourseId] = useState("");
  const [course, setCourse] = useState([]);
  const [semId, setsemId] = useState("");
  const [subjectId, setsubjectId] = useState('');
  const [sem, setsem] = useState([]);
  const [subjectList, setsubjectList] = useState([]);
  const [unitList, setunitList] = useState([]);
  const [unitId, setunitId] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    courseId: "",
    semId: "",
    unitId: "",
    subject_id: "",
    NOTES: "",
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
    if (NOTESUNIT) {
      const filteredData = NOTESUNIT?.filter(
        (item) => item?.course_id === courseId && item?.subject_id === name
      );
      setunitList(filteredData);
    }
  }, [courseId, name, NOTESUNIT]);


  console.log("semId",semId)


  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData?.id);
      setName(dialogData?.subject_id);
      setCourseId(dialogData?.course_id);
      setsemId(dialogData?.sem_id);
      setNOTES(dialogData?.note);
      setunitId(dialogData?.unit_id);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setErrors({
        name: "",
        courseId: "",
        semId: "",
        unitId: "",
        NOTES: "",
        subject_id: "",
      });
      setMongoId("");
      setName("");
      setCourseId("");
      setsemId("");
      setNOTES("");
    },
    [open]
  );

  // Validation function
  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!name) {
      newErrors.name = "Subject is required";
      valid = false;
    }

    if (!courseId) {
      newErrors.courseId = "Course is required";
      valid = false;
    }

    if (!semId) {
      newErrors.semId = "Semester is required";
      valid = false;
    }

    if (!unitId) {
      newErrors.unitId = "Unit is required";
      valid = false;
    }

    if (!NOTES.trim()) {
      newErrors.NOTES = "Notes content is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      id: mongoId,
      course_id: courseId,
      sem_id: semId,
      subject_id: name,
      unit_id: unitId,
      note: NOTES,
    };

    if (mongoId) {
      props.editNOTES(data, mongoId);
    } else {
      props.createNewNOTES(data);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_NOTES_DIALOG });
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
        maxWidth="xl"
        style={{ width: "100%", maxWidth: "none" }}
      >
        <DialogTitle id="responsive-dialog-title">NOTES</DialogTitle>
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
                <div className="row">
                  <div className="col-md-4 col-sm-12">
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
                      {errors.courseId && (
                        <small
                          className="text-danger"
                          style={{ textAlign: "left", display: "block" }}
                        >
                          {errors.courseId}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
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
                      {errors.semId && (
                        <small
                          className="text-danger"
                          style={{ textAlign: "left", display: "block" }}
                        >
                          {errors.semId}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="col-md-4 col-sm-12">
                    <div className="form-group">
                      <label className="float-left">Subject Name</label>
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
                      {errors.name && (
                        <small
                          className="text-danger"
                          style={{ textAlign: "left", display: "block" }}
                        >
                          {errors.name}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="col-md-4 col-sm-12">
                    <div className="form-group">
                      <label className="float-left">Unit</label>
                      <select
                        className="form-control"
                        value={unitId}
                        onChange={(e) => setunitId(e.target.value)}
                      >
                        <option value="">Select a unit</option>
                        {unitList?.map((cat, index) => (
                          <option key={index} value={cat.id}>
                            {cat.unit}
                          </option>
                        ))}
                      </select>

                      {errors.unitId && (
                        <small
                          className="text-danger"
                          style={{ textAlign: "left", display: "block" }}
                        >
                          {errors.unitId}
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div className="form-group">
                      <TextEditor
                        onChange={(content) => {
                          setNOTES(content);
                        }}
                        blogHtml={NOTES}
                        setBlogHtml={setNOTES}
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

export default connect(null, { createNewNOTES, editNOTES })(NOTESDialog);
