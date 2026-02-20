const { config } = require("dotenv");
const Admin = require("../Models/admin.modal");

const bcrypt = require("bcrypt");

config();

const AdminData = [
  {
    name: "Anil",
    email: "studyitnepal@gmail.com",
    password: "pMpk11@1337",
  },
  {
    name: "User",
    email: "anilb9850@gmail.com",
    password: "123456",
  },
];



const CreateAdmin = async (req, res) => {
  try {
    for (let admin of AdminData) {
      const { name, email, password } = admin;

      let existingUser = await Admin.findOne({ where: { email } });

      if (existingUser) {
        console.log(`User with email ${email} already exists.`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      let newAdmin = {
        name,
        email,
        password: hashedPassword,
      };

      let createdAdmin = await Admin.create(newAdmin);

      if (createdAdmin) {
        console.log(`Admin with email ${email} created successfully`);
      }
    }
  } catch (err) {
    console.error("Error creating admin users", err.message);
  }
};

CreateAdmin();
