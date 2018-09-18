var 
    PythonShell          = require('python-shell'),
    path                 = require('path'),
    senseHat;

var rootDir = path.resolve(__dirname, '../sense-hat');

function runScript(scriptName, args) {
  return new Promise(function (resolve, reject) {
    var options = { 
      mode: 'json', 
      scriptPath: rootDir + '/sense',
      args: args
    }

    PythonShell.run(scriptName, options, function (err, results) {
        if (err) {
            reject(err);
            return;
        }
        
        resolve(results.result);
    });

    // var shell = new PythonShell(scriptName, options, function (err, results) {
    //   if ( err ) {
    //     reject(err);
    //     return;
    //   }
    // });

    // shell.on('message', function (message) {
    //   resolve(message.result);
    // });

    // shell.end(function (err) {
    //   if ( err ) {
    //     throw err;
    //   }
    // });

  });
}

senseHat = {

  getTemperature: function getTemperature(options) {
      return runScript('get_temperature.py');
  },

  getHumidity: function getHumidity(options) {
      return runScript('get_humidity.py');
  },

  getPressure: function getPressure(options) {
      return runScript('get_pressure.py');
  },

  getTemperatureFromHumidity: function getTemperatureFromHumidity(options) {
      return runScript('get_temperature_from_humidity.py');
  },

  getTemperatureFromPressure: function getTemperatureFromPressure(options) {
      return runScript('get_temperature_from_pressure.py');
  },

  getOrientation: function getOrientation(options) {
      return runScript('get_orientation.py');
  },

  showMessage: function showMessage(options) {
      return runScript('show_message.py', [options.message]);
  },

  testOutput: function testOutput(options) {
      return runScript('test_output.py');
  },

  testOutput2: function testOutput2(options) {
      return runScript('test_output2.py');
  }

};

module.exports = senseHat;
