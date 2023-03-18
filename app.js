require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.SERVER_PORT;

const apiRouter = require('./routes');

const tokenObject = {}; // Refresh Token을 저장할 Object NoSQL과 같은 DB에 저장한다고 가정. 캐시 등.

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
  return res
    .status(err.status || 500)
    .json({
      success: err.expect,
      errorMessage: err.message || '서버 에러가 발생했습니다.',
    });
});

app.get('/', (req, res) => {
  res.send('LV - 5');
});

app.listen(PORT, () => {
  console.log(PORT, ' 포트 번호로 서버가 실행되었습니다.');
});
