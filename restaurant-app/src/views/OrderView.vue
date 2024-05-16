<template>
	<div class="order m-4">
		<div class="container m-2 p-2">
			<h3>Orders</h3>
			<div class="d-md-flex justify-content-md-end">
				<button class="btn btn-success rounded-pill" @click="callModal">
					+ Add Order
				</button>
			</div>
			<table class="content-table">
				<thead>
					<tr>
						<th scope="col">Table Number</th>
						<th scope="col">List of Orders</th>
						<th scope="col">Status</th>
						<th scope="col">Options</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(order, index) in orderss"
						:key="index"
						:class="{ 'active-row': order.status === 'open' }"
					>
						<td>{{ order.table_number }}</td>
						<td>
							<span v-if="order.items.length === 0"
								>See Details</span
							>
							<button
								class="btn btn-sm btn-outline-warning rounded-pill"
								v-else
								@click="showDetails(order.items)"
							>
								See Details
							</button>
						</td>
						<td>{{ order.status }}</td>
						<td class="d-flex">
							<button
								v-if="order.status === 'open'"
								class="btn btn-warning me-2 rounded-pill"
								@click="editOrder(index)"
							>
								Edit
							</button>
							<button
								v-if="order.status === 'open'"
								class="btn btn-primary me-2 rounded-pill"
								@click="markAsInvoiced(order)"
							>
								Invoiced
							</button>
							<button
								v-else
								class="btn btn-secondary me-2 rounded-pill"
								disabled
							>
								Edit
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- Ini modal untuk yang Add New Order -->
		<Modal v-if="isShowModal" :title="'Add New Order'" @close="close">
			<template #body>
				<div class="modal-body">
					<label for="currentOrderTable" class="fw-semibold mb-2"
						>Table Number:</label
					>
					<select v-model="currentOrderTable" class="form-select">
						<option
							v-for="option in tableNumberOptions"
							:key="option"
							:value="option"
							:disabled="isDisabled(option)"
							:style="{ color: getStatusColor(option) }"
						>
							{{ option }}
						</option>
					</select>
					<div v-for="(form, index) in orderForms" :key="index">
						<div class="form-group"></div>
						<div class="form-group menu-qty d-flex gap-3">
							<div class="menu-group">
								<label for="menu" class="fw-semibold mb-2"
									>Menu:</label
								>
								<select
									v-model="form.item_id"
									class="form-select"
									style="border-color: orange; width: 400px"
								>
									<option
										v-for="menuItem in menuItems"
										:key="menuItem.id"
										:value="menuItem.id"
									>
										{{ menuItem.name }}
									</option>
								</select>
							</div>
							<div class="qty-group">
								<label for="qty" class="fw-semibold mb-2"
									>Qty:</label
								>
								<input
									v-model="form.quantity"
									type="number"
									class="form-control"
									style="border-color: orange"
								/>
							</div>
						</div>
					</div>
					<div class="d-flex justify-content-end">
						<button
							class="btn btn-sm btn-primary rounded-pill mt-2"
							@click="addNewForm"
						>
							+ Add
						</button>
					</div>
				</div>
			</template>
			<template #footer>
				<button
					class="btn bg-secondary bg-opacity-50 rounded-pill px-4"
					@click="close"
				>
					Cancel
				</button>
				<button
					class="btn btn-success rounded-pill px-4"
					@click="saveOrder"
				>
					Save Order
				</button>
			</template>
		</Modal>

		<!-- Ini Modal untuk yang Edit Order -->
		<Modal
			v-if="isShowEditModal"
			:title="'Edit Order'"
			@close="closeEditModal"
		>
			<template #body>
				<div class="modal-body">
					<div
						class="form-group mt-3"
						v-for="(item, index) in editedOrder.items"
						:key="index"
					>
						<label class="fw-semibold">Menu:</label>
						<select
							v-model="item.item_id"
							class="form-select"
							style="border-color: orange; width: 400px"
						>
							<option
								v-for="menuItem in menuItems"
								:key="menuItem.id"
								:value="menuItem.id"
							>
								{{ menuItem.name }}
							</option>
						</select>
						<label class="fw-semibold">Qty:</label>
						<input
							v-model="item.quantity"
							type="number"
							class="form-control"
							style="border-color: orange; width: 80px"
						/>
					</div>
					<div class="d-flex justify-content-end">
						<button
							class="btn btn-sm btn-primary rounded-pill mt-2"
							@click="addNewFormInEdit"
						>
							+ Add
						</button>
					</div>
				</div>
			</template>
			<template #footer>
				<button
					class="btn bg-secondary bg-opacity-50 rounded-pill px-4"
					@click="closeEditModal"
				>
					Cancel
				</button>
				<button
					class="btn btn-success rounded-pill px-4"
					@click="saveEditedOrder"
				>
					Save Changes
				</button>
			</template>
		</Modal>

		<!-- Ini modal untuk yang List of Orders/Order Details -->
		<Modal
			v-if="isShowDetailsModal"
			:title="'Order Details'"
			@close="closeDetailsModal"
		>
			<template #body>
				<div class="modal-body">
					<ul
						v-for="(detail, index) in currentOrderDetails"
						:key="index"
					>
						<li>
							{{ mapItemIdToName(detail.item_id) }} -
							{{ detail.quantity }}
						</li>
					</ul>
				</div>
			</template>
			<template #footer>
				<button
					class="btn bg-secondary bg-opacity-50 rounded-pill px-4"
					@click="closeDetailsModal"
				>
					Close
				</button>
			</template>
		</Modal>
	</div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { useOrderStore } from "@/store/orderStore";
