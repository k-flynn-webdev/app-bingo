

// need to think about validation and simplify!


// need a simple import core funcs
// send test and element and message off to be auto checked:
// 	element auto pass/failed
// 	message alerted if a problem
// 	return test result.


// places this will be used:
// 	- creation : 
// 		- title/name
// 		- per words/phrases
// 	- join lobby	
// 	- join game name
// 	- update game name



let attrs = {
	default_min : 3,
	default_max : 30,
}

let class_base = 'field-result';
let class_fail = 'fail';
let class_success = 'pass';


// if an element exists, edit its classes directly.
// if a model exists edit that also ..
// return the result of the test ..


let set_class = function( field_parent, classes ){
	if( field_parent !== undefined ){
		
		if( field_parent.className !== undefined ){
				field_parent.className = classes;
		}
		
		if( field_parent.$el !== undefined ){
				field_parent.$el.className = classes;
		}
		
	}
}

let set_success = function( field_parent ){
	set_class( field_parent, class_base + ' ' + class_success );
}

let set_fail = function( field_parent ){
	set_class( field_parent, class_base + ' ' + class_fail );
}

let set_message = function( field_message, message_to_send ){
	if( field_message !== undefined &&
		field_message !== null &&
		message_to_send !== undefined &&
		message_to_send !== null ){
			field_message.$emit( 'message', message_to_send );
	}
}





let validate_reset = function( field_parent, field_input ){

	set_class( field_parent, class_base );

	if( field_input !== undefined &&
		typeof field_input === 'string' ){
			field_input = '';
	}

	if( field_input !== undefined &&
		typeof field_input === 'number' ){
			field_input = 0;
	}
}




let validate_length = function( field_parent, field_input, field_message, min=attrs.default_min, max=attrs.default_max ){

	validate_reset( field_parent );

	if( field_input !== undefined ){

		if( field_input.length === 0 ){
			return null;
		}

		let lower = field_input.length < min;
		let greater = field_input.length > max;

		if( lower ){
			set_message( field_message, { class : 'error', message : 'is less than ' + min + ' characters.' } );
		}

		if( greater ){
			set_message( field_message, { class : 'error', message : 'is more than ' + max + ' characters.' } );
		}

		if( lower || greater ){

			set_fail( field_parent );

			return false;

		} else {

			set_success( field_parent );
			return true;

		}
	}
}

let validate_email = function( field_parent, field_input, field_message, min=attrs.default_min, max=attrs.default_max ){

	validate_reset( field_parent );

	let length_result = validate_length( field_parent, field_input, field_message, min, max );

	if( length_result ){
			
		has_at = field_input.indexOf('@');
		has_stop = field_input.indexOf('.');

		if( has_at > 0 && 
			has_at < field_input.length ){
				set_message( field_message, { class : 'error', message : 'not an email address.' } );
				set_fail( field_parent );
				return false;
		}

		if( has_stop > 0 && 
			has_stop < field_input.length ){
				set_message( field_message, { class : 'error', message : 'not an email address.' } );
				set_fail( field_parent );
				return false;
		}

		set_success( field_parent );
		return true;

	} else {
		return length_result;
	}
}



// let validate_length = function( input, min=attrs.default_min, max=attrs.default_max ){
// 	if( input.length === 0 ){
// 		return null;
// 	}
// 	if( input.length < min || input.length > max ){
// 		return false;
// 	}
// 	return true;
// }


// let validate_email = function( input ){
// 	if( input.length === 0 ){
// 		return null;
// 	}
// 	if( input.indexOf('@') < 0 ){
// 		return false;
// 	}
// 	if( input.indexOf('.') < 0 || input.endsWith('.') ){
// 		return false;
// 	}
// 	return true;
// }


export default {
	reset : validate_reset,
	length : validate_length,
	email : validate_email,
}
