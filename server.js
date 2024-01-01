const express = require('express');
const path = require('path');

const app = express();
const port = 3002;

// Menggunakan middleware express.static untuk menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
