const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('𝙷𝚎𝚕𝚕𝚘');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Redvike app listening at http://localhost:${PORT}`);
});
