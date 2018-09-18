let {PythonShell} = require('python-shell')

const options = {
  mode: 'text',
  pythonPath: '/usr/bin/python',
  pythonOptions: ['-u'],
  scriptPath: '/Users/mattdaisley/repos/misc/raspberry pi/sense-hat/sense',
};

PythonShell.run('test_output.py', options, function (err) {
  if (err) throw err;
  console.log('finished');
});