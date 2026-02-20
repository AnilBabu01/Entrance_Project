const axios = require("axios");

const generateReferCode = () => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let referCode = "";
  for (let i = 0; i < 6; i++) {
    referCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return referCode.toUpperCase();
};

const generateMoreThen800RandomNumber = () => {
  return Math.floor(Math.random() * (9999 - 8000 + 1)) + 8000;
};

const generateLessThen1999RandomNumber = () => {
  return Math.floor(Math.random() * 1000) + 1000;
};

const randomBombNo = () => {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  return randomNumber;
};

const sendSms = async (phone, newOtp) => {
  try {
    const url = "https://sms.aakashsms.com/sms/v3/send/";

    let otptext = `Dear User, Your OTP for StudyITNepal is ${newOtp}`;

    const response = await axios.post(url, {
      auth_token:
        "df5f6d36d2be056c1f40830cf7ce1d4ee58860bf4e0e6596c403d969bcd35e7f",
      to: phone,
      text: otptext,
    });

    console.log("SMS Sent Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error sending SMS:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

const getRandomName = () => {
  const names = [
    "Roshan",
    "Sandhya",
    "Deepak",
    "Bikash",
    "Aasha",
    "Ramesh",
    "Kriti",
    "Pratik",
    "Anil",
    "Pooja",
    "Hari",
    "Nisha",
    "Suman",
    "Dipesh",
    "Santosh",
    "Krishna",
    "Anisha",
    "Manisha",
    "Prakash",
    "Nabin",
    "Aarav",
    "Bimala",
    "Abhishek",
    "Umesh",
    "Sita",
    "Rajan",
    "Sandip",
    "Manish",
    "Roshni",
    "Gaurav",
  ];
  const randomIndex = Math.floor(Math.random() * names.length);
  const randomName = names[randomIndex];

  return randomName;
};

module.exports = {
  generateReferCode,
  generateMoreThen800RandomNumber,
  generateLessThen1999RandomNumber,
  randomBombNo,
  sendSms,
  getRandomName,
};
