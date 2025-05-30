import { ApiResponse } from "../util/ApiResponse.js";

const dashboard = async (req, res, next) => {
  try {
    const user = await req.user;
    return res
      .status(200)
      .json(new ApiResponse(200, user, "you are in dashboard route!"));
  } catch (error) {
    next(error);
  }
};

export default dashboard;
