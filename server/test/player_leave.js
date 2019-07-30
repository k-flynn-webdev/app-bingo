//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let app = require('../app.js');

// specific
let mongoose = require('mongoose');
let m_board = require('../models/board.model.js');


let basic_board = {"name":"testing 123456","lines":"test test 1§test test 2§test test 3§test test 4§test test 5§test test 6§test test 7§test test 8§§"}

const user_credentials_Login = {
	name : 'te1stUs1erTe13st', 
	email : 'te1st3Ete11stmail@Emai11l.com', 
	password : 'te31st1P1asstestw1ord',
}

let basic_player = {
	name : 'player01',
}

let players =[];
let instance = '';
let instance_url = '';

chai.use(chaiHttp);



describe('Player Leave', () => {

	it('It should remove a logged in user whos playing.', (done) => {

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

									players = [];

									for(let i =0;i<instance.data.players.length;i++){
										players.push(instance.data.players[i].url);
									}	
																
									chai.expect(players).to.not.include(player.url);

									done();

								});

							});
						});
					});
				});
			});
		});
	});

})





