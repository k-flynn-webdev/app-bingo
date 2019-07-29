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
let basic_board_tiny_name = {"name":"12","lines":"test test 1§test test 2§test test 3§test test 4§test test 5§test test 6§test test 7§test test 8§§"}
let basic_board_tiny_lines = {"name":"testing 123","lines":"tes1§te2§test 3§tet 4§test 5§tet 6§te 7§te 8§§"}
let basic_board_few_lines = {"name":"testing 123","lines":"test test 1§test test 2§test test 3"}



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
			chai.expect(res.body.data.data.lines).to.be.an('array');
			done();
		});			
	}).timeout(5000);


	it('It should not create a board with tiny name.', (done) => {
		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send( basic_board_tiny_name )
		.end((err, res) => {
			res.should.have.status(422);
			res.body.message.should.equal('Board name should be between 2 - 99 characters long.');
			done();
		});			
	});

	// it('It should not create a board with tiny lines.', (done) => {
	// 	chai.request(app)
	// 	.post('/api/board/create')
	// 	.type('form')
	// 	.send( basic_board_tiny_lines )
	// 	.end((err, res) => {
	// 		res.should.have.status(422);
	// 		res.body.message.should.equal('board name missing.');
	// 		done();
	// 	});			
	// });

	// it('It should not create a board with too few lines.', (done) => {
	// 	chai.request(app)
	// 	.post('/api/board/create')
	// 	.type('form')
	// 	.send( basic_board_few_lines )
	// 	.end((err, res) => {
	// 		res.should.have.status(422);
	// 		res.body.message.should.equal('board name missing.');
	// 		done();
	// 	});			
	// });

	it('It should not create a board with no name.', (done) => {
		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send({ lines : 'testFail, things, to', })
		.end((err, res) => {
			res.should.have.status(422);
			res.body.message.should.equal('board name missing.');
			done();
		});			
	});

	it('It should not create a board with no lines.', (done) => {
		chai.request(app)
		.post('/api/board/create')
		.type('form')
		.send({ name : 'testFail', })
		.end((err, res) => {
			res.should.have.status(422);
			res.body.message.should.equal('board lines missing.');
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
		
		.post('/api/board/create')
		.type('form')
		.send( basic_board )
		.end((err, res) => {

			res.should.have.status(201);
			res.body.message.should.equal('New board created.');
			chai.expect(res.body.data.url).to.be.an('string');
			chai.expect(res.body.data.data.name).to.be.an('string');
			chai.expect(res.body.data.data.lines).to.be.an('array');

			let board_data_url = res.body.data.url;

			chai.request(app)
			.get('/api/board/' + board_data_url )
			.end((err, res) => {
				res.should.have.status(200);
				res.body.message.should.equal('Board data.');
				chai.expect(res.body.data.url).to.be.an('string');
				chai.expect(res.body.data.data.name).to.be.an('string');
				chai.expect(res.body.data.data.lines).to.be.an('array');
				done();
			});

		});	

	});

	// now repeat some tests but as a logged in user?
})


