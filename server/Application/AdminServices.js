const { User } = require("../Infrastructure/Database");

async function getAdmins() {
  return await User.find({ role: "admin" })
    .select("profile.mobile profile.name profile.family")
    .then((res) => {
      res = res.map((admin) => ({
        mobile: admin.profile.mobile,
        name: admin.profile.name,
        family: admin.profile.family,
      }));
      return res;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

async function addAdmin(adminMobile) {
  return await User.findOneAndUpdate(
    { "profile.mobile": adminMobile },
    { $set: { role: "admin" } }
  )
    .then(async (result) => {
      if (result === null) return undefined;
      return await getAdmins();
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

async function deleteAdmin(adminMobile) {
  return await User.findOneAndUpdate(
    { "profile.mobile": adminMobile },
    { $set: { role: "user" } }
  )
    .then(async (result) => {
      if (result === null) return undefined;
      return await getAdmins();
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

module.exports = {
  getAdmins,
  addAdmin,
  deleteAdmin,
};
