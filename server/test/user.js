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



const user_credentials_Login = {
	name : 'testUser', 
	email : 'testEmail@Email.com', 
	password : 'testPassword',
}



describe('Users', () => {

	

	// before(function (done) {
	// 	setTimeout(function(){
	// 		done();
	// 	}, 1000);
	// });

	// user cleanup 
	m_user.remove({}, (err) => {});
	// token cleanup 
	m_token.remove({}, (err) => {});
	// token cleanup 
	// m_transaction.remove({}, (err) => {});

// CREATION SECTION //

	it('It should CREATE a user and return a token + id as a response.', (done) => {

		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send(user_credentials_Login)
		.end((err, res) => {

			res.should.have.status(201);

			chai.expect(res.body.token).to.be.an('string');	
			res.body.token.length.should.be.above(50);

			chai.expect(res.body.data.id).to.be.an('string');
			res.body.data.id.length.should.equal(24);
			
			chai.expect(res.body.data.name).to.be.an('string');
			chai.expect(res.body.data.email).to.be.an('string');
			chai.expect(res.body.data.role).to.be.an('string');

			res.body.message.should.equal('success new user created.');
			done();
		});
	})



	it('It should not CREATE a user with same details.', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send(user_credentials_Login)
		.end((err, res) => {
			res.should.have.status(422);
			res.body.message.should.equal('email already in use.');
			done();
		});
	});

	it('It should not CREATE a user and with no (input).', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({})
		.end((err, res) => {
			res.should.have.status(422);
			res.body.message.should.equal('name missing.');
			done();
		});			
	});	

// // NAME //

	it('It should not CREATE a user with sanitized long (name)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
				name : 'soAme@<script>.log("runMe!");</script>testHe<re',
				email : 'pre_' + user_credentials_Login.email,
				password : 'pre_' + user_credentials_Login.password,
			})			
		.end((err, res) => {
			res.body.message.should.eql('Name should be between 2 - 60 characters long.');
			res.should.have.status(422);
			done();
		});
	});

	it('It should not CREATE a user with no(name)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
				email : 'sdfs' + user_credentials_Login.email,
				password : 'sfsjuy' + user_credentials_Login.password,
			})			
		.end((err, res) => {
			res.body.message.should.equal('name missing.');
			res.should.have.status(422);
			done();
		});
	});	

	it('It should not CREATE a user with small(name)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
				name : 't1',
				email : 'sdsdfs' + user_credentials_Login.email,
				password : 'sfsjaduy' + user_credentials_Login.password,
			})			
		.end((err, res) => {
			res.body.message.should.eql('Name should be between 2 - 60 characters long.');
			res.should.have.status(422);
			done();
		});			
	});	

	it('It should not CREATE a user with large(name)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
				name : 'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch (llan-vire-pooll-guin-gill-go-ger-u-queern-drob-ooll-llandus-ilio-gogo-goch) (usually known as Llanfair-pwll or Llanfairpwllgwyngyll) is a Welsh word which translates roughly as "St Mary`s Church in the Hollow of the White Hazel near a Rapid Whirlpool and the Church of St. Tysilio near the Red Cave" . Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch (llan-vire-pooll-guin-gill-go-ger-u-queern-drob-ooll-llandus-ilio-gogo-goch) (usually known as Llanfair-pwll or Llanfairpwllgwyngyll) is a Welsh word which translates roughly as "St Mary`s Church in the Hollow of the White Hazel near a Rapid Whirlpool and the Church of St. Tysilio near the Red Cave"',
				email : 'pre11_' + user_credentials_Login.email,
				password : 'pr2e2_' + user_credentials_Login.password,
			})			
		.end((err, res) => {
			res.body.message.should.eql('Name should be between 2 - 60 characters long.');			
			res.should.have.status(422);
			done();
		});			
	});	



