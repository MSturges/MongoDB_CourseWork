const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {
  // for any http request using get rquest
  // listen for this route 'http://localhost:3050/api'
  // then call the call back
  app.get('/api', DriversController.greeting);
  app.post('/api/drivers', DriversController.create);
  app.put('/api/drivers/:id', DriversController.edit);
  app.delete('/api/drivers/:id', DriversController.delete);

}
