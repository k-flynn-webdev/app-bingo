//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let app = require('../app.js');

// specific
let mongoose = require("mongoose");
let m_user = require('../models/user.model.js');
let m_token = require('../models/token.model.js');

chai.use(chaiHttp);


let basic_board = {"name":"testing 123456","lines":"test test 1§test test 2§test test 3§test test 4§test test 5§test test 6§test test 7§test test 8§§"}

let basic_player = {
	name : 'player01',
}

const user_credentials_Login = {
	name : 'tes§tUse13313r', 
	email : 't13§131estEmail@Em21ail.com', 
	password : 'te§stPassw134314o§rd',
}
const user_credentials_Login_02 = {
	name : 'tes13131§tUse13313r', 
	email : 't13§131estE13mail@Em21ai13l.com', 
	password : 'te13§stPassw13134314o§rd',
}
const user_credentials_Login_03 = {
	name : 'tes11233131§tU1se13313r', 
	email : 't13§131estE13313mail@Em21ai13l.com', 
	password : 'te13§s13tPassw131131334314o§rd',
}




describe('User Login', () => {

	it('User should own a board after creation', (done) => {

		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send(user_credentials_Login)
		.end((err, res) => {

			let user_id = res.body.data.id;
			basic_board.user = { id : user_id };

			chai.request(app)
			.post('/api/account/login')
			.type('form')
			.send(user_credentials_Login)
			.end((err, res) => {

				chai.request(app)

				.post('/api/board/create')
				.type('form')
				.send( basic_board )
				.end((err, res) => {

					let board_id = res.body.data.url;

					setTimeout( function() {
						m_user.findOne( { _id : user_id } ).then((result_user) => {
							chai.expect(result_user.data.boards.created).to.include(board_id);
							done();
						}).catch((err) => {
							console.log('catch error', done( new Error("user wasn't found.")) );
						});
					}, 30);

				});
			});
		});
	});


	it('User boards started should register after starting a game', (done) => {

		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send(user_credentials_Login_02)
		.end((err, res) => {

			let user_id = res.body.data.id;

			chai.request(app)
			.post('/api/account/login')
			.type('form')
			.send(user_credentials_Login_02)
			.end((err, res) => {

				chai.request(app)
				.post('/api/board/create')
				.type('form')
				.send( basic_board )
				.end((err, res) => {

					let board_id = res.body.data.url;

					chai.request(app)
					.post('/api/instance/' + board_id + '/create' )
					.send( { user : { id : user_id } } )
					.end((err, res) => {

					let instance_url = res.body.data.url;

						setTimeout( function() {
							m_user.findOne( { _id : user_id } ).then((result_user) => {
								chai.expect(result_user.data.boards.started).to.include(board_id);								
								done();
							}).catch((err) => {
								console.log('catch error', done( new Error("user wasn't found.")) );
							});
						}, 66);

					});
				});
			});
		});
	});




	it('User board played should register after joining a game', (done) => {

		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send(user_credentials_Login_03)
		.end((err, res) => {

			let user_id = res.body.data.id;

			chai.request(app)
			.post('/api/account/login')
			.type('form')
			.send(user_credentials_Login_03)
			.end((err, res) => {

				chai.request(app)
				.post('/api/board/create')
				.type('form')
				.send( basic_board )
				.end((err, res) => {

					let board_id = res.body.data.url;

					chai.request(app)
					.post('/api/instance/' + board_id + '/create' )
					.end((err, res) => {

						let instance_url = res.body.data.url;
						basic_player.user = { id : user_id };

						chai.request(app)
						.post('/api/instance/' + instance_url)
						.type('form')
						.send( basic_player )
						.end((err, res) => {

							let player_url = res.body.data.url;

							setTimeout( function() {
								m_user.findOne( { _id : user_id } ).then((result_user) => {

									chai.expect(result_user.data.stats.played).to.be.an('date');
									chai.expect(result_user.data.boards.played).to.include(board_id);
									chai.expect(result_user.data.session.instance).to.equal(instance_url);
									done();

								}).catch((err) => {
									console.log('catch error', done( new Error("user wasn't found.")) );
								});
							}, 60);

						});
					});
				});
			});
		});
	});




})

