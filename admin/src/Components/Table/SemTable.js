import React, { Fragment, useEffect, useState } from "react";

//router
import { Link, useHistory } from "react-router-dom";

//dialog
import SEMDialog from "../Dialog/semDialog";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import {
  getSEM,
  blockUnblockSEM,
  deleteTestcategory,
} from "../../store/sem/action";

import { getCOURSE } from "../../store/course/action";

import {
  OPEN_SEM_DIALOG,
  UNSET_CREATE_SEM_DONE,
  UNSET_UPDATE_SEM_DONE,
  UNSET_TEST_DELETE_SEM_DONE,
  ERROR,
} from "../../store/sem/types";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import TablePaginationActions from "./TablePagination";
import { Alert } from "@material-ui/lab";

const SEMtable = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openSuccess, setOpenSuccess] = useState(false);

  const [openError, setOpenError] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);
  const [openDeleteSuccess, setopenDeleteSuccess] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { SEM, createDone, updateDone, deleteDone, error } = useSelector(
    (state) => state.sem
  );

  const { COURSE } = useSelector((state) => state.course);

  console.log("deleteDone  is COURSE", COURSE);

  useEffect(() => {
    dispatch(getSEM());
    dispatch(getCOURSE());
  }, [dispatch]);

  useEffect(() => {
    setData(SEM);
  }, [SEM]);

  const blockUnblock = (data) => {
    props.blockUnblockSEM(data.id);
  };

  const handleOpen = () => {
    dispatch({ type: OPEN_SEM_DIALOG });
  };

  const handleEdit = (data) => {
    dispatch({ type: OPEN_SEM_DIALOG, payload: data });
  };

  const handleDelete = (data) => {
    props.deleteTestcategory(data.id);
  };

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_CREATE_SEM_DONE });
    }
    if (error) {
      setOpenError(true); // open Snackbar
    }
  }, [createDone, error, dispatch]);

  console.log("ERROR is ERROR  is ERROR", error);

  useEffect(() => {
    if (updateDone) {
      setOpenUpdateSuccess(true);
      dispatch({ type: UNSET_UPDATE_SEM_DONE });
    }
  }, [updateDone, dispatch]);

  useEffect(() => {
    if (deleteDone) {
      setopenDeleteSuccess(true);
      dispatch({ type: UNSET_TEST_DELETE_SEM_DONE });
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
            <b>Success!</b> Semester add successfully.
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
            <b>Success!</b> Semester update successfully.
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
            <b>Success!</b> Semester delete successfully.
          </span>
        </Alert>
      </Snackbar>
      {error && (
        <Snackbar
          open={openError}
          autoHideDuration={3000}
          onClose={() => dispatch({ type: ERROR, payload: null })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => dispatch({ type: ERROR, payload: null })}
            severity="error"
          >
            {error}
          </Alert>
        </Snackbar>
      )}

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
                    Semester
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
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-3 float-left mb-0"></div>
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

                        {/* <th>Block</th> */}
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
                                  {data.sem_name}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {
                                    COURSE.find(
                                      (course) =>
                                        course.id === Number(data.course_id)
                                    )?.course_name
                                  }
                                </td>
                                {/* <td
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
                                </td> */}
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
                        <th>Sem</th>
                        <th>Course</th>
                        {/* <th>Block</th> */}
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
      <SEMDialog />
    </Fragment>
  );
};

export default connect(null, {
  getSEM,
  blockUnblockSEM,
  deleteTestcategory,
})(SEMtable);
