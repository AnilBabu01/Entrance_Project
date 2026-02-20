/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState } from "react";

//router
import { Link, useHistory } from "react-router-dom";

//alert

//server path
import { baseURL } from "../../util/config";

//dialog
import BLOGDialog from "../Dialog/blogDialog";

import $ from "jquery";
import IOSSwitch from "@material-ui/core/Switch";

//dayjs
import dayjs from "dayjs";

//redux
import { useDispatch, connect, useSelector } from "react-redux";

import {
  getAllBLOG,
  handleOnlineSwitch,
  blockUnblockBLOG,
  deleteBlog,
} from "../../store/blog/action";

import { getBlogCategory } from "../../store/blogCategory/action";

import {
  OPEN_BLOG_DIALOG,
  CLOSE_BLOG_DIALOG,
  UNSET_UPDATE_AGENCY_DONE,
  UNSET_CREATE_AGENCY_DONE,
  UNSET_BLOG_DELETE_DONE,
} from "../../store/blog/types";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import TablePaginationActions from "./TablePagination";
import { Alert } from "@material-ui/lab";

import male from "../../assets/images/male.png";

const BLOGtable = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);
  const [openDeleteSuccess, setopenDeleteSuccess] = useState(false);

  const [status, setStatus] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { BLOG, createDone, updateDone, deleteDone } = useSelector(
    (state) => state.addBlog
  );

  const { BlogCategory } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBLOG());
    dispatch(getBlogCategory());
  }, [dispatch]);

  useEffect(() => {
    setData(BLOG);
  }, [BLOG]);

  useEffect(() => {
    if (deleteDone) {
      setopenDeleteSuccess(true);
      dispatch({ type: UNSET_BLOG_DELETE_DONE });
    }
  }, [deleteDone, dispatch]);

  const blockUnblock = (data) => {
    props.blockUnblockBLOG(data?.id);
  };

  const handleOpen = () => {
    dispatch({ type: OPEN_BLOG_DIALOG });
  };

  const handleEdit = (data) => {
    dispatch({ type: OPEN_BLOG_DIALOG, payload: data });
  };

  const handleDelete = (data) => {
    props.deleteBlog(data.id);
  };

  const handleCloseDeleteSuccess = () => {
    setopenDeleteSuccess(false);
  };

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_CREATE_AGENCY_DONE });
    }
  }, [createDone, dispatch]);
  useEffect(() => {
    if (updateDone) {
      setOpenUpdateSuccess(true);
      dispatch({ type: UNSET_UPDATE_AGENCY_DONE });
    }
  }, [updateDone, dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = BLOG.filter((data) => {
        return (
          data?.title?.toUpperCase()?.indexOf(value) > -1 ||
          data?.description?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(BLOG);
    }
  };

 
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  const handleCloseUpdateSuccess = () => {
    setOpenUpdateSuccess(false);
  };

  useEffect(() => {
    if (status === "online") {
      const data = BLOG.filter((data) => data.isOnline);
      setData(data);
    } else if (status === "live") {
      const data = BLOG.filter((data) => data.isLive);
      setData(data);
    } else {
      return setData(BLOG);
    }
  }, [status]);

  $(document).ready(function () {
    $("img").bind("error", function () {
      // Set the default image
      $(this).attr("src", male);
    });
  });

  console.log("BLOG", deleteDone, openDeleteSuccess, updateDone);

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
            <b>Success!</b> BLOG add successfully.
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
            <b>Success!</b> BLOG update successfully.
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
            <b>Success!</b> Blog delete successfully.
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
                    blog
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
                  <div class="col-6">
                    <h4 class="card-title mb-4">blog</h4>
                  </div>
                  <div class="col-6"></div>
                </div>
                {/* <div class="container"> */}

                
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-3 float-left mb-0">
                    <button
                      type="button"
                      class="btn waves-effect waves-light btn-primary btn-sm float-left mt-2"
                      data-toggle="modal"
                      data-target="#country-modal"
                      style={{ borderRadius: 5 }}
                      onClick={handleOpen}
                    >
                      <i class="fas fa-plus"></i> New
                    </button>
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
                        <th>Category</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Blog HTML</th>
                        <th>Created At</th>
                        <th>Block</th>
                        <th>Edit</th>
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
                                    BlogCategory.find(
                                      (cat) =>
                                        cat.id === Number(data.category_id)
                                    )?.category_name
                                  }
                                </td>

                                <td>
                                  {
                                    <img
                                      src={`${baseURL}/${data?.img_url}`}
                                      width="70px"
                                      height="70px"
                                      alt="img"
                                      style={{
                                        objectFit: "contain",
                                      }}
                                      class="mr-3"
                                    />
                                  }
                                  {data.name}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data?.title?.slice(0, 10)}...
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data?.description?.slice(0, 10)}...
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data?.blog?.slice(0, 10)}...
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {dayjs(data?.createdAt).format(
                                    "DD MMM, YYYY"
                                  )}
                                </td>

                                <td
                                  align="center"
                                  style={{ verticalAlign: "middle" }}
                                >
                                  <label class="switch">
                                    <input
                                      type="checkbox"
                                      checked={data?.block}
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
                                        {data?.block ? "Yes" : "No"}
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
                        <th>Category</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Blog HTML</th>
                        <th>Created At</th>
                        <th>Block</th>
                        <th>Edit</th>
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
                    count={data?.length}
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
      <BLOGDialog />
    </Fragment>
  );
};

export default connect(null, {
  blockUnblockBLOG,
  handleOnlineSwitch,
  deleteBlog,
})(BLOGtable);