// //  // EMAIL //

	it('It should not CREATE a user with used(email)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send(user_credentials_Login)			
		.end((err, res) => {
			res.should.have.status(422);
			res.body.message.should.equal('email already in use.');
			done();
		});
	});

	it('It should not CREATE a user with no(email)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
				name : user_credentials_Login.name,
				password : user_credentials_Login.password,
			})			
		.end((err, res) => {
			res.body.message.should.equal('email missing.');
			res.should.have.status(422);
			done();
		});			
	});

	it('It should not CREATE a user with small(email)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
				name : user_credentials_Login.name,
				email : '2@1.c',
				password : user_credentials_Login.password,
			})			
		.end((err, res) => {
			res.body.message.should.equal('Email should be between 7 - 100 characters long.');
			res.should.have.status(422);
			done();
		});			
	});


	it('It should not CREATE a user with large(email)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
				name : user_credentials_Login.name,
				email : 'neadsdffgdvhdfbdfbsfgsdadaferfssfsvsdfwEamil@emaisfdfdfsfdcfsfqwewdfsdfsqwefhdffls.cogdvhdfbdfbsfgsdadaferfssfm',
				password : user_credentials_Login.password,
			})			
		.end((err, res) => {
			res.body.message.should.equal('Email should be between 7 - 100 characters long.');
			res.should.have.status(422);
			done();
		});			
	});

	it('It should CREATE a user with sanitized(email)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
				name : user_credentials_Login.name,
				email : 'thisEmailISFunny<script>console.log("runMe!");</script>test@email.com',
				password : user_credentials_Login.password,
			})			
		.end((err, res) => {
			res.body.message.should.equal('success new user created.');
			res.should.have.status(201);
			res.body.token.length.should.be.above(50);			
			done();
		});
	});


	it('It should not CREATE a user with bad incomplete(email)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
				name : user_credentials_Login.name,
				email : 'test@test',				
				password : user_credentials_Login.password,
			})			
		.end((err, res) => {
			res.body.message.should.equal('email appears broken, either missing @ or domain.');
			res.should.have.status(422);
			done();
		});			
	});

// // // PASSWORD //

	it('It should not CREATE a user with no(password)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
				name : 's6sa' + user_credentials_Login.name,
				email : 'sf1se' + user_credentials_Login.email,
			})			
		.end((err, res) => {
			res.body.message.should.equal('password missing.');
			res.should.have.status(422);
			done();
		});			
	});

	it('It should not CREATE a user with small(password)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
				name : 's6sa' + user_credentials_Login.name,
				email : 'sf1se' + user_credentials_Login.email,
				password : '123',
			})			
		.end((err, res) => {
			res.body.message.should.equal('Password should be at least 6 characters long.');
			res.should.have.status(422);
			done();
		});			
	});

	it('It should CREATE a user with long(password)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
				name : 's6sa' + user_credentials_Login.name,
				email : 'sf1se' + user_credentials_Login.email,
				password : 'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogochllan-vire-pooll-guin-gill-go-ger-u-queern-drob-ooll-llandus-ilio-gogo-gochusually known as Llanfair-pwll or Llanfairpwllgwyngyll is a Welsh word which translates roughly as "St Mary`s Church in the Hollow of the White Hazel near a Rapid Whirlpool and the Church of St. Tysilio near the Red Cave" . Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch (llan-vire-pooll-guin-gill-go-ger-u-queern-drob-ooll-llandus-ilio-gogo-goch) (usually known as Llanfair-pwll or Llanfairpwllgwyngyll) is a Welsh word which translates roughly as "St Mary`s Church in the Hollow of the White Hazel near a Rapid Whirlpool and the Church of St. Tysilio near the Red Cave"',
			})			
		.end((err, res) => {
			res.body.message.should.equal('success new user created.');
			res.should.have.status(201);
			res.body.token.length.should.be.above(50);			
			done();
		});			
	}).timeout(5000);;

	it('It should CREATE a user with sanitized input(password)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
				name : 'tets1863' + user_credentials_Login.name,
				email : 'tets1863' + user_credentials_Login.email,
				password : user_credentials_Login.password + '<script>console.log("runMe!");</script>',
			})			
		.end((err, res) => {
			res.body.message.should.equal('success new user created.');
			res.should.have.status(201);
			done();
		});			
	}).timeout(5000);;

