<template>



	<div class="admin panel width-90 center-auto-h shadow order" style="flex-grow:3 !important;">
		<header>
			
			<p class="title text-uppercase text-small"> 
				<span class="text-uppercase"> Users ({{ graph_length }} days) </span>
			</p>

		</header>
		<div style="margin:0 !important;padding:0 !important;height: 150px !important;">
			<canvas id="id-chart" ></canvas>	
		</div>

	</div>


		
</template>

<script>

	import Chart from 'chart.js';
	import Button from '../components/c_button.vue';
	import Panel from '../components/c_panel.vue';

	export default {
		name: 'cAdminUserGraph',
		data(){
			return {
				graph_length : 30,
				chartData : {
					type : 'bar',
					data : {
						labels : [],
						datasets : [
						{ label : 'new',
							data : [],
							backgroundColor : [],},
						{ label : 'login',
							data : [],
							backgroundColor : [],},
						{ label : 'updated',
							data : [],
							backgroundColor : [],},		
						],
					},
					options: { responsive: true, maintainAspectRatio: false },
				},
			}
		},
		created(){
		},	
		mounted(){
			this.$root.$on('admin-month-data', this.draw_graph );
			this.default_graph_setup();
		},		
		computed : {
		},
		methods:{	
			draw_graph : function( input ){
				let self = this;
				setTimeout(function(){
					self.convert_users_to_days( input );
					self.createChart('id-chart', self.chartData);
				}, 2000 );
			},
			date_to_int : function( input ){
				let day_seconds = 86400000;
				let date_from = Math.ceil( (new Date( input ).getTime()) / day_seconds);
				let today_int = Math.ceil( (new Date().getTime()) / day_seconds);
				let day_int = today_int - date_from;
				return day_int;
			},
			default_graph_setup : function(){
				this.chartData.data.datasets = [
					{ label:'new',data:[],backgroundColor:[],},
						{ label:'login',data:[],backgroundColor:[],}, { label:'updated',data:[],backgroundColor:[],}];
						
				for (let count=0;count<this.graph_length;count++){
					if( count % 3 ){
						this.chartData.data.labels.push( '.' );	
					} else {
						this.chartData.data.labels.push( count );
					}
				}
				for (let count=0;count<this.graph_length;count++){
					this.chartData.data.datasets[0].backgroundColor.push( 'rgba(200, 10, 10, .4)');
					this.chartData.data.datasets[1].backgroundColor.push( 'rgba(10, 200, 10, .4)');
					this.chartData.data.datasets[2].backgroundColor.push( 'rgba(10, 10, 200, .4)');
				}
			},
			convert_users_to_days : function( data ){
				let user_count_new = [];
				let user_count_login = [];
				let user_count_updated = [];

				for (let count=0;count<this.graph_length;count++){
					user_count_new.push(0);
					user_count_login.push(0);
					user_count_updated.push(0);
				}

				for (let count=0;count<data.new.length;count++){
					let created = this.date_to_int( data.new[count].date.created );
					if( created <= this.graph_length ){
						user_count_new[ created ] += 1;
					}									
				}

				for (let count=0;count<data.login.length;count++){
					let login = this.date_to_int( data.login[count].date.login );
					if( login <= this.graph_length ){
						user_count_login[ login ] += 1;
					}									
				}

				for (let count=0;count<data.updated.length;count++){
					let updated = this.date_to_int( data.updated[count].date.updated );
					if( updated <= this.graph_length ){
						user_count_updated[ updated ] += 1;
					}									
				}

				this.chartData.data.datasets[0].data = user_count_new;
				this.chartData.data.datasets[1].data = user_count_login;
				this.chartData.data.datasets[2].data = user_count_updated;
			},
			createChart : function(chartId, chartData) {
				const ctx = document.getElementById(chartId);
				const myChart = new Chart(ctx, {
					type: chartData.type,
					data: chartData.data,
					options: chartData.options,
				});
			}		
		},
		components: {
			'c-button' : Button,
			'c-panel' : Panel,
		},	
}
</script>

<style scoped>

.order {
	order: 10;
}

</style>
