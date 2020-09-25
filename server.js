const { app } = require('./src/app');

console.log(process.env);
const port = process.env.PORT || 3001;
app.listen(port, () => console.log('listening on the port :', port));
