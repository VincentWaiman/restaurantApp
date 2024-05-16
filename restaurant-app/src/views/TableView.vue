<template>
	<div class="table m-4">
		<div class="container m-2 p-2">
			<h3>Tables</h3>
			<div class="row">
				<div v-for="i in 20" :key="i" class="col-md-3">
					<div
						:class="{
							'box rounded text-white bg-danger': isTableOpen(i),
							'box rounded bg-secondary': !isTableOpen(i),
						}"
					>
						{{ i }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useOrderStore } from "@/store/orderStore";

export default {
	setup() {
		const orderStore = useOrderStore();

		orderStore.fetchOrders();

		const tableStatuses = {};

		orderStore.orders.forEach((order) => {
			tableStatuses[order.table_number] = order.status;
		});

		const isTableOpen = (tableNumber) => {
			return tableStatuses[tableNumber] === "open";
		};

		return {
			isTableOpen,
		};
	},
};
</script>

<style>
.box {
	width: 200px;
	height: 200px;
	background-color: white;
	box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
	margin: 3px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
}
</style>
