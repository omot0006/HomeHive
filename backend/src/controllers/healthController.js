const healthService = require("../services/healthService");

const getHealth = (_request, response) => {
  response.status(200).json(healthService.getHealth());
};

module.exports = { getHealth };

