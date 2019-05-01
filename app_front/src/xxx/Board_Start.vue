<template>

	<c-panel>

		<div slot="header">
			<p class="title"> Play Bingo!</p>
		</div>

		<div slot="options">
		</div>

		<div 
			slot=no-margin 
			class="bingo-board">

			<c-message ref="messageSrv"></c-message>

			<transition 
				name="load" 
				mode="out-in">

				<div 
					class="load-icon">
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
				</div>

			</transition>					

		</div>				

	</c-panel>

</template>

<script>

	import Button from '../components/c_buttonNew.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';
	import Word from '../components/c_word.vue';

	let counter = null;
	let serverPing = null;

	export default {
		name: 'BoardStart',
		data(){
			return {
			}
		},	
		computed : {
		},	
		methods:{
			init_board : function(){
				let self = this;
				self.$refs.messageSrv.$emit('message', { class : 'success text-positive', message : 'Looking for bingo in progress.' });
				setTimeout( function(){
					self.get_online_boards();
				},2000);
			},
			get_online_boards : function(){

				let self = this;
				self.$refs.messageSrv.$emit('message', { class : 'success text-positive', message : 'Looking for bingo in progress.' });

				let boardID = this.$route.params.board;
				let tempURL = '/api/board/' + boardID.toLowerCase();

				let object = { 
					url : tempURL, 
					method : 'GET', 
					body : '' 
				};

				this.$request.request_url( object, function(error, result){
					
					if( error ){
						self.$refs.messageSrv.$emit('message', { class : 'error text-negative', message : error.message });
						return;
					}

					self.$refs.messageSrv.$emit('message', { class : 'success text-positive', message : 'bingo time!' });

					setTimeout( function(){
						self.$router.push( result.data.url );
					}, 2000);
				});

			},			
		},
		mounted() {
			let self = this;
			setTimeout( function(){
				self.init_board();
			},1000);
		},
		beforeDestroy(){
		},		
		components: {
			'c-button' : Button,
			'c-panel' : Panel,
			'c-message' : Message,
			'c-word' : Word,
		},		
}
</script>

<style>

.load-icon {
	margin: 0 auto;
	width: 40vw;
	height: 40vw;
}
.load-icon-el {
	opacity: 0;
	transform: scale(0.25);
	width: 25%;
	height: 25%;
	margin: 3%;
	background-color: hsl(100,33%,70%);
	display: inline-block;
	animation: load-anim-in-out 1s infinite ease-in-out;
}


@keyframes load-anim-in-out {
	0% {
		transform: scale(0.66);
		opacity: 0.5;
	}
	50% {
		transform: scale(1);
		opacity: 1;
	}	
	100% {
		transform: scale(0.66);
		opacity: 0.5;
	}
}



.load-enter-active, .load-leave-active {
  transition: opacity 1s;
}
.load-enter, .load-leave-to /* .load-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.bingo-board {
	margin-top: -3rem;
	transition: 0.5s;
}
.bingo-board.is-lost {
	background-color: hsla(1,90%,60%,0.66);
}
.bingo-board.is-almost {
	background-color: hsla(100,90%,75%,0.2);
}
.bingo-board.is-won {
	background-color: hsla(100,90%,75%,0.66);
}

.timer {
	position: absolute;
	right:0;
	top: 0;
	bottom:0;
	/*height: 100%;*/
	text-align: right;
	padding: 0.5rem 1rem;
	background-color: hsl(1,1%,10%);
}

.score {
	position: absolute;
	left:0;
	top: 0;
	bottom:0;
	/*height: 100%;*/
	text-align: left;
	padding: 0.5rem 1rem;
	background-color: hsl(1,1%,10%);
}

</style>