// // // UPDATE //

	it('It should UPDATE a user with new(name/email/pass)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({ name : user_credentials_Login.name, email : 'ranomdTestEmail@test.com', password : 'randomPasswordHere' })
		.end((err, res) => {

			res.should.have.status(201);
			res.body.token.length.should.be.above(50);
			let token_user = res.body.token;

			chai.request(app)
			.put('/api/account')
			.set('Authorization', 'Bearer ' + token_user)
			.type('form')
			.send({	
					name : 'newName',
					email : 'newEmail@email.com',
					password : 'newPassword',
				})
			.end((err, res) => {
				res.body.message.should.equal('success user updated.');	
				res.should.have.status(202);
				done();
			});
		});
	});


	it('It should not UPDATE a user with a no(input)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({ name : user_credentials_Login.name, email : 'ranomdT1estEmail@tes1t.com', password : 'rand1omPasswo1rdHere' })
		.end((err, res) => {

			res.should.have.status(201);
			res.body.token.length.should.be.above(50);
			let token_user = res.body.token;

			chai.request(app)
			.put('/api/account')
			.set('Authorization', 'Bearer ' + token_user)
			.type('form')
			.send({})
			.end((err, res) => {
				res.body.message.should.equal('no fields to update.');	
				res.should.have.status(422);
				done();
			});
		});
	});


	it('It should UPDATE a user with a only new(name)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({ name : user_credentials_Login.name, email : 'ranomdT1estEmai1l@tes1t.com', password : 'rand1o1mPasswo1rdHere' })
		.end((err, res) => {

			res.should.have.status(201);
			res.body.token.length.should.be.above(50);
			let token_user = res.body.token;

			chai.request(app)
			.put('/api/account')
			.set('Authorization', 'Bearer ' + token_user)
			.type('form')
			.send({ name : 'testupdatedname' })
			.end((err, res) => {
				res.body.data.name.should.equal('testupdatedname');	
				res.body.message.should.equal('success user updated.');	
				res.should.have.status(202);
				done();
			});
		});
	});


	it('It should not UPDATE a user with a only new short(name)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({ name : user_credentials_Login.name, email : 'ran12omdT1estEmai1l@tes1t.com', password : 'rand113o1mPasswo1rdHere' })
		.end((err, res) => {

			res.should.have.status(201);
			res.body.token.length.should.be.above(50);
			let token_user = res.body.token;

			chai.request(app)
			.put('/api/account')
			.set('Authorization', 'Bearer ' + token_user)
			.type('form')
			.send({ name : 'b' })
			.end((err, res) => {
				res.body.message.should.equal('Name should be between 2 - 60 characters long.');	
				res.should.have.status(422);
				done();
			});
		});
	});

	it('It should not UPDATE a user with a only new long(name)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({ name : user_credentials_Login.name, email : 'ran12omdT1es1tEmai1l@tes1t.com', password : 'ran1d113o1mPasswo1rdHere' })
		.end((err, res) => {

			res.should.have.status(201);
			res.body.token.length.should.be.above(50);
			let token_user = res.body.token;

			chai.request(app)
			.put('/api/account')
			.set('Authorization', 'Bearer ' + token_user)
			.type('form')
			.send({
				name : 'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogochllan-vire-pooll-guin-gill-go-ger-u-queern-drob-ooll-llandus-ilio-gogo-gochusually known as Llanfair-pwll or Llanfairpwllgwyngyll is a Welsh word which translates roughly as "St Mary`s Church in the Hollow of the White Hazel near a Rapid Whirlpool and the Church of St. Tysilio near the Red Cave" . Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch (llan-vire-pooll-guin-gill-go-ger-u-queern-drob-ooll-llandus-ilio-gogo-goch) (usually known as Llanfair-pwll or Llanfairpwllgwyngyll) is a Welsh word which translates roughly as "St Mary`s Church in the Hollow of the White Hazel near a Rapid Whirlpool and the Church of St. Tysilio near the Red Cave"',
			 })
			.end((err, res) => {
				res.body.message.should.equal('Name should be between 2 - 60 characters long.');	
				res.should.have.status(422);
				done();
			});
		});
	});


	it('It should UPDATE a user with a only new(email)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({ name : user_credentials_Login.name, email : 'ran12om1dT1es1tEmai1l@tes1t.com', password : 'r1and113o1mPasswo1rdHere' })
		.end((err, res) => {

			res.should.have.status(201);
			res.body.token.length.should.be.above(50);
			let token_user = res.body.token;

			chai.request(app)
			.put('/api/account')
			.set('Authorization', 'Bearer ' + token_user)
			.type('form')
			.send({ email : 'testingthisnew@email.com' })
			.end((err, res) => {
				res.body.data.email.should.eql('testingthisnew@email.com');
				res.body.message.should.equal('success user updated.');	
				res.should.have.status(202);
				done();
			});
		});
	});


	it('It should not UPDATE a user with a small(email)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({ name : user_credentials_Login.name, email : 'ran12om1dT1es1tEmai1l@tes1t.com', password : 'r1and113o1mPasswo1rdHere' })
		.end((err, res) => {

			res.should.have.status(201);
			res.body.token.length.should.be.above(50);
			let token_user = res.body.token;

			chai.request(app)
			.put('/api/account')
			.set('Authorization', 'Bearer ' + token_user)
			.type('form')
			.send({ email : 't@l.c' })
			.end((err, res) => {
				res.body.message.should.equal('Email should be between 7 - 100 characters long.');	
				res.should.have.status(422);
				done();
			});
		});
	});

	it('It should not UPDATE a user with a only new long(name)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({ name : user_credentials_Login.name, email : 'ran12i1l@tes1t.com', password : 'ran1d1o1rdHere111' })
		.end((err, res) => {

			res.should.have.status(201);
			res.body.token.length.should.be.above(50);
			let token_user = res.body.token;

			chai.request(app)
			.put('/api/account')
			.set('Authorization', 'Bearer ' + token_user)
			.type('form')
			.send({
				email : 'testingaverylongemailheretestingaverylongemailhere@testingaverylongemailhere.testingaverylongemailhere'
			 })
			.end((err, res) => {
				res.body.message.should.equal('Email should be between 7 - 100 characters long.');
				res.should.have.status(422);
				done();
			});
		});
	});


