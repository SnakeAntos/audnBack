const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  console.log('Request URL:', req.originalUrl)
  console.log('Request Type:', req.method)
  next()
})

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something broke!');
});

router.use((req, res, next) => {
  setTimeout(next, 1000)
});

module.exports = router;