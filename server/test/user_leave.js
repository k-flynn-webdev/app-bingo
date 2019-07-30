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
	name : 'play1er01',
}

const user_credentials_Login = {
	name : 'tes§tUse12313313r', 
	email : 't13§1311estEmail@Em21ail121.com', 
	password : 'te§s1tPassw134314o§1rd',
}





describe('User Leave', () => {

	it('User session should be reset after leaving a game.', (done) => {

		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send(user_credentials_Login)
		.end((err, res) => {

			let user_id = res.body.data.id;

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

					let basic_board_url = res.body.data.url;
					
					basic_player.user = { id : user_id };

					chai.request(app)
					.post('/api/instance/' + basic_board_url + '/create' )
					.end((err, res) => {

						instance_url = res.body.data.url;

						chai.request(app)
						.post('/api/instance/' + instance_url)
						.type('form')
						.send( basic_player )
						.end((err, res) => {

							res.body.data.data.owner.should.equal( user_id );
							let player = res.body.data;

							chai.request(app)
							.delete('/api/instance/' + instance_url)
							.type('form')
							.send({ player : player })
							.end((err, res) => {

								res.should.have.status(200);
								res.body.message.should.equal('Player removed.');

								chai.request(app)
								.get('/api/instance/' + instance_url)
								.end((err, res) => {
					
									instance = res.body.data;

									setTimeout( function() {
										m_user.findOne( { _id : user_id } ).then((result_user) => {

											chai.expect(result_user.data.session.instance).to.equal('');
											chai.expect(result_user.data.session.player).to.equal('');
											done();

										}).catch((err) => {
											console.log('catch error', done( new Error("user wasn't updated properly.")) );
										});

									}, 100);

								});

							});
						});
					});
				});
			});
		});
	});

})