// // LOGIN SECTION //

	it('It should Login a user', (done) => {
		chai.request(app)
		.post('/api/account/login')
		.type('form')
		.send(user_credentials_Login)
		.end((err, res) => {
			res.should.have.status(200);
			res.body.message.should.equal('success welcome back.');
			res.body.token.length.should.be.above(50);
			done();
		});
	});

	it('It should not Login a user wrong(email)', (done) => {
		chai.request(app)
		.post('/api/account/login')
		.type('form')
		.send({	
				name : user_credentials_Login.name,
				email : 'm_' + user_credentials_Login.email,
				password : user_credentials_Login.password,
			})			
		.end((err, res) => {
			res.body.message.should.equal('no user found with that email.');
			res.should.have.status(404);
			done();
		});
	});

	it('It should not Login a user wrong(password)', (done) => {
		chai.request(app)
		.post('/api/account/login')
		.type('form')
		.send({	
				name : user_credentials_Login.name,
				email : user_credentials_Login.email,
				password : 'e1ra_' + user_credentials_Login.password,
			})			
		.end((err, res) => {
			res.body.message.should.equal('password does not match.');
			res.should.have.status(401);
			done();
		});
	});

// // DELETE SECTION //

	it('It should DELETE a user with correct(token)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
			name : 'testing1231',
			email : 'newEmails@sdsad.com12',
			password : 'asdasdasdwdaw231231',
		})
		.end((err, res) => {
			res.should.have.status(201);
			res.body.token.length.should.be.above(50);
			let token_user = res.body.token;

			chai.request(app)
			.delete('/api/account/')
			.set('Authorization', 'Bearer ' + token_user)
			.type('form')
			.send({})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.message.should.equal('user deleted, goodbye.');
				done();
			});
		});
	});

	it('It should not DELETE a user with bad end(token)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
			name : 'testin1g1231',
			email : 'newE1mails@sd1sad.com12',
			password : 'asda1sdasdwdaw231231',
		})
		.end((err, res) => {
			res.should.have.status(201);
			res.body.token.length.should.be.above(50);

			let new_token = res.body.token.substring(0, res.body.token.length - 1) + 'E';

			chai.request(app)
			.delete('/api/account/')
			.set('Authorization', 'Bearer ' + new_token)
			.type('form')
			.send({})
			.end((err, res) => {
				res.should.have.status(401);
				res.body.message.should.equal('invalid signature');
				done();
			});
		});
	});

	it('It should not DELETE a user with bad start(token)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
			name : 'test1in1g1231',
			email : 'newE1m1ails@sd1sad.com12',
			password : 'asda1s1dasdwdaw231231',
		})
		.end((err, res) => {
			res.should.have.status(201);
			res.body.token.length.should.be.above(50);

			let new_token = 'F' + res.body.token.substring(1, res.body.token.length );

			chai.request(app)
			.delete('/api/account/')
			.set('Authorization', 'Bearer ' + new_token)
			.type('form')
			.send({})
			.end((err, res) => {
				res.should.have.status(401);
				res.body.message.should.equal('invalid token');
				done();
			});
		});
	});


	it('It should not DELETE a user with old/denied(token)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
			name : 'tes1tin2g1231',
			email : 'newEm1ails@sds2ad.com12',
			password : 'asda1sdasdwda2w231231',
		})
		.end((err, res) => {
			res.should.have.status(201);
			res.body.token.length.should.be.above(50);
			let token_user = res.body.token;

			chai.request(app)
			.delete('/api/account/')
			.set('Authorization', 'Bearer ' + token_user)
			.type('form')
			.send({})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.message.should.equal('user deleted, goodbye.');

				chai.request(app)
				.delete('/api/account/')
				.set('Authorization', 'Bearer ' + token_user)
				.type('form')
				.send({})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.message.should.equal('security token previously used/disabled.');
					done();
				});

			});
		});
	});