import { useMenuStore } from "@/store/menuStore";
import axios from "axios";

export default {
	data() {
		return {
			orderss: [],
			menuItems: [],
			isShowModal: false,
			newOrderForms: {
				table_number: null,
				status: "open",
				items: [],
			},
			orderForms: [],
			isShowDetailsModal: false,
			currentOrderTable: null,
			currentOrderDetails: [],
			isShowEditModal: false,
			newEditedOrder: {
				items: [],
			},
			editedOrder: {
				item_id: "",
				quantity: "",
			},
			newMenuItem: {
				item_id: "",
				quantity: "",
			},
			tableNumberOptions: [
				1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
				19, 20,
			],
		};
	},

	async created() {
		try {
			const orderStore = useOrderStore();
			await orderStore.fetchOrders();

			this.orderss = orderStore.orders;
		} catch (error) {
			console.log("Error fetching data: ", error);
		}

		try {
			const menuStore = useMenuStore();
			await menuStore.fetchMenuItems();

			this.menuItems = menuStore.menuItems;

			if (this.menuItems.length > 0) {
				this.editedMenuItem = { ...this.menuItems[0] };
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	},
	components: {
		Modal,
	},
	methods: {
		isDisabled(tableNumber) {
			const order = this.orderss.find(
				(order) =>
					order.table_number === tableNumber &&
					order.status === "open"
			);
			return order;
		},
		getStatusColor(tableNumber) {
			const order = this.orderss.find(
				(order) =>
					order.table_number === tableNumber &&
					order.status === "open"
			);
			return order ? "red" : "grey";
		},

		mapItemIdToName(itemId) {
			const menuItem = this.menuItems.find((item) => item.id === itemId);
			return menuItem ? menuItem.name : "Unknown Item";
		},
		close() {
			this.isShowModal = false;
			this.orderForms = [
				{
					item_id: "",
					quantity: "",
				},
			];
		},
		callModal() {
			this.isShowModal = true;
		},
		async markAsInvoiced(order) {
			try {
				const response = await axios.put(
					`http://localhost:5000/api/v1/orders/${order.table_number}/status`,
					{
						status: "invoiced",
					}
				);

				if (response.status === 200) {
					order.status = "invoiced";
					console.log("Order status updated successfully!");
				} else {
					console.error("Failed to update order status");
				}
			} catch (error) {
				console.error("Error updating order status:", error);
			}
		},

		async saveOrder() {
			this.newOrderForms.table_number = this.currentOrderTable;
			this.newOrderForms.items = this.orderForms.map((form) => ({
				item_id: form.item_id,
				quantity: form.quantity,
			}));

			try {
				const response = await axios.post(
					"http://localhost:5000/api/v1/orders",
					this.newOrderForms
				);

				console.log("Response from API:", response.data);
			} catch (error) {
				console.error("Error sending data:", error);
			}

			this.close();
			this.currentOrderTable = null;
			window.location.reload();
		},
		addNewForm() {
			const newForm = {
				item_id: "",
				quantity: "",
			};
			this.orderForms.push(newForm);
		},

		showDetails(orderDetails) {
			this.currentOrderDetails = orderDetails;
			this.isShowDetailsModal = true;
		},
		closeDetailsModal() {
			this.isShowDetailsModal = false;
		},
		closeEditModal() {
			this.isShowEditModal = false;
			this.currentOrderTable = null;
		},
		editOrder(index) {
			if (this.orderss && this.orderss.length > index && index >= 0) {
				this.editedOrder = { ...this.orderss[index] };
				if (this.orderss[index] && this.orderss[index].items) {
					this.currentOrderDetails = this.orderss[index].items;
				} else {
					this.currentOrderDetails = null;
				}
				this.currentOrderTable = this.orderss[index].table_number;
				this.isShowEditModal = true;
			} else {
				console.error("Invalid index or orders array.");
			}
		},
		EditModal() {
			this.isShowEditModal = false;
			this.editedOrder = {};
		},
		// isRed(tableNumber) {
		//   const tableOrder = this.orders.find(order => order.tableNumber === tableNumber);
		//   return tableOrder && tableOrder.status === 'Open';
		// },
		addNewFormInEdit() {
			const newForm = {
				item_id: "",
				quantity: "",
			};
			this.editedOrder.items.push(newForm);
		},
		async saveEditedOrder() {
			// Validate and process the edited order details as needed

			try {
				const response = await axios.put(
					`http://localhost:5000/api/v1/orders/${this.currentOrderTable}`,
					{
						items: this.editedOrder.items,
					}
				);

				console.log("Response from API:", response.data);
			} catch (error) {
				console.error("Error sending data:", error);
			}

			this.closeEditModal();
		},
		mounted() {
			this.fetchMenuItems();
		},
	},
};
</script>

<style scoped>
.content-table {
	border-collapse: collapse;
	margin: 25px 0;
	width: 100%;
	border-radius: 5px 5px 0 0;
	overflow: hidden;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.content-table thead tr {
	background-color: #ff8a00;
	color: #ffffff;
	text-align: left;
	font-weight: bold;
}

.content-table th,
.content-table td {
	padding: 12px 15px;
}

.content-table tbody tr {
	border-bottom: 1px solid #dddddd;
}

.content-table tbody tr:nth-of-type(even) {
	background-color: #f3f3f3;
}

.content-table tbody tr:last-of-type {
	border-bottom: 2px solid #ff8a00;
}

.content-table tbody tr.active-row {
	font-weight: bold;
	color: #ff8a00;
}
</style>
