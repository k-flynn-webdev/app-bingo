<template>

	<div id="app">

		<c-navbar>

			<template>
				<router-link 
					class="link title colour-on-focus colour-bg colour-fill-bg-inv" 
					to="/">
						Home
				</router-link>
			</template>

			<router-link 
				class="link title colour-on-focus colour-bg colour-fill-bg-inv" 
				to="/board/create">
					Create
			</router-link>

			<template v-slot:active>
				<router-link 
					class="link title colour-on-focus colour-bg colour-fill-bg-inv" 
					to="/logout">
						Logout
				</router-link>
				<router-link 
					class="link title colour-on-focus colour-bg colour-fill-bg-inv" 
					to="/account">
						Account
				</router-link>
				<router-link 
					class="link title user colour-on-focus colour-bg colour-fill-bg-inv"
					to="/admin/request">
						AdminRequest
				</router-link>
				<router-link 
					class="link title admin colour-on-focus colour-bg colour-fill-bg-inv" 
					to="/admin">
						AdminBoard
				</router-link>
			</template>

			<template v-slot:none-active>	
				<router-link 
					class="link title colour-on-focus colour-bg colour-fill-bg-inv" 
					to="/login">
						Login
				</router-link>
			</template>

		</c-navbar>

		<div class="body-nav-spacer"></div>

		<router-view/>

		<div class="body-nav-spacer"></div>

		<c-footer></c-footer>

	</div>

</template>

<script>

// adding global style ..
require('@/assets/style/default.css');
require('@/assets/style/colour.css');
require('@/assets/style/text.css');
require('@/assets/style/anim.css');
require('@/assets/style/custom.css');

import cNavBar from './components/c_navbar.vue';
import cFooter from './components/c_app_footer.vue';


export default {
	name: 'App', 
	created(){
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