// // LOGOUT SECTION //

	it('It should LOGOUT a user', (done) => {
		chai.request(app)
		.post('/api/account/login')
		.type('form')
		.send(user_credentials_Login)
		.end((err, res) => {
			res.should.have.status(200);
			res.body.message.should.equal('success welcome back.');
			res.body.token.length.should.be.above(50);

			let token_user = res.body.token;

			chai.request(app)
			.post('/api/account/logout')
			.set('Authorization', 'Bearer ' + token_user)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.message.should.equal('success user logged out, goodbye.');
				done();
			});
		});
	});



	it('It should not LOGOUT a user with bad(token)', (done) => {
		let fakeToken = 'ejJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzExYTQ3Y2VmNzQxNzJiOGQzNTk3N2QiLCJuYW1lIjoidGVzdFVzZXIiLCJlbWFpbCI6InRlc3RFbWFpbEBFbWFpbC5jb20iLCJsb2dpbiI6IjIwMTgtMTItMTNUMDA6MTQ6NTIuNDYzWiIsImFjdGl2ZSI6dHJ1ZSwiaWF0IjoxNTQ0NjYwMDkyLCJleHAiOjE1NDUyNjQ4OTJ9.VTgtyEQdX6OqE6LEUHj9ak_YA3dWbRLxfc7OqIgN3R4';
		chai.request(app)
		.post('/api/account/logout')
		.set('Authorization', 'Bearer ' + fakeToken)
		.end((err, res) => {
			res.should.have.status(401);
			res.body.message.should.equal('invalid token');
			done();
		});
	});


	it('It should not LOGOUT a user with denied(token)', (done) => {
		chai.request(app)
		.post('/api/account/create')
		.type('form')
		.send({	
			name : 'tes1tin2g12131',
			email : 'newEm11ails@sds2ad.com12',
			password : 'asda1sdasdwda21w231231',
		})
		.end((err, res) => {
			res.should.have.status(201);
			res.body.token.length.should.be.above(50);
			let token_user = res.body.token;

			chai.request(app)
			.delete('/api/account/')
			.set('Authorization', 'Bearer ' + token_user)
			.type('form')
			.send({})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.message.should.equal('user deleted, goodbye.');

				chai.request(app)
				.post('/api/account/logout')
				.set('Authorization', 'Bearer ' + token_user)
				.end((err, res) => {
					res.should.have.status(401);
					res.body.message.should.equal('security token previously used/disabled.');
					done();
				});

			});
		});
	});



});


