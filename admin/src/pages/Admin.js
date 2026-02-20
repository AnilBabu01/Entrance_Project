import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { getUser } from "../store/user/action";
import { getAllBLOG } from "../store/blog/action";
import { getBlogCategory } from "../store/blogCategory/action";
import { getCOURSE } from "../store/course/action";
import { getSEM } from "../store/sem/action";
import { getSUBJECT } from "../store/subject/action";
import { getFAQ } from "../store/faq/action";
import { getSetting } from "../store/setting/action";
import { getReportedUser } from "../store/reportUser/action";

//components
import SettingPage from "./GeneralSetting";
import Credentials from "./Credentials";
import PrivacyPolicy from "./PrivacyPolicy";
import TermOfServic from "./TermOfServic";

import UserTable from "../Components/Table/UserTable";
import TestCategoryTable from "../Components/Table/TestCategoryTable";
import Coursetable from "../Components/Table/Coursetable";
import FaqTable from "../Components/Table/FaqTable";
import BlogCategoryTable from "../Components/Table/BlogCategoryTable";
import BlogTable from "../Components/Table/BlogTable";
import SEMtable from "../Components/Table/SemTable";
import SubjectTable from "../Components/Table/SubjectTable";
import DashboardPage from "./Dashboard";
import ProfilePage from "./Profile";
import Navbar from "../Components/Navbar/Navbar";
import Spinner from "../Components/Spinner";
import MissionTable from "../Components/Table/MissionTable";
import WhatClientSayTable from "../Components/Table/WhatClientSayTable";

// notes
import NotesTable from "../Components/Table/NotesTable";
import NotesUnits from "../Components/Table/NotesUnits";

import QuestionModalTable from "../Components/Table/QuestionModalTable";
import SyllabusTable from "../Components/Table/SyllabusTable";
import BookTable from "../Components/Table/BookTable";
import PracticalTable from "../Components/Table/PracticalTable";
import TestTable from "../Components/Table/TestTable";

const Admin = (props) => {
  const location = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname === "/admin") {
      history.push("/admin/dashboard");
    }
  }, []);

  (() => {
    if (window.localStorage) {
      if (history.location.pathname === "/admin") {
        history.push("/admin/dashboard");
        window.location.reload(true);
      }

      if (!localStorage.getItem("firstLoad")) {
        localStorage["firstLoad"] = true;
        window.location.reload(true);
      }
    }
  })();

  return (
    <Fragment>
      <div
        id="main-wrapper"
        data-theme="light"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-boxed-layout="full"
      >
        <Navbar />

        <div class="page-wrapper" style={{ display: "block" }}>
          <Switch>
            <Route
              path={`${location.path}/dashboard`}
              exact
              component={DashboardPage}
            />
            <Route
              path={`${location.path}/profile`}
              exact
              component={ProfilePage}
            />
            <Route
              path={`${location.path}/test-category`}
              exact
              component={TestCategoryTable}
            />
            <Route path={`${location.path}/test`} exact component={TestTable} />

            <Route
              path={`${location.path}/course-list`}
              exact
              component={Coursetable}
            />

            <Route
              path={`${location.path}/faq-list`}
              exact
              component={FaqTable}
            />

            <Route
              path={`${location.path}/blog-category-list`}
              exact
              component={BlogCategoryTable}
            />

            <Route
              path={`${location.path}/blog-list`}
              exact
              component={BlogTable}
            />

            <Route
              path={`${location.path}/sem-list`}
              exact
              component={SEMtable}
            />

            <Route
              path={`${location.path}/subject-list`}
              exact
              component={SubjectTable}
            />
            <Route path={`${location.path}/user`} exact component={UserTable} />
            <Route
              path={`${location.path}/general-setting`}
              exact
              component={SettingPage}
            />
            <Route
              path={`${location.path}/credentials`}
              exact
              component={Credentials}
            />
            <Route
              path={`${location.path}/privacy-policy`}
              exact
              component={PrivacyPolicy}
            />
            <Route
              path={`${location.path}/terms-of-service`}
              exact
              component={TermOfServic}
            />
            <Route
              path={`${location.path}/mission`}
              exact
              component={MissionTable}
            />

            <Route
              path={`${location.path}/what-our-client-say`}
              exact
              component={WhatClientSayTable}
            />

            <Route
              path={`${location.path}/units`}
              exact
              component={NotesUnits}
            />

            <Route
              path={`${location.path}/notes`}
              exact
              component={NotesTable}
            />

            <Route
              path={`${location.path}/notes-question-modal`}
              exact
              component={QuestionModalTable}
            />

            <Route
              path={`${location.path}/notes-syllabus`}
              exact
              component={SyllabusTable}
            />

            <Route
              path={`${location.path}/notes-book`}
              exact
              component={BookTable}
            />

            <Route
              path={`${location.path}/notes-practical`}
              exact
              component={PracticalTable}
            />
          </Switch>
          <Spinner />
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, {
  getUser,
  getAllBLOG,
  getBlogCategory,
  getCOURSE,
  getSEM,
  getSUBJECT,
  getFAQ,
  getSetting,
  getReportedUser,
})(Admin);
