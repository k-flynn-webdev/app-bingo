
export default {
	namespaced: true,
	state: {
		action : {
			url : '',
			method : 'GET',
			JSON : false,
		},
		url : '',
		data : {
			name : '',
			words : [],
			game : {
				display : 0,
				win : 0,
			},
		}
	},
	getters: {

		get_action : function( state ){
			return state.action.url;
		},
		get_board : function( state ){
			return state;
		},
		get_words : function( state ){
			return state.data.words;
		},
		get_display : function( state ){
			return state.data.game.display;
		},
	},
	mutations: {

		action : function( state, input ){
			state.action.url = input;
		},
		board : function( state, input ){
			if( input.url !== undefined ){
				state.url = input.url;
			}
			if( input.data !== undefined ){
				state.data.name = input.data.name;
				state.data.words = input.data.words;
				state.data.game = input.data.game;
			}
		},	

	},
	actions: {

		set_action : function( context, input ){
			context.commit('action', input );
		},
		set_board : function( context, input ){
			context.commit('board', input );
		},
		exit : function( context ){
			context.commit('board', basic );
		},

		// set_board : function( context, input ){
		// 	context.commit('board', input );
		// },
		// set_player : function( context, input ){
		// 	context.commit('player', input );
		// },		

		// set_words : function( context, input ){
		// 	context.commit('words', input );
		// 	context.commit('score', input.length );
		// },	
		
		// word_add : function( context, input ){
		// 	let temp = context.getters.get_words;
		// 	let index = word_index( input.word.add, temp);
		// 	if( index < 0 ){
		// 		temp.push( input.word.add );
		// 	}
		// 	context.commit('words', temp );
		// 	context.commit('score', input.score );
		// },		
		// word_remove : function( context, input ){
		// 	let temp = context.getters.get_words;
		// 	let index = word_index( input.word.remove, temp);
		// 	if( index >= 0 ){
		// 		temp.splice( index, 1 );
		// 	}
		// 	context.commit('words', temp );
		// 	context.commit('score', input.score );
		// },




		// score_add : function( context ){
		// 	let temp = context.getters.get_score + 1;
		// 	context.commit('score', temp );
		// },		
		// score_remove : function( context ){
		// 	let temp = context.getters.get_score - 1;
		// 	context.commit('score', temp );
		// },	

		// reset_player : function( context ){
		// 	let self= this;
		// 	setTimeout( function(){
		// 		context.commit('words', [] );
		// 		context.commit('score', 0 );
		// 	},100);
		// },		


			
	}
};

let basic = {
	url : '',
	data : {
		name : '',
		words : [],
		game : {
			win : 0,
			display : 0,
		},
	}
}
