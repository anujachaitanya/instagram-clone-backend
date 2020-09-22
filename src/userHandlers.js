const { saveFile } = require('./utils');

const addPost = async function (req, res) {
  const caption = req.body.caption || '';
  const image = req.files && req.files.file;
  const path = await saveFile(image);

  res.end();
};

module.exports = { addPost };
