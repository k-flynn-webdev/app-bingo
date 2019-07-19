

function randomID( length ){
	let temp = '';
	for( let i=0;i < length; i++){
		temp = temp + random();
	}

	function random(){
		if( Math.random() < 0.5 ){
			return letter();
		}
		return number();
	}

	function letter(){
		let alphas = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		let rand = Math.random();
		let letter = alphas[Math.floor(rand * 25) + 1 ];
		if( letter === undefined ){
			console.log('problem with randomID letter: ' + rand);
		}
		return letter; 
	}

	function number(){
		let rand = Math.random();
		let value = Math.floor(rand * 9) + 1;
		if( value === undefined ){
			console.log('problem with randomID number: ' + rand);
		}
		return value; 
	}

	return temp;
}

export default {
	id : randomID,
}

