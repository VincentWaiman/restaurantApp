import { defineStore } from "pinia";
import axios from "axios";

export const useOrderStore = defineStore({
	id: "order",
	state: () => ({
		orders: [],
		error: null,
	}),
	actions: {
		async fetchOrders() {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/v1/orders"
				);
				this.orders = response.data.orders;
			} catch (error) {
				this.error =
					error.response.data.error || "Failed to fetch orders";
				console.error("Error fetching orders:", this.error);
				throw error;
			}
		},
	},
});
