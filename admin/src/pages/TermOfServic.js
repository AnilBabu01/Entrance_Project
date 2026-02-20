import React, { useState, useEffect, Fragment } from "react";

//router
import { Link } from "react-router-dom";

//editor
import TextEditor from "../Components/Common/TextEditor";

//redux
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getSetting,
  editSetting,
  handleGoogleSwitch,
  handleRazorSwitch,
  handleStripeSwitch,
  fakeDataSwitch,
} from "../store/setting/action";

//axios
import axios from "axios";

import { baseURL } from "../util/config";
//argon css
import "./css/Profile.css";

//MUI
import IOSSwitch from "@material-ui/core/Switch";
import {
  Chip,
  Input,
  makeStyles,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const TermOfServic = (props) => {
  const dispatch = useDispatch();
  const [mongoId, setMongoId] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [address, setaddress] = useState(null);
  const [follow_us, setfollow_us] = useState(null);
  const [facebook_profile, setfacebook_profile] = useState(null);
  const [instagram_Profile, setinstagram_Profile] = useState(null);
  const [linkedln_Profile, setlinkedln_Profile] = useState(null);
  const [youtube_url, setyoutube_url] = useState(null);
  const [about_us, setabout_us] = useState(null);
  const [hideText, sethideText] = useState(null);
  const [hideTextStatus, sethideTextStatus] = useState("");
  const [firebase, setfirebase] = useState("");
  const [privacy_Policy, setprivacy_Policy] = useState("");
  const [terms_of_service, setterms_of_service] = useState("");

  const [home_screen_img, sethome_screen_img] = useState("");
  const [homeImagePath, sethomeImagePath] = useState("");
  const [about_img, setabout_img] = useState(null);
  const [aboutImgPath, setaboutImgPath] = useState("");
  const [entrance_img, setentrance_img] = useState("");
  const [entrance_imgPath, setentrance_imgPath] = useState(null);

  const [signin_img, setsignin_img] = useState("");
  const [signin_imgPath, setsignin_imgPath] = useState(null);

  const [signup_img, setsignup_img] = useState("");
  const [signup_imgPath, setsignup_imgPath] = useState(null);

  const [mail_template, setmail_template] = useState("");
  const [send_mail, setsend_mail] = useState("");
  const [app_password, setapp_password] = useState("");

  const setting = useSelector((state) => state.setting?.setting);

  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);

  useEffect(() => {
    setMongoId(setting.id);
    setaddress(setting?.address);
    setfollow_us(setting?.follow_us);
    setfacebook_profile(setting?.facebook_profile);
    setinstagram_Profile(setting?.instagram_Profile);
    setlinkedln_Profile(setting?.linkedln_Profile);
    setyoutube_url(setting?.youtube_url);
    setabout_us(setting?.about_us);
    sethideText(setting?.hideText);
    sethideTextStatus(setting?.hideTextStatus);
    setfirebase(setting?.firebase);
    setaboutImgPath(`${baseURL}/${setting?.about_img}`);
    sethomeImagePath(`${baseURL}/${setting?.home_screen_img}`);
    setentrance_imgPath(`${baseURL}/${setting?.entrance_img}`);
    setsignin_imgPath(`${baseURL}/${setting?.signin_img}`);
    setsignup_imgPath(`${baseURL}/${setting?.signup_img}`);
    setmail_template(setting?.mail_template);
    setsend_mail(setting?.send_mail);
    setapp_password(setting?.app_password);
    setprivacy_Policy(setting?.privacy_Policy);
    setterms_of_service(setting?.terms_of_service);
  }, [setting]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData?.append("address", address);
    formData?.append("follow_us", follow_us);
    formData?.append("facebook_profile", facebook_profile);
    formData?.append("instagram_Profile", instagram_Profile);
    formData?.append("linkedln_Profile", linkedln_Profile);
    formData?.append("youtube_url", youtube_url);
    formData?.append("about_us", about_us);
    formData?.append("firebase", firebase);
    formData?.append("hideTextStatus", hideTextStatus);
    formData?.append("hideText", hideText);
    formData?.append("home_screen_img", home_screen_img);
    formData?.append("entrance_img", entrance_img);
    formData?.append("about_img", about_img);
    formData?.append("mail_template", mail_template);
    formData?.append("send_mail", send_mail);
    formData?.append("app_password", app_password);
    formData?.append("signin_img", signin_img);
    formData?.append("signup_img", signup_img);
    formData?.append("terms_of_service", terms_of_service);
    formData?.append("privacy_Policy", privacy_Policy);
    props.editSetting(formData, mongoId);

    setOpenSuccess(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleInputImage = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("Selected file:", file); // Debugging line
      setabout_img(file);
      const reader = new FileReader();

      reader.onload = () => {
        setaboutImgPath(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputHomeImage = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      sethome_screen_img(file);

      const reader = new FileReader();
      reader.onload = () => {
        sethomeImagePath(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputEntranceImage = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("Selected file:", file); // Debugging line
      setentrance_img(file);
      const reader = new FileReader();

      reader.onload = () => {
        setentrance_imgPath(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputSignupImage = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setsignup_img(file);

      const reader = new FileReader();
      reader.onload = () => {
        setsignup_imgPath(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputSigninImage = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("Selected file:", file); // Debugging line
      setsignin_img(file);
      const reader = new FileReader();

      reader.onload = () => {
        setsignin_imgPath(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div class="main-content mt-5" id="panel">
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Updated successfully.
        </Alert>
      </Snackbar>
      {/* <!-- Page content --> */}
      <div class="page-breadcrumb pt-1 mb-4">
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
                    Setting
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid mt--6">
        <div class="row">
          <div class="col-xl-12 order-xl-2">
            <div class="card card-profile">
              <div class="card-header">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Term of service</h3>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <form>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <div class="row">
                            <div class="col-md-10">
                              <label
                                class="form-control-label"
                                for="input-username"
                              >
                                Term of service content
                              </label>
                            </div>
                          </div>
                          <TextEditor
                            onChange={(content) => {
                              console.log("Editor Content:", content);
                              setterms_of_service(content);
                            }}
                            blogHtml={terms_of_service}
                            setBlogHtml={setterms_of_service}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row" style={{ marginTop: "70px" }}>
                    <div class="col-lg-12">
                      <a
                        href="#!"
                        class="btn btn-warning float-right"
                        onClick={handleSubmit}
                      >
                        Submit
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, {
  getSetting,
  editSetting,
  handleGoogleSwitch,
  handleRazorSwitch,
  handleStripeSwitch,
  fakeDataSwitch,
})(TermOfServic);
