

export default {
	namespaced: true,
	state: {
		player : {
			id : String,
			name : String,
		}
	},
	getters: {
		get_id : function( state ){
			return state.player.id;
		},		
		get_name : function( state ){
			return state.player.name;
		},					
	},
	mutations: {
		// to be fired ideally from actions here
		id : function( state, input ){
			state.player.id = input;
		},		
		name : function( state, input ){
			state.player.name = input;
		},		
	},
	actions: {

		set_player : function( context, input ){
			context.commit('id', input.id );
			context.commit('name', input.name );
		},
		remove_player : function( context ){
			context.commit('id', '' );
			context.commit('name', '' );
		},

	}
};







