const express = require('express');
const fileUpload = require('express-fileupload');
const dbConnect = require('./db/connect');
const session = require('express-session');
const passport = require('passport');
var cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    createParentPath: true,
  })
);
dbConnect.connect();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
require('./auth/passport-config').init(passport);
app.use(passport.initialize());
app.use(passport.session());

const swaggerConfig = require('./swagger.config');
swaggerConfig.initSwagger(app);

/**
 * @swagger
 * tags:
 *   name: Root
 * /:
 *  get:
 *    tags: [Root]
 *    summary: Serve home page
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/', (req, res) => {
  res.send('𝙷𝚎𝚕𝚕𝚘!');
});

app.use('/reservation', require('./routes/reservation'));
app.use('/csv', require('./routes/csv'));
app.use(require('./routes/auth'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Redvike app listening at http://localhost:${PORT}`);
});
