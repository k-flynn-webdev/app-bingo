
function getURL( url, method, isJson=false, body, next) {
	var xhr = new XMLHttpRequest();
	
	xhr.open(method, url, true);
	if( isJson ){
		xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	}
	let secureKey = get_SecureKey();
	if( secureKey.length > 5 ){
		xhr.setRequestHeader('Authorization', 'Bearer ' + secureKey );	
	}
	
	xhr.send( body );

	xhr.onload = function() {

		if( this.status >= 200 &&  this.status < 300 ){
			return next( null, JSON.parse( this.responseText ));
		}

		let responseJson = {};
		
		try {
			responseJson = JSON.parse(this.responseText.toString('ascii'));
		} catch(error) {
			let messageTmp = this.statusText
			if( messageTmp.length === 0){
				messageTmp = 'No network connection.';
			}
			return next({ status : this.status, message : this.statusText });
		}

		return next( responseJson );
	};

	xhr.ontimeout = function() {
		return next( this.response );
	};

	xhr.onerror = function() {
		let messageTmp = this.statusText
		if( messageTmp.length === 0){
			messageTmp = 'No network connection.';
		}
		return next({ status : this.status, message : messageTmp  });
	};
	
}



let secureKey = '';
function set_SecureKey( input ){
	if(input.length <= 5){
		secureKey = '';
		return;
	}
	secureKey = input;
}
function get_SecureKey(){
	return secureKey;
}

function get_SecureKeyFile() {
	let item = window.localStorage.getItem('tokenStringKube');
	set_SecureKey( item );
}

function request_url_form(form, next){
	form.preventDefault();
	let actionURL = form.target.action;
	let methodOpts = form.target.method;
	let formData = new FormData(form.target);
	
	getURL(actionURL, methodOpts, false, formData, function( error, result ){
		if(error){
			return next(error);
		}
		return next(null, result);
	});
}

function request_url(opts, next){
	let body = {};
	let isJSON = opts.JSON || false;

	if(opts.body !== undefined && isJSON ){
		body = JSON.stringify(opts.body);
	}

	// if(opts.content !== undefined && isJSON ){
	// 	body = JSON.stringify(opts.content);
	// }

	getURL(opts.url, opts.method, isJSON, body, function( error, result ){
		if(error){
			return next(error);
		}
		return next(null, result);
	});
}

let request_obj = { request_url, request_url_form, set_SecureKey, get_SecureKey, get_SecureKeyFile };

export default {
	install: function(Vue) {
		Vue.prototype.$request = request_obj;
	}
}


// function fakeSet(){
// 	set_SecureKey('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmUzNzNkYTc4ZTkwNDNkODkwYTQ2YTQiLCJuYW1lIjoibmV3TmFtZSIsImVtYWlsIjoibmV3c21hbGxlcmVtYWlsQGVtYWlsLmNvbSIsImxvZ2luIjoiMjAxOC0xMi0xNFQxNToxNDowMS4yNzBaIiwiYWN0aXZlIjp0cnVlLCJpYXQiOjE1NDQ4MDA0NDEsImV4cCI6MTU0NTQwNTI0MX0.bObGNqSRKNFbwJWj4DbOEmJZ_tXtsT1n-27azK4jjo8')
// }
// fakeSet();



