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
	words : 'long ass string here of words, testing ,split,type here'
}

let board_urls = [];


chai.use(chaiHttp);


describe('Board', () => {

	// board cleanup 
	m_board.remove({}, (err) => {});


	it('It should create a board.', (done) => {
		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send( basic_board )
		.end((err, res) => {
			res.should.have.status(201);
			res.body.message.should.equal('New board created.');
			chai.expect(res.body.data.url).to.be.an('string');
			chai.expect(res.body.data.data.name).to.be.an('string');
			chai.expect(res.body.data.data.words).to.be.an('array');
			chai.expect(res.body.data.data.game.win).to.be.an('number');
			chai.expect(res.body.data.data.game.display).to.be.an('number');
			board_urls.push(res.body.data);
			done();
		});			
	});


	it('It should not create a board with no name.', (done) => {
		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send({ words : 'testFail, things, to', })
		.end((err, res) => {
			res.should.have.status(422);
			res.body.message.should.equal('board name missing.');
			done();
		});			
	});

	it('It should not create a board with no words.', (done) => {
		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send({ name : 'testFail', })
		.end((err, res) => {
			res.should.have.status(422);
			res.body.message.should.equal('board words missing.');
			done();
		});			
	});	


	it('It should not get board with malformed url.', (done) => {
		chai.request(app)
		.get('/api/board/' + 'randomTasd23ea' )
		.end((err, res) => {
			res.should.have.status(404);
			res.body.message.should.equal('No board with that url found.');
			done();
		});			
	});

	it('It should get board data.', (done) => {
		chai.request(app)
		.get('/api/board/' + board_urls[0].url )
		.end((err, res) => {
			res.should.have.status(200);
			res.body.message.should.equal('Board data.');
			chai.expect(res.body.data.url).to.be.an('string');
			chai.expect(res.body.data.data.name).to.be.an('string');
			chai.expect(res.body.data.data.words).to.be.an('array');
			chai.expect(res.body.data.data.game.win).to.be.an('number');
			chai.expect(res.body.data.data.game.display).to.be.an('number');			
			done();
		});
	});




})


