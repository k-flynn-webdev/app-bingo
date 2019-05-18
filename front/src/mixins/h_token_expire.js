export const tokenExpire = {
	methods : {
		expired_token_check : function( input ){
			if( input.status === 401 && input.message === 'jwt expired' ){
				let self = this;
				setTimeout( function(){
					self.$router.push('/login');
				},2000);
				return true;
			}
			return false;
		},
	},
}