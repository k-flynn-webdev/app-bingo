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


	it('It should get an object of played and won boards and stats.', (done) => {
		chai.request(app)
		.get('/meta/server/stats')
		.end((err, res) => {
			res.should.have.status(200);
			res.body.message.should.equal('Stats so far.');
			chai.expect(res.body.data.games_played).to.be.a('number');
			chai.expect(res.body.data.games_won).to.be.a('number');
			chai.expect(res.body.data.players).to.be.a('number');
			chai.expect(res.body.data.games).to.be.a('array');
			done();
		});			
	});


	it('It should return all current games in progress.', (done) => {
		chai.request(app)
		.get('/meta/instance/all')
		.end((err, res) => {
			res.should.have.status(200);
			res.body.message.should.equal('Instances current:');
			chai.expect(res.body.data.players_active).to.be.a('number');
			chai.expect(res.body.data.instances_active).to.be.a('number');
			chai.expect(res.body.data.instances_all).to.be.a('number');
			chai.expect(res.body.data.data).to.be.an('array');
			done();
		});			
	});





})


