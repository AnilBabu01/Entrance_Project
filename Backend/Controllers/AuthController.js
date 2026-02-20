const { config } = require("dotenv");
const { Op } = require("sequelize");
var bcrypt = require("bcrypt");
const Admin = require("../Models/admin.modal");
const User = require("../Models/user.model");
const removefile = require("../Middleware/removefile");
const { sendSms } = require("../Helper/AllFunction");
const sendEmail = require("../Helper/sendEmail");

var jwt = require("jsonwebtoken");
const respHandler = require("../Handlers");

config();
const SECRET = process.env.SECRET;

const RegisterAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const genSalt = 10;
  const hash = await bcrypt.hash(password, genSalt);

  try {
    let user = await Admin.findOne({ where: { email: email } });
    if (user != null) {
      return respHandler.error(res, {
        status: false,
        msg: "Email already exist",
      });
    }

    let newUser = {
      name: name,
      email: email,
      password: hash,
    };

    let createdUser = await Admin.create(newUser);
    if (createdUser) {
      return respHandler.success(res, {
        status: true,
        msg: "You have register successfully!!",
      });
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const LoginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Admin.findOne({
      where: { email: email },
      attributes: { exclude: ["updatedAt"] },
    });
    if (user == null) {
      return respHandler.error(res, {
        status: false,
        msg: "Please Enter Valid Credential!!",
      });
    }
    if (user.verified == 0) {
      return respHandler.error(res, {
        status: false,
        msg: "You are not verified",
      });
    }
    const working = await bcrypt.compare(password, user.password);
    if (working) {
      var token = jwt.sign(
        {
          id: user.id,
        },
        SECRET
      );
      user.password = undefined;
      return respHandler.success(res, {
        status: true,
        msg: "User loggedin successfully!!",
        data: [{ token: token, user: user }],
      });
    } else {
      return respHandler.error(res, {
        status: false,
        msg: "Please Enter Valid Credential!!",
      });
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const GetAdminProfile = async (req, res) => {
  try {
    let { id } = req.user;

    if (!id) {
      return respHandler.error(res, {
        status: false,
        msg: "Something went wrong!!",
      });
    }

    let user = await Admin.findByPk(id, {
      attributes: {
        exclude: ["updatedAt", "password", "forgot_Otp"],
      },
    });

    if (!user) {
      return respHandler.error(res, {
        status: false,
        msg: "No data found!!",
      });
    }

    return respHandler.success(res, {
      status: true,
      msg: "Fetch admin profile successfully!!",
      data: [user],
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: err.message,
      error: [err.message],
    });
  }
};

const UpdateAdminProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let admin = await Admin.findOne({ where: { id: req.user.id } });

    if (!admin) {
      return respHandler.error(res, {
        status: false,
        msg: "Not found!!",
      });
    }

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      const genSalt = 10;
      updateData.password = await bcrypt.hash(password, genSalt);
    }

    if (Object.keys(updateData).length > 0) {
      await admin.update(updateData);

      return respHandler.success(res, {
        status: true,
        msg: "Profile updated successfully!",
        data: admin,
      });
    } else {
      return respHandler.error(res, {
        status: false,
        msg: "No fields to update.",
      });
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const Register = async (req, res) => {
  const { firstName, lastName, email, password, phone ,studyIn} = req.body;
  const genSalt = 10;
  const hash = await bcrypt.hash(password, genSalt);

  try {
    let user = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { phone: phone }],
      },
    });

    let newOtp = Math.floor(100000 + Math.random() * 900000);

    let resopto = await sendSms(phone, newOtp); 

    if (user) {
      if (user?.verified === true) {
        return respHandler.error(res, {
          status: false,
          msg: "Email or mobile number already exists",
        });
      } else {
        // Update OTP for existing user
        await User.update({ otp: newOtp }, { where: { id: user.id } });
        return respHandler.success(res, {
          status: true,
          msg: "OTP sent successfullyanil",
        });
      }
    }

    // Create a new user if they don't exist
    let newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      phone,
      otp: newOtp,
      studyIn:studyIn,
    });

    if (newUser) {
      return respHandler.success(res, {
        status: true,
        msg: "OTP sent successfully",
        data: [resopto],
      });
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something went wrong!",
      error: [err.message],
    });
  }
};

