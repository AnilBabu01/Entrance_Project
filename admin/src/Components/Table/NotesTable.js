import React, { Fragment, useEffect, useState } from "react";

//router
import { Link, useHistory } from "react-router-dom";

//dialog
import NOTESDialog from "../Dialog/NotesDialog";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import {
  getNOTES,
  blockUnblockNOTES,
  deleteTestcategory,
} from "../../store/notes/action";

import { getNOTESUNIT } from "../../store/units/action";

import { getCOURSE } from "../../store/course/action";
import { getSEM } from "../../store/sem/action";
import { getSUBJECT } from "../../store/subject/action";

import {
  OPEN_NOTES_DIALOG,
  UNSET_CREATE_NOTES_DONE,
  UNSET_UPDATE_NOTES_DONE,
  UNSET_TEST_DELETE_NOTES_DONE,
} from "../../store/notes/types";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import TablePaginationActions from "./TablePagination";
import { Alert } from "@material-ui/lab";

const NOTEStable = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);
  const [openDeleteSuccess, setopenDeleteSuccess] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { NOTES, createDone, updateDone, deleteDone } = useSelector(
    (state) => state.NOTES
  );

  const { SEM } = useSelector((state) => state.sem);

  const { COURSE } = useSelector((state) => state.course);

  const { SUBJECT } = useSelector((state) => state.subject);

  useEffect(() => {
    dispatch(getNOTES());
    dispatch(getSEM());
    dispatch(getCOURSE());
    dispatch(getSUBJECT());
    dispatch(getNOTESUNIT());
  }, [dispatch]);

  useEffect(() => {
    setData(NOTES);
  }, [NOTES]);

  const blockUnblock = (data) => {
    props.blockUnblockNOTES(data.id);
  };

  const handleOpen = () => {
    dispatch({ type: OPEN_NOTES_DIALOG });
  };

  const handleEdit = (data) => {
    dispatch({ type: OPEN_NOTES_DIALOG, payload: data });
  };

  const handleDelete = (data) => {
    props.deleteTestcategory(data.id);
  };

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_CREATE_NOTES_DONE });
    }
  }, [createDone, dispatch]);

  useEffect(() => {
    if (updateDone) {
      setOpenUpdateSuccess(true);
      dispatch({ type: UNSET_UPDATE_NOTES_DONE });
    }
  }, [updateDone, dispatch]);

  useEffect(() => {
    if (deleteDone) {
      setopenDeleteSuccess(true);
      dispatch({ type: UNSET_TEST_DELETE_NOTES_DONE });
    }
  }, [deleteDone, dispatch]);

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleCloseUpdateSuccess = () => {
    setOpenUpdateSuccess(false);
  };

  const handleCloseDeleteSuccess = () => {
    setopenDeleteSuccess(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const filteredData = NOTES.filter((data) => {
        const note = data?.note?.toUpperCase() || "";
        const course =
          COURSE.find(
            (course) => course.id === Number(data.course_id)
          )?.course_name?.toUpperCase() || "";
        const sem =
          SEM.find(
            (sem) => sem.id === Number(data.sem_id)
          )?.sem_name?.toUpperCase() || "";
        const subject =
          SUBJECT.find(
            (subject) => subject.id === Number(data.subject_id)
          )?.subject_name?.toUpperCase() || "";

        return (
          note.includes(value) ||
          course.includes(value) ||
          sem.includes(value) ||
          subject.includes(value)
        );
      });

      setData(filteredData);
    } else {
      setData(NOTES);
    }
  };

  return (
    <Fragment>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> notes add successfully.
          </span>
        </Alert>
      </Snackbar>
      <Snackbar
        open={openUpdateSuccess}
        autoHideDuration={3000}
        onClose={handleCloseUpdateSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseUpdateSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> notes update successfully.
          </span>
        </Alert>
      </Snackbar>
      <Snackbar
        open={openDeleteSuccess}
        autoHideDuration={3000}
        onClose={handleCloseDeleteSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseDeleteSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> notes delete successfully.
          </span>
        </Alert>
      </Snackbar>
      <div class="page-breadcrumb">
        <div class="row">
          <div class="col-7 align-self-center">
            <div class="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb m-0 p-0">
                  <li class="breadcrumb-item">
                    <Link to="/admin/dashboard" class="text-muted">
                      Dashboard
                    </Link>
                  </li>
                  <li
                    class="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Notes
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-4 float-left">
                    <div className="row">
                      <div className="col-md-1">
                        <button
                          type="button"
                          class="btn waves-effect waves-light btn-primary btn-sm"
                          data-toggle="modal"
                          style={{ borderRadius: 5 }}
                          onClick={handleOpen}
                        >
                          <i class="fas fa-plus"></i> New
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 mt-3 float-right">
                    <form action="">
                      <div class="input-group mb-4 border rounded-pill p-1">
                        <div class="input-group-prepend border-0">
                          <div
                            id="button-addon4"
                            class="btn btn-link text-primary"
                          >
                            <i class="fa fa-search"></i>
                          </div>
                        </div>
                        <input
                          type="search"
                          placeholder="What're you searching for?"
                          aria-describedby="button-addon4"
                          class="form-control bg-none border-0 rounded-pill mr-1"
                          onChange={handleSearch}
                        />
                      </div>
                    </form>
                  </div>
                </div>

                <div class="table-responsive">
                  <table
                    id="zero_config"
                    class="table table-striped table-bordered no-wrap"
                  >
                    <thead>
                      <tr>
                        <th>#</th>

                        <th>Course</th>
                        <th>Semester</th>
                        <th>Subject</th>
                        <th>Notes</th>
                        <th>Block</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        <Fragment>
                          {(rowsPerPage > 0
                            ? data.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : data
                          ).map((data, index) => {
                            return (
                              <tr key={index}>
                                <td style={{ verticalAlign: "middle" }}>
                                  {index + 1}
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {
                                    COURSE.find(
                                      (course) =>
                                        course?.id === Number(data?.course_id)
                                    )?.course_name
                                  }
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {
                                    SEM.find(
                                      (sem) => sem?.id === Number(data?.sem_id)
                                    )?.sem_name
                                  }
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {
                                    SUBJECT.find(
                                      (sem) =>
                                        sem.id === Number(data.subject_id)
                                    )?.subject_name
                                  }
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {data?.note?.slice(0, 25)}
                                </td>
                                <td
                                  align="center"
                                  style={{ verticalAlign: "middle" }}
                                >
                                  <label class="switch">
                                    <input
                                      type="checkbox"
                                      checked={data.block}
                                      onChange={() => blockUnblock(data)}
                                    />
                                    <span class="slider">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          marginLeft: `${
                                            data.block ? "-25px" : "25px"
                                          }`,
                                          color: "white",
                                          marginTop: "6px",
                                        }}
                                      >
                                        {data.block ? "Yes" : "No"}
                                      </p>
                                    </span>
                                  </label>
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  <a
                                    class="ml-3"
                                    onClick={() => handleEdit(data)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i class="fas fa-edit text-primary mr-3"></i>
                                  </a>
                                  <a
                                    class="ml-3"
                                    onClick={() => handleDelete(data)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i class="fas fa-trash text-danger mr-3"></i>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <tr>
                          <td colSpan="12" align="center">
                            Nothing to show!!
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>#</th>
                        <th>Notes</th>
                        <th>Course</th>
                        <th>Sem</th>
                        <th>Block</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div class="py-2">
                  <TablePagination
                    id="pagination"
                    component="div"
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      100,
                      { label: "All", value: -1 },
                    ]}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NOTESDialog />
    </Fragment>
  );
};

export default connect(null, {
  getNOTES,
  blockUnblockNOTES,
  deleteTestcategory,
})(NOTEStable);
