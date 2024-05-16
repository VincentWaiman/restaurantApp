import { defineStore } from "pinia";
import axios from "axios";

export const useMenuStore = defineStore({
	id: "menu",
	state: () => ({
		menuItems: [],
	}),
	actions: {
		async fetchMenuItems() {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/v1/foodnbaverages"
				);

				if (response && response.data.foods) {
					this.menuItems = response.data.foods;
				} else {
					throw new Error("Failed to fetch data");
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		},
	},
});
