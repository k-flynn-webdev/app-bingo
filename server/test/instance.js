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


let basic_board = {"name":"testing 123","lines":"test test 1§test test 2§test test 3§test test 4§test test 5§test test 6§test test 7§test test 8§§"}


chai.use(chaiHttp);


describe('Instance', () => {

	// board cleanup 
	m_board.remove({}, (err) => {});


	it('It should not create an instance with bad url.', (done) => {
		chai.request(app)
		.post('/api/instance/sdad3eadse1312adfraefs/create' )
		.end((err, res) => {
			res.should.have.status(404);
			res.body.message.should.equal('No board with that url found.');
			done();
		});
	});

	it('It should not create an instance with missing/tiny url.', (done) => {
		chai.request(app)
		.post('/api/instance/1/create' )
		.end((err, res) => {
			res.should.have.status(422);
			res.body.message.should.equal('board url missing or malformed.');
			done();
		});
	});


	it('It should return a random running instance from those running already.', (done) => {

		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send( basic_board )
		.end((err, res) => {

			let basic_board_url = res.body.data.url;
			let instance_urls = [];

			chai.request(app)
			.post('/api/instance/' + basic_board_url + '/create' )
			.end((err, res) => {

				instance_urls.push( res.body.data.url );

				chai.request(app)
				.post('/api/instance/' + basic_board_url + '/create' )
				.end((err, res) => {

					instance_urls.push( res.body.data.url );

					chai.request(app)
					.post('/api/instance/' + basic_board_url + '/random' )
					.end((err, res) => {

						res.should.have.status(200);
						res.body.message.should.equal('Found a random board instance.');
						chai.expect(res.body.data.url).to.be.a('string');
						chai.expect(res.body.data.data.board).to.be.a('string');
						chai.expect(res.body.data.data.players).to.be.an('array');
						chai.expect(res.body.data.data.game.win).to.be.a('number');
						chai.expect(res.body.data.data.game.display).to.be.a('number');	
						chai.expect(res.body.data.data.game.winner.win).to.be.a('boolean');	
						chai.expect(res.body.data.data.game.winner.url).to.be.a('string');	
						chai.expect(res.body.data.data.game.winner.data).to.be.a('object');	
						chai.expect(res.body.data.data.game.winner.data.name).to.be.a('string');	
						chai.expect(res.body.data.data.game.winner.data.score).to.be.a('number');
						chai.expect(instance_urls).to.include(res.body.data.url);	
						done();

					});
				});	
			});	
		});
	});	



	it('It should create a new instance.', (done) => {
		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send( basic_board )
		.end((err, res) => {

			let basic_board_url = res.body.data.url;
		
			chai.request(app)
			.post('/api/instance/' + basic_board_url + '/create' )
			.end((err, res) => {
				res.should.have.status(201);
				res.body.message.should.equal('New board instance created.');
				chai.expect(res.body.data.url).to.be.a('string');
				chai.expect(res.body.data.data.board).to.be.a('string');
				chai.expect(res.body.data.data.players).to.be.an('array');
				chai.expect(res.body.data.data.game.win).to.be.a('number');
				chai.expect(res.body.data.data.game.display).to.be.a('number');	
				chai.expect(res.body.data.data.game.winner.win).to.be.a('boolean');	
				chai.expect(res.body.data.data.game.winner.url).to.be.a('string');	
				chai.expect(res.body.data.data.game.winner.data).to.be.a('object');	
				chai.expect(res.body.data.data.game.winner.data.name).to.be.a('string');	
				chai.expect(res.body.data.data.game.winner.data.score).to.be.a('number');	
				done();
			});
		});		
	});



	it('It should not return a malformed instance from those running already.', (done) => {
		chai.request(app)
		.get('/api/instance/' + '12' )
		.end((err, res) => {
			res.should.have.status(422);
			res.body.message.should.equal('instance url missing or malformed.');	
			done();
		});	
	});

	it('It should not return a unknown instance from those running already.', (done) => {
		chai.request(app)
		.get('/api/instance/' + 'asd32esd' )
		.end((err, res) => {
			res.should.have.status(404);
			res.body.message.should.equal('Instance is now closed, try starting another from the menu.');	
			done();
		});	
	});

	it('It should return a specific running instance from those running already.', (done) => {
		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send( basic_board )
		.end((err, res) => {

			let basic_board_url = res.body.data.url;
			let instance_urls = [];

			chai.request(app)
			.post('/api/instance/' + basic_board_url + '/create' )
			.end((err, res) => {

				instance_urls.push( res.body.data.url );

				chai.request(app)
				.post('/api/instance/' + basic_board_url + '/create' )
				.end((err, res) => {

					instance_urls.push( res.body.data.url );

					chai.request(app)
					.get('/api/instance/' + instance_urls[0] )
					.end((err, res) => {

						res.should.have.status(200);
						res.body.message.should.equal('Latest update.');
						chai.expect(res.body.data.url).to.be.a('string');
						chai.expect(res.body.data.data.board).to.be.a('string');
						chai.expect(res.body.data.data.players).to.be.an('array');
						chai.expect(res.body.data.data.game.win).to.be.a('number');
						chai.expect(res.body.data.data.game.display).to.be.a('number');	
						chai.expect(res.body.data.data.game.winner.win).to.be.a('boolean');	
						chai.expect(res.body.data.data.game.winner.url).to.be.a('string');	
						chai.expect(res.body.data.data.game.winner.data).to.be.a('object');	
						chai.expect(res.body.data.data.game.winner.data.name).to.be.a('string');	
						chai.expect(res.body.data.data.game.winner.data.score).to.be.a('number');
						chai.expect(instance_urls).to.include(res.body.data.url);	
						done();

					});
				});	
			});	
		});
	});


	// now repeat some tests but as a logged in user?


})


