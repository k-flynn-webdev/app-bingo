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


let basic_board = {
	name : 'testBoard',
	words : 'basic, board, words, here, things cant make test'
}

let basic_player = {
	name : 'testplayer',
	words : 'asdad adada ,a saaddada ,adsdasdad',
	score : 0,
}
let player = null;

let basic_player_2 = {
	name : 'testplayer2222',
	words : 'asdad adada ,a saaddada ,adsdasdad',
	score : 0,
}
let player_2 = null;

let basic_player_data = {
	url : '',
	data : {
		name : 'testplayer',
		score : 0,
		words : [],
	},
}

// let board_urls = [];
// let instance_urls = [];
let players = [];

let board = '';
let board_url = '';
let instance = '';
let instance_url = '';

chai.use(chaiHttp);



describe('Player', () => {



	it('It should return a new player on joining an instance.', (done) => {

		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send( basic_board )
		.end((err, res) => {
			board = res.body.data;
			board_url = res.body.data.url;

			chai.request(app)
			.get('/api/instance/' + board_url + '/create')
			.end((err, res) => {
				instance = res.body.data;
				instance_url = res.body.data.url;

				chai.request(app)
				.post('/api/instance/' + instance_url)
				.type('form')
				.send( basic_player )
				.end((err, res) => {
					res.should.have.status(201);
					res.body.message.should.equal('New player joined.');
					chai.expect(res.body.data.url).to.be.a('string');
					chai.expect(res.body.data.data.name).to.be.a('string');
					chai.expect(res.body.data.data.score).to.be.a('number');
					done();
				});
			});	
		});	
	});	

	it('It should not return a new player on joining an instance with a missing name.', (done) => {

		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send(basic_board)
		.end((err, res) => {
			board = res.body.data;
			board_url = res.body.data.url;

			chai.request(app)
			.get('/api/instance/' + board_url + '/create')
			.end((err, res) => {
				instance = res.body.data;
				instance_url = res.body.data.url;

				chai.request(app)
				.post('/api/instance/' + instance_url)
				.type('form')
				.send( { words : 'eqeq asdad adadad', score : 0 } )
				.end((err, res) => {
					res.should.have.status(422);
					res.body.message.should.equal('missing player information. Please re-join.');
					done();
				});
			});	
		});	
	});	


	it('It should show a new player joined in an instance.', (done) => {

		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send(basic_board)
		.end((err, res) => {
			board = res.body.data;
			board_url = res.body.data.url;

			chai.request(app)
			.get('/api/instance/' + board_url + '/create')
			.end((err, res) => {
				instance = res.body.data;
				instance_url = res.body.data.url;

				chai.request(app)
				.post('/api/instance/' + instance_url)
				.type('form')
				.send( basic_player )
				.end((err, res) => {
					player = res.body.data;

					chai.request(app)
					.get('/api/instance/' + instance_url)
					.end((err, res) => {
						instance = res.body.data;
						players = [];

						for(let i =0;i<instance.data.players.length;i++){
							players.push(instance.data.players[i].url);
						}

						chai.expect(players).to.include(player.url);
						res.should.have.status(200);
						res.body.message.should.equal('Latest update.');

						done();
					});
				});
			});	
		});	
	});	



	it('It should remove the correct player from an instance on leave request.', (done) => {

		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send(basic_board)
		.end((err, res) => {
			board = res.body.data;
			board_url = res.body.data.url;

			chai.request(app)
			.get('/api/instance/' + board_url + '/create')
			.end((err, res) => {
				instance = res.body.data;
				instance_url = res.body.data.url;

				chai.request(app)
				.post('/api/instance/' + instance_url)
				.type('form')
				.send( basic_player )
				.end((err, res) => {
					player = res.body.data;

					chai.request(app)
					.post('/api/instance/' + instance_url)
					.type('form')
					.send( basic_player_2 )
					.end((err, res) => {
						player_2 = res.body.data;


						chai.request(app)
						.delete('/api/instance/' + instance_url)
						.type('form')
						.send({ player : player_2 })
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
															
								chai.expect(players).to.include(player.url);
								chai.expect(players).to.not.include(player_2.url);

								done();

							});
						});
					});
				});
			});	
		});	
	});	


	it('It should update the player from an instance with a new word.', (done) => {

		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send( basic_board )
		.end((err, res) => {
			board = res.body.data;
			board_url = res.body.data.url;

			chai.request(app)
			.get('/api/instance/' + board_url + '/create')
			.end((err, res) => {
				instance = res.body.data;
				instance_url = res.body.data.url;

				chai.request(app)
				.post('/api/instance/' + instance_url)
				.type('form')
				.send( basic_player )
				.end((err, res) => {
					player = res.body.data;


					chai.request(app)
					.put('/api/instance/' + instance_url)
					.type('form')
					.send({
						player : {
							url : player.url,
							word : {
								add : 'here',
							},
						},
					})
					.end((err, res) => {
						res.should.have.status(202);
						res.body.message.should.equal('Player updated successfully.');
						chai.expect(res.body.data.url).to.equal(player.url);
						chai.expect(res.body.data.word.add).to.equal('here');
						chai.expect(res.body.data.score).to.equal(1);

						done();
					});
				});
			});	
		});	
	});

	it('It should NOT update the player from an instance with a unavailable word.', (done) => {

		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send( basic_board )
		.end((err, res) => {
			board = res.body.data;
			board_url = res.body.data.url;

			chai.request(app)
			.get('/api/instance/' + board_url + '/create')
			.end((err, res) => {
				instance = res.body.data;
				instance_url = res.body.data.url;

				chai.request(app)
				.post('/api/instance/' + instance_url)
				.type('form')
				.send( basic_player )
				.end((err, res) => {
					player = res.body.data;


					chai.request(app)
					.put('/api/instance/' + instance_url)
					.type('form')
					.send({
						player : {
							url : player.url,
							word : {
								add : 'teeeeeeee',
							},
						},
					})
					.end((err, res) => {
						res.should.have.status(422);
						res.body.message.should.equal('Player word to add does not exist.');
						done();
					});
				});
			});	
		});	
	});


	it('It should NOT update the player from an instance with a duplicate word.', (done) => {
	
		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send( basic_board )
		.end((err, res) => {
			board = res.body.data;
			board_url = res.body.data.url;

			chai.request(app)
			.get('/api/instance/' + board_url + '/create')
			.end((err, res) => {
				instance = res.body.data;
				instance_url = res.body.data.url;

				chai.request(app)
				.post('/api/instance/' + instance_url)
				.type('form')
				.send( basic_player )
				.end((err, res) => {
					player = res.body.data;


					chai.request(app)
					.put('/api/instance/' + instance_url)
					.type('form')
					.send({
						player : {
							url : player.url,
							word : {
								add : 'here',
							},
						},
					})
					.end((err, res) => {

						chai.request(app)
						.put('/api/instance/' + instance_url)
						.type('form')
						.send({
							player : {
								url : player.url,
								word : {
									add : 'here',
								},
							},
						})
						.end((err, res) => {

							res.should.have.status(403);
							res.body.message.should.equal('Player already has this word.');
							done();

						});
					});
				});
			});
		});
	});

	it('It should NOT remove a word from the player that they dont have.', (done) => {
	
		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send( basic_board )
		.end((err, res) => {
			board = res.body.data;
			board_url = res.body.data.url;

			chai.request(app)
			.get('/api/instance/' + board_url + '/create')
			.end((err, res) => {
				instance = res.body.data;
				instance_url = res.body.data.url;

				chai.request(app)
				.post('/api/instance/' + instance_url)
				.type('form')
				.send( basic_player )
				.end((err, res) => {
					player = res.body.data;


					chai.request(app)
					.put('/api/instance/' + instance_url)
					.type('form')
					.send({
						player : {
							url : player.url,
							word : {
								remove : 'things',
							},
						},
					})
					.end((err, res) => {
						res.should.have.status(422);
						res.body.message.should.equal('Player does not have this word.');
						done();

					});
				});
			});	
		});	
	});


	it('It should update the player name in an instance.', (done) => {
	
		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send( basic_board )
		.end((err, res) => {
			board = res.body.data;
			board_url = res.body.data.url;

			chai.request(app)
			.get('/api/instance/' + board_url + '/create')
			.end((err, res) => {
				instance = res.body.data;
				instance_url = res.body.data.url;

				chai.request(app)
				.post('/api/instance/' + instance_url)
				.type('form')
				.send( basic_player )
				.end((err, res) => {
					player = res.body.data;


					chai.request(app)
					.put('/api/instance/' + instance_url)
					.type('form')
					.send({
						player : {
							url : player.url,
							name : {
								update : 'newNameGoesHere',
							},
						},
					})
					.end((err, res) => {

						res.should.have.status(202);
						res.body.message.should.equal('Player updated successfully.');
						res.body.data.url.should.equal(player.url);
						res.body.data.name.update.should.equal('newNameGoesHere');
						done();

					});
				});
			});	
		});	
	});

	it('It should not update the player name in an instance with an small name.', (done) => {
	
		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send( basic_board )
		.end((err, res) => {
			board = res.body.data;
			board_url = res.body.data.url;

			chai.request(app)
			.get('/api/instance/' + board_url + '/create')
			.end((err, res) => {
				instance = res.body.data;
				instance_url = res.body.data.url;

				chai.request(app)
				.post('/api/instance/' + instance_url)
				.type('form')
				.send( basic_player )
				.end((err, res) => {
					player = res.body.data;


					chai.request(app)
					.put('/api/instance/' + instance_url)
					.type('form')
					.send({
						player : {
							url : player.url,
							name : {
								update : 'ne',
							},
						},
					})
					.end((err, res) => {
						res.should.have.status(422);
						res.body.message.should.equal('Player name update is too short.');
						done();
					});
				});
			});	
		});	
	});

})





