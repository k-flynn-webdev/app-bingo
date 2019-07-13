<template>

	<div id="app">

		<c-navbar>

			<router-link 
				class="link colour-fill-pop colour-bg-pop border-round" 
				to="/board/create">
						<p class="colour-fill-dark poster link"> 
							Create
						</p>
			</router-link>

			<template v-slot:active>
				<router-link 
					class="link colour-fill-pop colour-bg-pop border-round" 
					to="/logout">
						<p class="colour-fill-dark poster link"> 
							Logout
						</p>
				</router-link>
				<router-link 
					class="link colour-fill-pop colour-bg-pop border-round" 
					to="/account">
						<p class="colour-fill-dark poster link"> 
							Account
						</p>
				</router-link>
				<router-link 
					class="link colour-fill-pop colour-bg-pop border-round"					
					to="/admin/request">
						<p class="colour-fill-dark poster link"> 
							AdminRequest
						</p>
				</router-link>
				<router-link 
					class="link colour-fill-pop colour-bg-pop border-round"	
					to="/admin">
						<p class="colour-fill-dark poster link"> 
							AdminBoard
						</p>
				</router-link>
			</template>

			<template v-slot:none-active>	
				<router-link 
					class="link colour-fill-pop colour-bg-pop border-round"	
					to="/login">
						<p class="colour-fill-dark poster link"> 
							Login
						</p>
				</router-link>
			</template>

		</c-navbar>

		<router-view/>

		<div class="body-spacer"></div>

		<c-footer></c-footer>

	</div>

</template>

<script>

// adding global style ..
require('@/assets/style/reset.css');
require('@/assets/style/default.css');
require('@/assets/style/colour.css');
require('@/assets/style/text.css');
require('@/assets/style/anim.css');
// require('@/assets/style/custom.css');

import cNavBar from './components/c_navbar.vue';
import cFooter from './components/c_app_footer.vue';


export default {
	name: 'App', 
	created(){
		document.title = process.env.VUE_APP_NAME;
		this.$store.dispatch('user/init', this.$request.get_SecureKeyFile );
	},
	computed : {		
	},	
	methods : {
	},
	components: {
		'c-navbar' : cNavBar,
		'c-footer' : cFooter,
	},
}

</script>


<style>
</style>
