module.exports = async function (context, req) {
  context.log("Config API called");

  context.res = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      apiBaseEndpoint: process.env.API_BASE_ENDPOINT || "",
    },
  };
};
