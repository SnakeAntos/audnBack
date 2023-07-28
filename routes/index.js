const express = require('express');
const router = express.Router();

//importo los routers
const userRouter = require('./users');
const songRouter = require('./songs');
const playlistRouter = require('./playlists');
const cupidRouter = require('./cupid');
const songsListsRouter = require('./songsList')



router.use('/users', userRouter);
//comento ya que no defini los index de songs y playlists
router.use('/songs', songRouter);
router.use('/playlists', playlistRouter);
router.use('/cupids', cupidRouter);
router.use('/songslists', songsListsRouter);

module.exports = router;