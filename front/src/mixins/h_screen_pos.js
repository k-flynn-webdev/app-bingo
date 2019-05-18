export const screenPos = {
	methods : {
		get_screen_pos : function( element ){

			let position = element.getClientRects();

			if( position[0] === undefined ){
				return false;
			}

			let topLeft = { 
				top : position[0].top, 
				left : position[0].left,
				width : position[0].width,
				height : position[0].height,
			};

			if( position[0].left === undefined ){
				topLeft.top = position[0].y;
				topLeft.left = position[0].x;
			}

			return topLeft;

		},
	},
}