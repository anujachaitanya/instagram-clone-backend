const { app } = require('./src/app');

console.log(process.env);
app.listen(3001, () => console.log('listening on the port : 3001'));
