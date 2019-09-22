<template>

	<div id="app">

		<c-navbar>

			<!-- // todo change all links to buttons and add aria-label //  -->

			<router-link 
				class="link colour-bg-pop border-round delay-2" 
				to="/board/create">
						<p class="colour-fill-dark header text-link"> 
							Create
						</p>
			</router-link>

			<template v-slot:active>
				<router-link 
					class="link colour-bg-pop border-round delay-2" 
					to="/logout">
						<p class="colour-fill-dark header text-link"> 
							Logout
						</p>
				</router-link>
				<router-link 
					class="link colour-bg-pop border-round delay-2" 
					to="/account">
						<p class="colour-fill-dark header text-link"> 
							Account
						</p>
				</router-link>
				<router-link 
					class="link colour-bg-pop border-round delay-2"					
					to="/admin/request">
						<p class="colour-fill-dark header text-link"> 
							AdminRequest
						</p>
				</router-link>
				<router-link 
					class="link colour-bg-pop border-round delay-2"	
					to="/admin">
						<p class="colour-fill-dark header text-link"> 
							AdminBoard
						</p>
				</router-link>

				<router-link 
					class="link title colour-on-focus" 
					to="/cron/instance/">
						Cron Clean
				</router-link>

				<router-link 
					class="link title colour-on-focus" 
					to="/meta/instance/all">
						Games
				</router-link>


			</template>

			<template v-slot:none-active>
				<router-link
					class="link colour-bg-pop border-round delay-2"	
					to="/login">
						<p class="colour-fill-dark header text-link"> 
							Login
						</p>
				</router-link>
			</template>

		</c-navbar>

		<router-view/>

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


const cNavBar = () => import('./components/c_navbar.vue');
const cFooter = () => import('./components/c_app_footer.vue');

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
