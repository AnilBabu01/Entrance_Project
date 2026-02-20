import React, { Fragment, useState, useEffect } from "react";

//alert
import { baseURL } from "../../util/config.js";
//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_TEST_DIALOG } from "../../store/test/types.js";
import { createNewTEST, editTEST } from "../../store/test/action.js";
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

const btn = ["Physics", "Math", "Chemistry", "English", "Computer"];
const hrs = ["01", "02", "03"];
const TESTDialog = (props) => {
  const dispatch = useDispatch();
  const {
    dialog: open,
    dialogData,
    TEST: note,
  } = useSelector((state) => state.TEST);
  const { COURSE } = useSelector((state) => state.course);
  const { host } = useSelector((state) => state.host);
  const [selectedBtn, setSelectedBtn] = useState(btn[0]);
  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [TEST, setTEST] = useState("");
  const [courseId, setCourseId] = useState("");
  const [title, settitle] = useState("");
  const [course, setCourse] = useState([]);
  const [semId, setsemId] = useState("");
  const [errors, setError] = useState({
    name: "",
  });
  const [marksPerQuestion, setmarksPerQuestion] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");

  const handleHourChange = (value) => {
    setSelectedHour(value);
  };

  const handleMinuteChange = (value) => {
    setSelectedMinute(value);
  };

  const [PhysicsQuestions, setPhysicsQuestions] = useState([
    {
      q: "",
      ans1: "",
      ans2: "",
      ans3: "",
      ans4: "",
      currect: "",
      checked: false,
    },
  ]);

  const [MathQuestions, setMathQuestions] = useState([
    {
      q: "",
      ans1: "",
      ans2: "",
      ans3: "",
      ans4: "",
      currect: "",
      checked: false,
    },
  ]);
  const [ChemistryQuestions, setChemistryQuestions] = useState([
    {
      q: "",
      ans1: "",
      ans2: "",
      ans3: "",
      ans4: "",
      currect: "",
      checked: false,
    },
  ]);
  const [EnglishQuestion, setEnglishQuestion] = useState([
    {
      q: "",
      ans1: "",
      ans2: "",
      ans3: "",
      ans4: "",
      currect: "",
      checked: false,
    },
  ]);
  const [ComputerQuestion, setComputerQuestion] = useState([
    {
      q: "",
      ans1: "",
      ans2: "",
      ans3: "",
      ans4: "",
      currect: "",
      checked: false,
    },
  ]);

  // Handle Input Changes
  const handleInputChange = (index, field, value) => {
    setPhysicsQuestions((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  // Add New Question
  const addNewQuestion = () => {
    setPhysicsQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        q: "",
        ans1: "",
        ans2: "",
        ans3: "",
        ans4: "",
        currect: "",
        checked: false,
      },
    ]);
  };

  // Remove Question
  const removeQuestion = (index) => {
    setPhysicsQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Input Changes
  const handleMathInputChange = (index, field, value) => {
    setMathQuestions((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  // Add New Question
  const addNewMathQuestion = () => {
    setMathQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        q: "",
        ans1: "",
        ans2: "",
        ans3: "",
        ans4: "",
        currect: "",
        checked: false,
      },
    ]);
  };

  // Remove Question
  const removeMathQuestion = (index) => {
    setMathQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Input Changes
  const handleChemistryQuestionsInputChange = (index, field, value) => {
    setChemistryQuestions((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  // Add New Question
  const addNewChemistryQuestionsQuestion = () => {
    setChemistryQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        q: "",
        ans1: "",
        ans2: "",
        ans3: "",
        ans4: "",
        currect: "",
        checked: false,
      },
    ]);
  };

  // Remove Question
  const removeChemistryQuestionsQuestion = (index) => {
    setChemistryQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Input Changes
  const handleEnglishInputChange = (index, field, value) => {
    setEnglishQuestion((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  // Add New Question
  const addNewEnglishQuestion = () => {
    setEnglishQuestion((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        q: "",
        ans1: "",
        ans2: "",
        ans3: "",
        ans4: "",
        currect: "",
        checked: false,
      },
    ]);
  };

  // Remove Question
  const removeEnglishQuestion = (index) => {
    setEnglishQuestion((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Input Changes
  const handleComputerInputChange = (index, field, value) => {
    setComputerQuestion((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  // Add New Question
  const addNewComputerQuestion = () => {
    setComputerQuestion((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        q: "",
        ans1: "",
        ans2: "",
        ans3: "",
        ans4: "",
        currect: "",
        checked: false,
      },
    ]);
  };

  // Remove Question
  const removeComputerQuestion = (index) => {
    setComputerQuestion((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (COURSE) {
      setCourse(COURSE);
    }
  }, [COURSE]);

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData?.id);
      setName(dialogData?.subject_id);
      setCourseId(dialogData?.course_id);
      setsemId(dialogData?.sem_id);
      setTEST(dialogData?.questions);
      settitle(dialogData?.title);
      setChemistryQuestions(JSON.parse(dialogData?.chemistry_question));
      setMathQuestions(JSON.parse(dialogData?.math_question));
      setComputerQuestion(JSON.parse(dialogData?.computer_question));
      setEnglishQuestion(JSON.parse(dialogData?.english_question));
      setPhysicsQuestions(JSON.parse(dialogData?.physics_question));
      setmarksPerQuestion(dialogData?.marksPerQuestion);
      setSelectedHour(dialogData?.time?.substring(0, 2));
      setSelectedMinute(dialogData?.time?.substring(3));
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
      setTEST("");
    },
    [open]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      course_id: courseId,
      category_id: semId,
      title: title,
      marksPerQuestion: marksPerQuestion,
      time: `${selectedHour}:${selectedMinute}`,
      physics_question: JSON.stringify(PhysicsQuestions),
      math_question: JSON.stringify(MathQuestions),
      chemistry_question: JSON.stringify(ChemistryQuestions),
      english_question: JSON.stringify(EnglishQuestion),
      computer_question: JSON.stringify(ComputerQuestion),
      id: dialogData?.id,
    };
    if (mongoId) {
      props.editTEST(data, mongoId);
    } else {
      props.createNewTEST(data);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_TEST_DIALOG });
  };

  const handleCourseChange = (selectedId) => {
    setCourseId(selectedId);
  };

  const handleSemChange = (selectedId) => {
    setsemId(selectedId);
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
        maxWidth="xl" // Change maxWidth to "xl" for extra-large width
        style={{ width: "100%", maxWidth: "none" }} // Ensures full width
      >
        <DialogTitle id="responsive-dialog-title">TEST</DialogTitle>
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
            <div class="">
              <form>
                <div class="row">
                  <div class="col-md-12">
                    <div className="form-group">
                      <label className="float-left">Hours</label>
                      <select
                        className="form-control"
                        value={selectedHour}
                        onChange={(e) => handleHourChange(e.target.value)}
                      >
                        <option value="">Select Hours</option>
                        {[...Array(24).keys()].map((hour) => (
                          <option
                            key={hour}
                            value={hour.toString().padStart(2, "0")}
                          >
                            {hour.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="float-left">Minutes</label>
                      <select
                        className="form-control"
                        value={selectedMinute}
                        onChange={(e) => handleMinuteChange(e.target.value)}
                      >
                        <option value="">Select Minutes</option>

                        {[...Array(60).keys()].map((minute) => (
                          <option
                            key={minute}
                            value={minute.toString().padStart(2, "0")}
                          >
                            {minute.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="float-left">Marks per question</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Marks per question"
                        required
                        value={marksPerQuestion}
                        onChange={(e) => {
                          setmarksPerQuestion(e.target.value);
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <label class="float-left">Test Title</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Test Title"
                        required
                        value={title}
                        onChange={(e) => {
                          settitle(e.target.value);
                        }}
                      />
                    </div>
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
                      <label className="float-left">Test Category</label>
                      <select
                        className="form-control"
                        value={semId}
                        onChange={(e) => handleSemChange(e.target.value)}
                      >
                        <option value="">Select a category</option>
                        {host.map((cat, index) => (
                          <option key={index} value={cat.id}>
                            {cat.category_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  {btn?.map((item, index) => {
                    return (
                      <button
                        key={index}
                        onClick={(e) => {
                          setSelectedBtn(item);
                          e.preventDefault();
                        }}
                        style={{
                          backgroundColor:
                            selectedBtn === item ? "#5e72e4" : "#d3d3d3",
                          color: selectedBtn === item ? "white" : "black",
                          padding: "10px 15px",
                          border: "none",
                          marginRight: "5px",
                          cursor: "pointer",
                          borderRadius: "5px",
                        }}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
                <div>
                  {selectedBtn === "Physics" && (
                    <>
                      {PhysicsQuestions?.map((item, index) => {
                        return (
                          <div>
                            <label
                              class="form-control-label"
                              for="input-username"
                            >
                              Question {index + 1}
                            </label>
                            <textarea
                              class="form-control"
                              rows="3"
                              value={item.q}
                              onChange={(e) =>
                                handleInputChange(index, "q", e.target.value)
                              }
                            />
                            <div
                              style={{ display: "flex", width: "100%" }}
                              className="mt-2"
                            >
                              <div class="form-group mr-4">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 1
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans1}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "ans1",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div class="form-group">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 2
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans2}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "ans2",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div style={{ display: "flex", width: "100%" }}>
                              <div class="form-group mr-4">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 3
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans3}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "ans3",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div class="form-group">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 4
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans4}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "ans4",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                justifyItems: "center",
                              }}
                            >
                              <div style={{ display: "flex", width: "100%" }}>
                                <div className="form-group mr-4">
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    Currect Answer
                                  </label>
                                  <select
                                    className="form-control"
                                    value={item.currect}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "currect",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="">
                                      -- Select Answer --
                                    </option>
                                    <option value={item.ans1}>
                                      {item.ans1}
                                    </option>
                                    <option value={item.ans2}>
                                      {item.ans2}
                                    </option>
                                    <option value={item.ans3}>
                                      {item.ans3}
                                    </option>
                                    <option value={item.ans4}>
                                      {item.ans4}
                                    </option>
                                  </select>
                                </div>
                              </div>

                              {/* Remove Question Button (Shows when there is more than one question) */}
                              {index > 0 && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    removeQuestion(index);
                                  }}
                                  style={{
                                    backgroundColor: "#5e72e4",
                                    color: "white",
                                    padding: "10px 15px",
                                    border: "none",
                                    marginRight: "5px",
                                    cursor: "pointer",
                                    borderRadius: "5px",
                                    width: "10%",
                                    height: "45px",
                                  }}
                                >
                                  Remove Item
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div style={{ widtd: "25%" }}>
                        {/* Add Question Button */}
                        <div style={{ width: "25%" }}>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addNewQuestion();
                            }}
                            style={{
                              backgroundColor: "#5e72e4",
                              color: "white",
                              padding: "10px 15px",
                              border: "none",
                              marginRight: "5px",
                              cursor: "pointer",
                              borderRadius: "5px",
                            }}
                          >
                            Add Item
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedBtn === "Math" && (
                    <>
                      {MathQuestions?.map((item, index) => {
                        return (
                          <div>
                            <label
                              class="form-control-label"
                              for="input-username"
                            >
                              Question {index + 1}
                            </label>
                            <textarea
                              class="form-control"
                              rows="3"
                              value={item.q}
                              onChange={(e) =>
                                handleMathInputChange(
                                  index,
                                  "q",
                                  e.target.value
                                )
                              }
                            />
                            <div
                              style={{ display: "flex", width: "100%" }}
                              className="mt-2"
                            >
                              <div class="form-group mr-4">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 1
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans1}
                                  onChange={(e) =>
                                    handleMathInputChange(
                                      index,
                                      "ans1",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div class="form-group">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 2
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans2}
                                  onChange={(e) =>
                                    handleMathInputChange(
                                      index,
                                      "ans2",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div style={{ display: "flex", width: "100%" }}>
                              <div class="form-group mr-4">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 3
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans3}
                                  onChange={(e) =>
                                    handleMathInputChange(
                                      index,
                                      "ans3",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div class="form-group">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 4
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans4}
                                  onChange={(e) =>
                                    handleMathInputChange(
                                      index,
                                      "ans4",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                justifyItems: "center",
                              }}
                            >
                              <div style={{ display: "flex", width: "100%" }}>
                                <div className="form-group mr-4">
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    Currect Answer
                                  </label>
                                  <select
                                    className="form-control"
                                    value={item.currect}
                                    onChange={(e) =>
                                      handleMathInputChange(
                                        index,
                                        "currect",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="">
                                      -- Select Answer --
                                    </option>
                                    <option value={item.ans1}>
                                      {item.ans1}
                                    </option>
                                    <option value={item.ans2}>
                                      {item.ans2}
                                    </option>
                                    <option value={item.ans3}>
                                      {item.ans3}
                                    </option>
                                    <option value={item.ans4}>
                                      {item.ans4}
                                    </option>
                                  </select>
                                </div>
                              </div>

                              {/* Remove Question Button (Shows when there is more than one question) */}
                              {index > 0 && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    removeMathQuestion(index);
                                  }}
                                  style={{
                                    backgroundColor: "#5e72e4",
                                    color: "white",
                                    padding: "10px 15px",
                                    border: "none",
                                    marginRight: "5px",
                                    cursor: "pointer",
                                    borderRadius: "5px",
                                    width: "10%",
                                    height: "45px",
                                  }}
                                >
                                  Remove Item
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div style={{ widtd: "25%" }}>
                        {/* Add Question Button */}
                        <div style={{ width: "25%" }}>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addNewMathQuestion();
                            }}
                            style={{
                              backgroundColor: "#5e72e4",
                              color: "white",
                              padding: "10px 15px",
                              border: "none",
                              marginRight: "5px",
                              cursor: "pointer",
                              borderRadius: "5px",
                            }}
                          >
                            Add Item
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedBtn === "Chemistry" && (
                    <>
                      {ChemistryQuestions?.map((item, index) => {
                        return (
                          <div>
                            <label
                              class="form-control-label"
                              for="input-username"
                            >
                              Question {index + 1}
                            </label>
                            <textarea
                              class="form-control"
                              rows="3"
                              value={item.q}
                              onChange={(e) =>
                                handleChemistryQuestionsInputChange(
                                  index,
                                  "q",
                                  e.target.value
                                )
                              }
                            />
                            <div
                              style={{ display: "flex", width: "100%" }}
                              className="mt-2"
                            >
                              <div class="form-group mr-4">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 1
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans1}
                                  onChange={(e) =>
                                    handleChemistryQuestionsInputChange(
                                      index,
                                      "ans1",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div class="form-group">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 2
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans2}
                                  onChange={(e) =>
                                    handleChemistryQuestionsInputChange(
                                      index,
                                      "ans2",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div style={{ display: "flex", width: "100%" }}>
                              <div class="form-group mr-4">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 3
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans3}
                                  onChange={(e) =>
                                    handleChemistryQuestionsInputChange(
                                      index,
                                      "ans3",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div class="form-group">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 4
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans4}
                                  onChange={(e) =>
                                    handleChemistryQuestionsInputChange(
                                      index,
                                      "ans4",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                justifyItems: "center",
                              }}
                            >
                              <div style={{ display: "flex", width: "100%" }}>
                                <div className="form-group mr-4">
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    Currect Answer
                                  </label>
                                  <select
                                    className="form-control"
                                    value={item.currect}
                                    onChange={(e) =>
                                      handleChemistryQuestionsInputChange(
                                        index,
                                        "currect",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="">
                                      -- Select Answer --
                                    </option>
                                    <option value={item.ans1}>
                                      {item.ans1}
                                    </option>
                                    <option value={item.ans2}>
                                      {item.ans2}
                                    </option>
                                    <option value={item.ans3}>
                                      {item.ans3}
                                    </option>
                                    <option value={item.ans4}>
                                      {item.ans4}
                                    </option>
                                  </select>
                                </div>
                              </div>

                              {/* Remove Question Button (Shows when there is more than one question) */}
                              {index > 0 && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    removeChemistryQuestionsQuestion(index);
                                  }}
                                  style={{
                                    backgroundColor: "#5e72e4",
                                    color: "white",
                                    padding: "10px 15px",
                                    border: "none",
                                    marginRight: "5px",
                                    cursor: "pointer",
                                    borderRadius: "5px",
                                    width: "10%",
                                    height: "45px",
                                  }}
                                >
                                  Remove Item
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div style={{ widtd: "25%" }}>
                        {/* Add Question Button */}
                        <div style={{ width: "25%" }}>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addNewChemistryQuestionsQuestion();
                            }}
                            style={{
                              backgroundColor: "#5e72e4",
                              color: "white",
                              padding: "10px 15px",
                              border: "none",
                              marginRight: "5px",
                              cursor: "pointer",
                              borderRadius: "5px",
                            }}
                          >
                            Add Item
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedBtn === "English" && (
                    <>
                      {EnglishQuestion?.map((item, index) => {
                        return (
                          <div>
                            <label
                              class="form-control-label"
                              for="input-username"
                            >
                              Question {index + 1}
                            </label>
                            <textarea
                              class="form-control"
                              rows="3"
                              value={item.q}
                              onChange={(e) =>
                                handleEnglishInputChange(
                                  index,
                                  "q",
                                  e.target.value
                                )
                              }
                            />
                            <div
                              style={{ display: "flex", width: "100%" }}
                              className="mt-2"
                            >
                              <div class="form-group mr-4">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 1
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans1}
                                  onChange={(e) =>
                                    handleEnglishInputChange(
                                      index,
                                      "ans1",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div class="form-group">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 2
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans2}
                                  onChange={(e) =>
                                    handleEnglishInputChange(
                                      index,
                                      "ans2",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div style={{ display: "flex", width: "100%" }}>
                              <div class="form-group mr-4">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 3
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans3}
                                  onChange={(e) =>
                                    handleEnglishInputChange(
                                      index,
                                      "ans3",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div class="form-group">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 4
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans4}
                                  onChange={(e) =>
                                    handleEnglishInputChange(
                                      index,
                                      "ans4",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                justifyItems: "center",
                              }}
                            >
                              <div style={{ display: "flex", width: "100%" }}>
                                <div className="form-group mr-4">
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    Currect Answer
                                  </label>
                                  <select
                                    className="form-control"
                                    value={item.currect}
                                    onChange={(e) =>
                                      handleEnglishInputChange(
                                        index,
                                        "currect",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="">
                                      -- Select Answer --
                                    </option>
                                    <option value={item.ans1}>
                                      {item.ans1}
                                    </option>
                                    <option value={item.ans2}>
                                      {item.ans2}
                                    </option>
                                    <option value={item.ans3}>
                                      {item.ans3}
                                    </option>
                                    <option value={item.ans4}>
                                      {item.ans4}
                                    </option>
                                  </select>
                                </div>
                              </div>

                              {/* Remove Question Button (Shows when there is more than one question) */}
                              {index > 0 && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    removeEnglishQuestion(index);
                                  }}
                                  style={{
                                    backgroundColor: "#5e72e4",
                                    color: "white",
                                    padding: "10px 15px",
                                    border: "none",
                                    marginRight: "5px",
                                    cursor: "pointer",
                                    borderRadius: "5px",
                                    width: "10%",
                                    height: "45px",
                                  }}
                                >
                                  Remove Item
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div style={{ widtd: "25%" }}>
                        {/* Add Question Button */}
                        <div style={{ width: "25%" }}>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addNewEnglishQuestion();
                            }}
                            style={{
                              backgroundColor: "#5e72e4",
                              color: "white",
                              padding: "10px 15px",
                              border: "none",
                              marginRight: "5px",
                              cursor: "pointer",
                              borderRadius: "5px",
                            }}
                          >
                            Add Item
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedBtn === "Computer" && (
                    <>
                      {ComputerQuestion?.map((item, index) => {
                        return (
                          <div>
                            <label
                              class="form-control-label"
                              for="input-username"
                            >
                              Question {index + 1}
                            </label>
                            <textarea
                              class="form-control"
                              rows="3"
                              value={item.q}
                              onChange={(e) =>
                                handleComputerInputChange(
                                  index,
                                  "q",
                                  e.target.value
                                )
                              }
                            />
                            <div
                              style={{ display: "flex", width: "100%" }}
                              className="mt-2"
                            >
                              <div class="form-group mr-4">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 1
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans1}
                                  onChange={(e) =>
                                    handleComputerInputChange(
                                      index,
                                      "ans1",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div class="form-group">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 2
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans2}
                                  onChange={(e) =>
                                    handleComputerInputChange(
                                      index,
                                      "ans2",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div style={{ display: "flex", width: "100%" }}>
                              <div class="form-group mr-4">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 3
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans3}
                                  onChange={(e) =>
                                    handleComputerInputChange(
                                      index,
                                      "ans3",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div class="form-group">
                                <label
                                  class="form-control-label"
                                  for="input-username"
                                >
                                  Option 4
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={item.ans4}
                                  onChange={(e) =>
                                    handleComputerInputChange(
                                      index,
                                      "ans4",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                justifyItems: "center",
                              }}
                            >
                              <div style={{ display: "flex", width: "100%" }}>
                                <div className="form-group mr-4">
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    Currect Answer
                                  </label>
                                  <select
                                    className="form-control"
                                    value={item.currect}
                                    onChange={(e) =>
                                      handleComputerInputChange(
                                        index,
                                        "currect",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="">
                                      -- Select Answer --
                                    </option>
                                    <option value={item.ans1}>
                                      {item.ans1}
                                    </option>
                                    <option value={item.ans2}>
                                      {item.ans2}
                                    </option>
                                    <option value={item.ans3}>
                                      {item.ans3}
                                    </option>
                                    <option value={item.ans4}>
                                      {item.ans4}
                                    </option>
                                  </select>
                                </div>
                              </div>

                              {/* Remove Question Button (Shows when there is more than one question) */}
                              {index > 0 && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    removeComputerQuestion(index);
                                  }}
                                  style={{
                                    backgroundColor: "#5e72e4",
                                    color: "white",
                                    padding: "10px 15px",
                                    border: "none",
                                    marginRight: "5px",
                                    cursor: "pointer",
                                    borderRadius: "5px",
                                    width: "10%",
                                    height: "45px",
                                  }}
                                >
                                  Remove Item
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div style={{ widtd: "25%" }}>
                        {/* Add Question Button */}
                        <div style={{ width: "25%" }}>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addNewComputerQuestion();
                            }}
                            style={{
                              backgroundColor: "#5e72e4",
                              color: "white",
                              padding: "10px 15px",
                              border: "none",
                              marginRight: "5px",
                              cursor: "pointer",
                              borderRadius: "5px",
                            }}
                          >
                            Add Item
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <button
                  type="button"
                  class="btn btn-primary btn-block btn-round mt-3"
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

export default connect(null, { createNewTEST, editTEST })(TESTDialog);
