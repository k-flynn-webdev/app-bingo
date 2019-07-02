//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let app = require('../app.js');


chai.use(chaiHttp);


describe('Meta', () => {


	// before(function (done) {
	// 	setTimeout(function(){
	// 		done();
	// 	}, 1000);
	// });


	it('It should get an array of latest boards.', (done) => {
		chai.request(app)
		.get('/meta/board/latest')
		.end((err, res) => {
			res.should.have.status(200);
			res.body.message.should.equal('Latest boards.');
			chai.expect(res.body.data).to.be.an('array');
			done();
		});			
	});


	it('It should get an array of popular boards.', (done) => {
		chai.request(app)
		.get('/meta/board/popular')
		.end((err, res) => {
			res.should.have.status(200);
			res.body.message.should.equal('Popular boards.');
			chai.expect(res.body.data).to.be.an('array');
			done();
		});			
	});


	it('It should get an object of played and won boards.', (done) => {
		chai.request(app)
		.get('/meta/board/wins_plays')
		.end((err, res) => {
			res.should.have.status(200);
			res.body.message.should.equal('Win and plays so far.');
			chai.expect(res.body.data.wins).to.be.a('number');
			chai.expect(res.body.data.plays).to.be.a('number');
			done();
		});			
	});


	it('It should get an array of games in progress.', (done) => {
		chai.request(app)
		.get('/meta/instance/games')
		.end((err, res) => {
			res.should.have.status(200);
			res.body.message.should.equal('Games playing.');
			chai.expect(res.body.data.games).to.be.an('array');
			done();
		});			
	});


	it('It should get current number of players playing.', (done) => {
		chai.request(app)
		.get('/meta/instance/players')
		.end((err, res) => {
			res.should.have.status(200);
			res.body.message.should.equal('Players currently.');
			chai.expect(res.body.data.players).to.be.a('number');
			done();
		});			
	});


})


