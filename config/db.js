const { connect } = require("mongoose");
const { NODE_ENV, LOCAL_MONGODB_URL, CLOUD_MONGODB_URL } = require("./index");
const{success,error}=require("consola")
exports.DbConnection = async () => {
  try {
    if (NODE_ENV === "development") {
      await connect(LOCAL_MONGODB_URL);
      success("LOCAL instance database connected");
    } else {
      await connect(CLOUD_MONGODB_URL);
      success("CLOUD instance database connected");
    }
  } catch (err) {
    error(err);
  }
};
