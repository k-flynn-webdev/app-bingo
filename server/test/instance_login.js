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
let m_user = require('../models/user.model.js');
let m_token = require('../models/token.model.js');


let basic_board = {"name":"testing 123456","lines":"test test 1§test test 2§test test 3§test test 4§test test 5§test test 6§test test 7§test test 8§§"}

const user_credentials_Login = {
	name : 'te1stUserTe3st', 
	email : 'test3Ete1stmail@Email.com', 
	password : 'te3stP1asstestword',
}


chai.use(chaiHttp);


describe('Instance Login', () => {

	it('It should create a instance and add the user as an owner.', (done) => {

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
				
					chai.request(app)
					.post('/api/instance/' + basic_board_url + '/create' )
					.send( { user : { id : user_id } } )
					.end((err, res) => {

						res.body.data.data.owner.should.equal( user_id );
						done();
					});
				});
			});
		});
	});

})


