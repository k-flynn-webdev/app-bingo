<template>

	<div class="panel-parent">

		<div class="panel center-auto-h colour-bg-pop border-round width-95">

			<header class="">

				<p class="header"> 
					<slot name="header" ></slot>
				</p>

				<div class="options flex-row flex-row-end center-auto-h">
					<slot name="options"></slot>
				</div>

			</header>

			<div class="center-auto-h">

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

