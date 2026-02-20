import { combineReducers } from "redux";

import dashboardReducer from "./dashboard/reducer";
import userReducer from "./user/reducer";
import adminReducer from "./admin/reducer";
import settingReducer from "./setting/reducer";
import reportUserReducer from "./reportUser/reducer";
import spinnerReducer from "./spinner/reducer";

// study it nepal

import hostReducer from "./host/reducer";
import COURSEReducer from "./course/reducer";
import faqReducer from './faq/reducer';
import blogCategpry from './blogCategory/reducer';
import BLOGReducer from './blog/reducer';
import SEMReducer from "./sem/reducer";
import SUBJECTReducer from "./subject/reducer";
import MissionReducer from './mission/reducer';
import WhatClientSayReducer from './whatclientsay/reducer';
import SYLLABUSReducer from "./syllabus/reducer";
import NOTESReducer from "./notes/reducer";
import QUESTIONMODALReducer from "./questionmodal/reducer";
import BookReducer from './book/reducer';
import PracticalReducer from './practical/reducer';
import TESTReducer from "./test/reducer";

import UnitReducer from "./units/reducer";

export default combineReducers({
  dashboard: dashboardReducer,
  admin: adminReducer,
  user: userReducer,
  setting: settingReducer,
  report: reportUserReducer,
  spinner: spinnerReducer,
  host: hostReducer,
  course: COURSEReducer,
  faq:faqReducer,
  blog:blogCategpry, 
  addBlog:BLOGReducer,
  sem:SEMReducer,
  subject:SUBJECTReducer,
  mission:MissionReducer,
  WhatClientSay:WhatClientSayReducer,
  SYLLABUS:SYLLABUSReducer,
  NOTES:NOTESReducer,
  QUESTIONMODAL:QUESTIONMODALReducer,
  Book:BookReducer,
  Practical:PracticalReducer,
  TEST:TESTReducer,
  NOTESUNIT:UnitReducer
});
