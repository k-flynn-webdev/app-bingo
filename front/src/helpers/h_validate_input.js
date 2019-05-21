
let attrs = {
	default_min : 3,
	default_max : 30,
}

let validate_length = function( input, min=attrs.default_min, max=attrs.default_max ){
	if( input.length === 0 ){
		return null;
	}
	if( input.length < min || input.length > max ){
		return false;
	}
	return true;
}


let validate_email = function( input ){
	if( input.length === 0 ){
		return null;
	}
	if( input.indexOf('@') < 0 ){
		return false;
	}
	if( input.indexOf('.') < 0 || input.endsWith('.') ){
		return false;
	}
	return true;
}


export default {
	length : validate_length,
	email : validate_email,
}
