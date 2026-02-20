import React, { Fragment, useEffect, useState } from "react";

//router
import { Link, useHistory } from "react-router-dom";

//dialog
import BlogCategoryDialog from "../Dialog/blogCategoryDialog";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import {
  getBlogCategory,
  blockUnblockBlogCategory,
  deleteTestcategory,
 
} from "../../store/blogCategory/action";

import {
  OPEN_BlogCategory_DIALOG,
  UNSET_CREATE_BlogCategory_DONE,
  UNSET_UPDATE_BlogCategory_DONE,
  UNSET_TEST_DELETE_BlogCategory_DONE,
} from "../../store/blogCategory/types";




//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import TablePaginationActions from "./TablePagination";
import { Alert } from "@material-ui/lab";

const BlogCategoryTable = (props) => {
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

  const { BlogCategory, createDone, updateDone, deleteDone } = useSelector(
    (state) => state.blog
  );

  console.log("deleteDone  is deleteDone", deleteDone);

  
  useEffect(() => {
    dispatch(getBlogCategory());
  }, [dispatch]);

  useEffect(() => {
    setData(BlogCategory);
  }, [BlogCategory]);

  const blockUnblock = (data) => {
    props.blockUnblockBlogCategory(data.id);
  };

  const handleOpen = () => {
    dispatch({ type: OPEN_BlogCategory_DIALOG });
  };

  const handleEdit = (data) => {
    dispatch({ type: OPEN_BlogCategory_DIALOG, payload: data });
  };

  const handleDelete = (data) => {
    props.deleteTestcategory(data.id);
  };

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_CREATE_BlogCategory_DONE });
    }
  }, [createDone, dispatch]);

  useEffect(() => {
    if (updateDone) {
      setOpenUpdateSuccess(true);
      dispatch({ type: UNSET_UPDATE_BlogCategory_DONE });
    }
  }, [updateDone, dispatch]);

  useEffect(() => {
    if (deleteDone) {
      setopenDeleteSuccess(true);
      dispatch({ type: UNSET_TEST_DELETE_BlogCategory_DONE });
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
            <b>Success!</b> BlogCategory add successfully.
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
            <b>Success!</b> BlogCategory update successfully.
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
            <b>Success!</b> BlogCategory delete successfully.
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
                    BlogCategory
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
                        <th>Blog Category</th>
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
                                  {data.category_name}
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
                        <th>Blog Category</th>
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
      <BlogCategoryDialog />
    </Fragment>
  );
};

export default connect(null, {
  getBlogCategory,
  blockUnblockBlogCategory,
  deleteTestcategory,
})(BlogCategoryTable);
