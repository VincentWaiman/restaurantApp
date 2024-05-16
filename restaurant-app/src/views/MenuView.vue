<template>
	<div class="menu m-4">
		<div class="container m-2 p-2">
			<div class="row align-items-center">
				<div class="col-md-6">
					<h3>Menu</h3>
				</div>
				<div class="col-md-6 d-flex justify-content-md-end">
					<button
						class="btn btn-success rounded-pill"
						@click="callModal(null)"
					>
						+ Add Menu
					</button>
				</div>
			</div>
			<table class="content-table">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Type</th>
						<th>Price</th>
						<th>Path</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(menuItem, index) in paginatedMenuItems"
						:key="index"
						:class="{ 'active-row': menuItem === selectedMenuItem }"
					>
						<td>
							{{ (currentPage - 1) * itemsPerPage + index + 1 }}
						</td>
						<td>{{ menuItem.name }}</td>
						<td>{{ menuItem.type }}</td>
						<td>{{ menuItem.price }}</td>
						<td>{{ menuItem.path }}</td>
						<td class="d-flex">
							<button
								@click="() => callModal(menuItem)"
								class="btn btn-warning me-2 rounded-pill"
							>
								Edit
							</button>
							<button
								@click="deleteMenuItem(index)"
								class="btn btn-danger rounded-pill"
							>
								Delete
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<Modal
				v-if="isShowModal"
				:title="selectedMenuItem ? 'Edit Menu' : 'Add Menu'"
				@close="close"
			>
				<template #body>
					<div style="display: flex; flex-direction: column">
						<div style="margin-bottom: 10px">
							<label for="name" class="fw-semibold mb-2"
								>Name:</label
							>
							<input
								v-model="editedMenuItem.name"
								type="text"
								id="name"
								class="form-control"
								style="border-color: orange"
							/>
						</div>

						<div style="margin-bottom: 10px">
							<label for="pict" class="fw-semibold mb-2"
								>Pict:</label
							>
							<input
								type="file"
								id="pict"
								class="form-control"
								style="border-color: orange"
								@change="handleFileChange"
							/>
						</div>

						<div style="margin-bottom: 10px">
							<label for="types" class="fw-semibold mb-2"
								>Types:</label
							>
							<select
								v-model="editedMenuItem.type"
								id="types"
								class="form-select"
								style="border-color: orange"
							>
								<option value="food">Foods</option>
								<option value="beverage">Beverages</option>
							</select>
						</div>

						<div>
							<label for="price" class="fw-semibold mb-2"
								>Price:</label
							>
							<input
								v-model="editedMenuItem.price"
								type="text"
								id="price"
								class="form-control"
								style="border-color: orange"
							/>
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
						@click="saveMenuItem"
					>
						Save
					</button>
				</template>
			</Modal>
		</div>
		<div class="pagination-buttons">
			<button @click="previousPage" :disabled="currentPage === 1">
				Previous
			</button>
			<button @click="nextPage" :disabled="currentPage === totalPages">
				Next
			</button>
		</div>
	</div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { useMenuStore } from "@/store/menuStore";
import axios from "axios";

export default {
	data() {
		return {
			isShowModal: false,
			selectedMenuItem: null,
			editedMenuItem: null,
			menuItems: [],
			currentPage: 1,
			itemsPerPage: 10,
			filePath: "",
			fileName: "",
		};
	},
	async created() {
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
	computed: {
		paginatedMenuItems() {
			const startIndex = (this.currentPage - 1) * this.itemsPerPage;
			const endIndex = this.currentPage * this.itemsPerPage;
			return this.menuItems.slice(startIndex, endIndex);
		},
		totalPages() {
			return Math.ceil(this.menuItems.length / this.itemsPerPage);
		},
	},
	methods: {
		previousPage() {
			if (this.currentPage > 1) {
				this.currentPage--;
			}
		},
		nextPage() {
			if (this.currentPage < this.totalPages) {
				this.currentPage++;
			}
		},
		close() {
			this.isShowModal = false;
			this.selectedMenuItem = null;
			this.editedMenuItem = { name: "", type: "", price: "" };
		},
		callModal(menuItem) {
			this.selectedMenuItem = menuItem;
			if (menuItem) {
				this.editedMenuItem = { ...menuItem };
			} else {
				this.editedMenuItem = { name: "", type: "food", price: 0 };
			}

			this.isShowModal = true;
		},
		handleFileChange(event) {
			const file = event.target.files[0];
			if (file) {
				this.fileName = file.name;
			}
		},
		async saveMenuItem() {
			try {
				if (this.selectedMenuItem) {
					const index = this.menuItems.findIndex(
						(item) => item.id === this.selectedMenuItem.id
					);
					if (index !== -1) {
						this.menuItems[index] = { ...this.editedMenuItem };

						await axios.put(
							`http://localhost:5000/api/v1/foodnbaverages/${this.selectedMenuItem.id}`,
							this.editedMenuItem
						);
					}
				} else {
					this.editedMenuItem.price = parseFloat(
						this.editedMenuItem.price
					);
					console.log(this.editedMenuItem);

					this.imagePath =
						this.editedMenuItem.type === "food"
							? `foods/${this.fileName}`
							: `beverages/${this.fileName}`;
					console.log(this.imagePath);
					this.editedMenuItem.path = this.imagePath;

					console.log(this.editedMenuItem);
					const response = await axios.post(
						"http://localhost:5000/api/v1/create-foodnbaverage",
						this.editedMenuItem
					);
					const newItem = response.data;

					this.menuItems.push(newItem);
					// window.location.reload();
				}
				this.isShowModal = false;
			} catch (error) {
				console.error("Error updating/creating item:", error);
			}
		},
		async deleteMenuItem(index) {
			try {
				let deletedItemId = null;
				if (this.currentPage === 1) {
					deletedItemId = this.menuItems[index].id;
					console.log(deletedItemId);
				} else {
					const newIndex =
						(this.currentPage - 1) * this.itemsPerPage + index;
					deletedItemId = this.menuItems[newIndex].id;
				}

				await axios.delete(
					`http://localhost:5000/api/v1/foodnbaverages/${deletedItemId}`
				);

				this.menuItems.splice(index, 1);
			} catch (error) {
				console.error("Error deleting item:", error);
			}
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

.pagination-buttons {
	margin-top: 20px;
	text-align: center;
}

.pagination-buttons button {
	margin: 0 5px;
	padding: 8px 16px;
	border: 1px solid #dddddd;
	background-color: #ffffff;
	color: #333333;
	cursor: pointer;
	border-radius: 4px;
	transition: background-color 0.3s, color 0.3s;
}

.pagination-buttons button:hover {
	background-color: #ff8a00;
	color: #ffffff;
}

.pagination-buttons button:disabled {
	cursor: not-allowed;
	opacity: 0.6;
}
</style>
