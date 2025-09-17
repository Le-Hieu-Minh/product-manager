const express = require('express');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash');
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config();

const database = require('./config/database')

const router = require('./router/client/index.router');
const routerAdmin = require('./router/admin/index.router');

const systemConfig = require('./config/system')

database.connect()


const app = express();
const port = process.env.PORT

//method-override
app.use(methodOverride('_method'))

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
//flash
app.use(cookieParser('QWERTYUIOPASDFGHJ'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.set('views', `${__dirname}/Views`)
app.set('view engine', 'pug')


//App Local Variables
app.locals.prefixAdmin = systemConfig.prefexAdmin;

app.use(express.static(`${__dirname}/public`))

//router
router(app);
routerAdmin(app);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


