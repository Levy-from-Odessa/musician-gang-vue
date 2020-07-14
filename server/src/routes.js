const AutheenticationController = require('./conrtrollers/AutheenticationController.js')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const GoodsController = require('./conrtrollers/GoodsController')
const ConcertsController = require('./conrtrollers/ConcertsController')
const MediaController = require('./conrtrollers/MediaController')
const AuthorsController = require('./conrtrollers/AuthorsController')
const BookmarksController = require('./conrtrollers/BookmarksController')
const GangsController = require('./conrtrollers/GangsController')
const MailingsController = require('./conrtrollers/MailingsController')
const MusicsController = require('./conrtrollers/MusicsController')
const ToursController = require('./conrtrollers/ToursController')
const UserMailingsController = require('./conrtrollers/UserMailingsController')
const MusicProgsController = require('./conrtrollers/MusicProgsController')

module.exports = (app) => {
	// !users
	app.get('/users',
		AutheenticationController.index
	)
	app.post('/register',
		AuthenticationControllerPolicy.register,
		AutheenticationController.register
	)
	app.post('/login',
		AutheenticationController.login
	)
	app.post('/delete',
		AutheenticationController.delete
	)
	app.post('/edit',
		AutheenticationController.edit
	)


	//! goods
	app.get('/goods',
		GoodsController.index
	)
	app.post('/createGood',
		GoodsController.post
	)
	app.post('/deleteGood',
		GoodsController.delete
	)
	app.post('/editGood',
		GoodsController.edit
	)

	//! concerts
	app.get('/concerts',
		ConcertsController.index
	)
	app.post('/createConcert',
		ConcertsController.post
	)
	app.post('/deleteConcert',
		ConcertsController.delete
	)
	app.post('/editConcert',
		ConcertsController.edit
	)
	app.post('/findConcert',
		ConcertsController.findOne
	)

	// !media
	app.get('/media',
		MediaController.index
	)
	app.post('/createMedia',
		MediaController.post
	)
	app.post('/deleteMedia',
		MediaController.delete
	)
	app.post('/editMedia',
		MediaController.edit
	)

	// !authors
	app.post('/authors',
		AuthorsController.index
	)
	app.post('/CreateAuthor',
		AuthorsController.post
	)
	app.post('/deleteAuthor',
		AuthorsController.delete
	)
	app.post('/editAuthor',
		AuthorsController.edit
	)
	

	// !bookmark
	app.get('/bookmarks',
		BookmarksController.index
	)
	app.post('/createBookmark',
		BookmarksController.post
	)
	app.post('/deleteBookmark',
		BookmarksController.delete
	)
	app.post('/editBookmark',
		BookmarksController.edit
	)
	app.post('/userBookmark',
		BookmarksController.findByUser
	)
	app.post('/userCountBookmark',
		BookmarksController.findCountByUser
	)
	// !gang
	app.get('/gangs',
		GangsController.index
	)
	app.post('/createGang',
		GangsController.post
	)
	app.post('/deleteGang',
		GangsController.delete
	)
	app.post('/editGang',
		GangsController.edit
	)

	// !mailing
	app.get('/mailings',
		MailingsController.index
	)
	app.post('/createMailing',
		MailingsController.post
	)
	app.post('/deleteMailing',
		MailingsController.delete
	)
	app.post('/editMailing',
		MailingsController.edit
	)

	// !musicProgs
	app.get('/musicProgs',
		MusicProgsController.index
	)
	app.post('/createMusicProgs',
		MusicProgsController.post
	)
	app.post('/deleteMusicProgs',
		MusicProgsController.delete
	)
	app.post('/editMusicProgs',
		MusicProgsController.edit
	)

	// !music
	app.get('/music',
		MusicsController.index
	)
	app.post('/createMusic',
		MusicsController.post
	)
	app.post('/deleteMusic',
		MusicsController.delete
	)
	app.post('/editMusic',
		MusicsController.edit
	)

	// !tour
	app.get('/tours',
		ToursController.index
	)
	app.post('/createTour',
		ToursController.post
	)
	app.post('/deleteTour',
		ToursController.delete
	)
	app.post('/editTour',
		ToursController.edit
	)
	app.post('/findTour',
		ToursController.findTour
	)
	app.get('/findDistTour',
		ToursController.findDistTour
	)

	// !userMailing
	app.get('/userMailings',
		UserMailingsController.index
	)
	app.post('/createUserMailing',
		UserMailingsController.post
	)
	app.post('/deleteUserMailing',
		UserMailingsController.delete
	)
	app.post('/editUserMailing',
		UserMailingsController.edit
	)
}