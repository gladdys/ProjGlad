const employees = require('./employees/employees.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(employees);
};
