const app = require('./app')

app.listen(3001, function (err) {
    if (err) return console.log(err);
      console.log(`App listening on port 3001`);
  });