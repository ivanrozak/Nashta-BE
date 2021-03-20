const {
  getEventModel,
  postEventModel,
  getEventCountModel,
  getEventSearchModel,
} = require("../model/event");
const helper = require("../helper/response");
const qs = require("querystring");

module.exports = {
  getEvent: async (request, response) => {
    try {
      const result = await getEventModel();
      return helper.response(response, 200, "Success Get Event Data", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getEventSearch: async (request, response) => {
    try {
      let { page, limit, title } = request.query;
      page = parseInt(page);
      limit = parseInt(limit);

      const totalData = await getEventCountModel(title);
      const totalPage = Math.ceil(totalData / limit);
      const offset = page * limit - limit;
      const prevLink =
        page > 1
          ? qs.stringify({ ...request.query, ...{ page: page - 1 } })
          : null;
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...request.query, ...{ page: page + 1 } })
          : null;
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink: nextLink && `http://localhost:3000/event?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/event?${prevLink}`,
      };
      const result = await getEventSearchModel(title, limit, offset);
      return helper.response(
        response,
        200,
        "Success Get Event",
        result,
        pageInfo
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postEvent: async (request, response) => {
    try {
      const { title, location, date, participant, note } = request.body;

      const setData = {
        title,
        location,
        date,
        participant,
        note,
        image: request.file === undefined ? "" : request.file.filename,
        created_at: new Date(),
      };
      const result = await postEventModel(setData);
      return helper.response(response, 200, "Success Post Event", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
