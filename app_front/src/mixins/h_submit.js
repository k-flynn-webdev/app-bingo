export const submit = {
	methods : {
		onSubmit : function( object, self, btn, msg, onSuccess, onError){
	
			let hasMsg = (msg !== null && msg !== undefined ) ? true : false;
			let hasBtn = (btn !== null && btn !== undefined ) ? true : false;

			if( hasBtn ){	
				btn.$emit('state', 'waiting');
			}		

			self.$request.request_url( object, function(error, result){

				if( hasBtn ){	
					btn.$emit('state', 'reset');
				}

				if( error ){
					if( hasBtn ){
						btn.$emit('state', 'error');
					}
					if( hasMsg ){
						msg.$emit('message', { class : 'error text-negative', message : error.message });
					}
					return onError( error );
				}

				// Success section
				if( hasBtn ){
					btn.$emit('state', 'success');
				}
				if( hasMsg ){
					msg.$emit('message', { class : 'success text-positive', message : result.message });
				}
				return onSuccess( result );
			});
		},
	},
}