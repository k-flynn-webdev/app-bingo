<template>

	<div class="panel center-auto-h">

		<header class="">

			<p class="header colour-fill-bg-inv text-funky custom"> 
				<slot name="header" ></slot>
			</p>

			<div class="options flex-row flex-row-end width-901 center-auto-h">
				<slot name="options"></slot>
			</div>

		</header>

		<div class="width-901 center-auto-h">

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