const ResendOtp = async (req, res) => {
  const { email, phone } = req.body;
  try {
    let user = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { phone: phone }],
      },
    });

    let newOtp = Math.floor(100000 + Math.random() * 900000);

    await sendSms(phone, newOtp);

    if (user) {
      await User.update({ otp: newOtp }, { where: { id: user.id } });
      return respHandler.success(res, {
        status: true,
        msg: "OTP sent successfully!",
      });
    } else {
      return respHandler.error(res, {
        status: false,
        msg: "User not found!",
        error: [],
      });
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something went wrong!",
      error: [err.message],
    });
  }
};

const VerifyOtp = async (req, res) => {
  const { email, phone, otp } = req.body;
  try {
    let user = await User.findOne({
      where: {
        email: email,
        phone: phone,
        otp: otp,
      },
    });

    if (!user) {
      return respHandler.error(res, {
        status: false,
        msg: "Otp is wrong",
      });
    } else {
      if (user.otp === otp) {
        await User.update(
          { otp: "", verified: true },
          { where: { id: user.id } }
        );
        return respHandler.success(res, {
          status: true,
          msg: "You have register successfully!",
        });
      } else {
        return respHandler.error(res, {
          status: false,
          msg: "Otp is wrong",
        });
      }
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something went wrong!",
      error: [err.message],
    });
  }
};

const htmlTemplate = (
  otp,
  expirationTime = 10,
  companyName = "StudayItNepal"
) => `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 500px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="text-align: center; color: #333;">${companyName} Password Reset</h2>
            <p style="font-size: 16px; color: #555;">You have requested to reset your password. Use the OTP below to proceed:</p>
            <h1 style="text-align: center; color: #ff6600; font-size: 32px; margin: 20px 0;">${otp}</h1>
            <p style="font-size: 14px; color: #777;">This OTP is valid for <strong>${expirationTime} minutes</strong>. If you did not request this, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="text-align: center; font-size: 12px; color: #999;">
                If you have any questions, contact our support team.<br>
                &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
            </p>
        </div>
    </div>
`;

const ForgotPassword = async (req, res) => {
  const { phone } = req.body;
  try {
    let user = await User.findOne({
      where: {
        [Op.or]: [{ email: phone }, { phone: phone }],
      },
    });

    if (user) {
      let newOtp = Math.floor(100000 + Math.random() * 900000);

      if (user) {
        await sendEmail(phone, "Password Reset OTP", htmlTemplate(newOtp));

        await User.update({ resetOtp: newOtp }, { where: { id: user.id } });
        return respHandler.success(res, {
          status: true,
          msg: "OTP sent successfully!",
        });
      }
    } else {
      return respHandler.error(res, {
        status: false,
        msg: "Please enter register mobile no!",
        error: [],
      });
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something went wrong!",
      error: [err.message],
    });
  }
};

const ResendForgotOtp = async (req, res) => {
  const { email, phone } = req.body;
  try {
    let user = await User.findOne({
      where: {
        [Op.or]: [{ email: phone }, { phone: phone }],
      },
      logging: console.log, // Enable logging to see SQL query
    });

    let newOtp = Math.floor(100000 + Math.random() * 900000);

    if (user) {
      await sendEmail(phone, "Password Reset OTP", htmlTemplate(newOtp));
      await User.update(
        { otp: newOtp },
        {
          where: {
            [Op.or]: [{ email: email }, { phone: phone }],
          },
        }
      );
      return respHandler.success(res, {
        status: true,
        msg: "OTP sent successfully!",
      });
    } else {
      return respHandler.error(res, {
        status: false,
        msg: "User not found!",
        error: [],
      });
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something went wrong!",
      error: [err.message],
    });
  }
};

