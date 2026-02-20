// (window, $);
import React, { Fragment, useEffect, useState } from "react";

//chart
// import { Pie } from "react-chartjs-2";

//router
import { NavLink } from "react-router-dom";

//redux
import { getProfile } from "../store/admin/action";
import { useDispatch, connect, useSelector } from "react-redux";
import { getDashboard } from "../store/dashboard/action";

//custom css
import "../dist/css/style.min.css";
import "../dist/css/style.css";

//custom javascript
// import "../dist/js/custom.min.js";
// import "../dist/js/app-style-switcher";
// import "../dist/js/sidebarmenu";
// import "../dist/js/feather.min.js";
// import "../assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.user);

  useEffect(() => {
    dispatch(getDashboard());
    dispatch(getProfile());
  }, [dispatch]);

  const data = useSelector((state) => state.dashboard.dashboard);

  console.log("dashbord data from ", data);

  return (
    <Fragment>
      <div class="page-breadcrumb">
        <div class="row">
          <div class="col-7 align-self-center">
            <h3
              class="page-title text-truncate text-dark font-weight-500 mb-1"
              style={{ fontFamily: " Rubik,sans-serif", fontSize: "1.5rem" }}
            >
              Welcome {admin.name}!
            </h3>
            <div class="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb m-0 p-0">
                  <li class="breadcrumb-item">
                    <a href="/admin/dashboard">Dashboard</a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="card-group">
          <div class="card border-right mr-3">
            <NavLink to="/admin/user">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {data.totalUsers}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      User
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fas fa-user-plus fa-lg text-warning"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>

          <div class="card border-right mr-3">
            <NavLink to="/admin/faq-list">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {data.totalFaqs}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Faq
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fas fa-globe fa-lg text-primary"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
          <div class="card border-right mr-3">
            <NavLink to="/admin/blog-list">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {data.totalBlogs}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Blogs
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fas fa-list fa-lg text-success"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
          <div class="card border-right mr-3">
            <NavLink to="/admin/notes">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {data.totalNote}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Notes
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fab fa-vimeo-v fa-lg text-danger"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </div>

        <div class="card-group">
          <div class="card border-right mr-3">
            <NavLink to="/admin/notes-syllabus">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {data.totalSyllabus}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Syllabus
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fab fa-vimeo-v fa-lg text-danger"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>

          <div class="card border-right mr-3">
            <NavLink to="/admin/notes-question-modal">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {data.totalQuestions}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Old Questions
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fab fa-vimeo-v fa-lg text-danger"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>

          <div class="card border-right mr-3">
            <NavLink to="/admin/notes-book">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {data.totalbook}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Book
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fab fa-vimeo-v fa-lg text-danger"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>

          <div class="card border-right mr-3">
            <NavLink to="/admin/notes-practical">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {data.totalpractical}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Practical
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fab fa-vimeo-v fa-lg text-danger"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
        <div class="card border-right mr-3">
            <NavLink to="/admin/test">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {data.totalTest}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Test
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fab fa-vimeo-v fa-lg text-danger"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
      </div>
    </Fragment>
  );
};

export default connect(null, { getDashboard, getProfile })(Dashboard);
