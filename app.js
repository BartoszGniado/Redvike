const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get('/', (req, res) => {
  res.send('𝙷𝚎𝚕𝚕𝚘');
});

app.use('/reservation', require('./routes/reservation'));
app.use('/csv', require('./routes/csv'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Redvike app listening at http://localhost:${PORT}`);
});