const VerifyAndChangePassword = async (req, res) => {
  const { password, otp, phone } = req.body;
  try {
    let user = await User.findOne({
      where: {
        email: phone,
        resetOtp: otp,
      },
    });
    if (user) {
      const genSalt = 10;
      const hash = await bcrypt.hash(password, genSalt);

      if (user) {
        await User.update(
          { resetOtp: "", password: hash },
          { where: { id: user.id } }
        );
        return respHandler.success(res, {
          status: true,
          msg: "Password change successfully!",
        });
      }
    } else {
      return respHandler.error(res, {
        status: false,
        msg: "Otp is wrong!",
        error: [],
      });
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something went wrong!",
      error: [err.message],
    });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { phone: email }],
      },
      attributes: { exclude: ["updatedAt", "verify_Otp"] },
    });
    if (user == null) {
      return respHandler.error(res, {
        status: false,
        msg: "Please Enter Valid Credential!!",
      });
    }
    if (user.verified == 0) {
      return respHandler.error(res, {
        status: false,
        msg: "You are not verified",
      });
    }
    const working = await bcrypt.compare(password, user.password);
    if (working) {
      var token = jwt.sign(
        {
          id: user.id,
        },
        SECRET
      );
      user.password = undefined;
      return respHandler.success(res, {
        status: true,
        msg: "User loggedin successfully!!",
        data: [{ token: token, user: user }],
      });
    } else {
      return respHandler.error(res, {
        status: false,
        msg: "Please Enter Valid Credential!!",
      });
    }
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: "Something Went Wrong!!",
      error: [err.message],
    });
  }
};

const GetUser = async (req, res) => {
  try {
    let { id } = req.user;

    if (!id) {
      return respHandler.error(res, {
        status: false,
        msg: "Something went wrong!!",
      });
    }

    let user = await User.findByPk(id, {
      attributes: {
        exclude: ["updatedAt", "password", "forgot_Otp"],
      },
    });

    if (!user) {
      return respHandler.error(res, {
        status: false,
        msg: "No data found!!",
      });
    }

    return respHandler.success(res, {
      status: true,
      msg: "User details returned successfully!!",
      data: [user],
    });
  } catch (err) {
    return respHandler.error(res, {
      status: false,
      msg: err.message,
      error: [err.message],
    });
  }
};

const UpdateProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    state,
    district,
    city,
    bio,
    collegeName,
    studyIn,
    oldPassword,
    phone,
  } = req.body;

  try {
    let user = await User.findOne({ where: { id: req.user.id } });

    if (!user) {
      return respHandler.error(res, {
        status: false,
        msg: "User not found.",
      });
    }

    if (password && oldPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return respHandler.error(res, {
          status: false,
          msg: "Old password is incorrect.",
        });
      }

      // Check if the new password is the same as the old password
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (isSamePassword) {
        return respHandler.error(res, {
          status: false,
          msg: "New password cannot be the same as the old password.",
        });
      }
    }

    const updateData = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(phone && { phone }),
      ...(email && { email }),
      ...(state && { state }),
      ...(district && { district }),
      ...(city && { city }),
      ...(bio && { bio }),
      ...(collegeName && { collegeName }),
      ...(studyIn && { studyIn }),
      ...(password && {
        password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
      }),
      ...(req.file &&
        req.file.filename && { profileUrl: `images/${req.file.filename}` }),
    };

    if (req.file && req.file.path && user.profileUrl) {
      const oldFilePath = `public/upload/${user.profileUrl.substring(7)}`;
      removefile(oldFilePath);
    }

    if (Object.keys(updateData).length > 0) {
      await User.update(updateData, { where: { id: req.user.id } });

      user = await User.findOne({ where: { id: req.user.id } });

      return respHandler.success(res, {
        status: true,
        msg: "Profile updated successfully!",
        data: user,
      });
    } else {
      return respHandler.error(res, {
        status: false,
        msg: "No fields to update.",
      });
    }
  } catch (err) {
    console.error("Error updating profile:", err.message);
    return respHandler.error(res, {
      status: false,
      msg: "Something went wrong!",
      error: [err.message],
    });
  }
};

module.exports = {
  RegisterAdmin,
  LoginAdmin,
  GetAdminProfile,
  UpdateAdminProfile,
  Register,
  ResendOtp,
  Login,
  UpdateProfile,
  GetUser,
  VerifyOtp,
  ForgotPassword,
  ResendForgotOtp,
  VerifyAndChangePassword,
};
