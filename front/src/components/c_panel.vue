<template>

	<div class="panel width-90 center-auto-h colour-text-dark">
		<header class="">

			<p class="text-uppercase1 header text-funky custom"> 
				<slot name="header" ></slot>
			</p>

			<div class="options flex-row flex-row-end header-shadow">
				<slot name="options"></slot>
			</div>

		</header>

		<main class="text">	
			<slot></slot>
		</main>

		<slot name="no-margin" class="main"></slot>

		<footer class="footer">
			<p class="text"> 
				<slot name="footer"></slot>
			</p>
		</footer>
	</div>

</template>

<script>

	require('@/assets/style/panel.css');

	export default {
		name: 'cPanel',
	}

</script>

<style>
</style>

