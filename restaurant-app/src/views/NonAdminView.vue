<template>
        <!-- Navbar -->
        <nav>
        <a class="navbar-brand">
           Paradise Bistro
        </a>
    </nav>
    <!-- Background large yellow circle -->
    <div class="circle"></div>
    <!-- Main Content -->
    <main>
        <div class="banner">
            <div class="banner-left">
                <h1 class="title">Happiness with every bite</h1>
                <p class="sub-title">
                    Taste the joy of culinary craftsmanship in every dish, where flavors dance and memories are savored. At our restaurant, we blend passion with each ingredient, crafting a symphony for your palate. Indulge in our creations, and let every bite be a celebration of life's simple pleasures
                </p>
            </div>
            <!-- Banner image -->
            <div class="banner-right">
                <img :src="require('@/assets/foods/burger.png')" alt="Burger" :style="{ width: '500px', height: '400px' }" />
            </div>
        </div>
        <!-- snacks image ticker -->
        <div class="ticker-container">
            <h2 class="title">
                Fulfil your cravings with our delicious snacks
            </h2>
            <div class="img-ticker">
                <img :src="require('@/assets/foods/pizza.png')" alt="Pizza" :style="{ width: '400px', height: '300px' }" />
                <img :src="require('@/assets/foods/ramen.png')" alt="Ramen" :style="{ width: '400px', height: '300px' }" />
                <img :src="require('@/assets/foods/salad.png')" alt="Salad" :style="{ width: '400px', height: '300px' }" />
                <img :src="require('@/assets/foods/steak.png')" alt="Steak" :style="{ width: '400px', height: '300px' }" />
                <img :src="require('@/assets/foods/pasta.png')" alt="Steak" :style="{ width: '400px', height: '300px' }" />
                <img :src="require('@/assets/foods/sushi.png')" alt="Sushi" :style="{ width: '400px', height: '300px' }" />
                <img :src="require('@/assets/foods/tacos.png')" alt="Tacos" :style="{ width: '400px', height: '300px' }" />
                <img :src="require('@/assets/beverages/beer.png')" alt="Beer" :style="{ width: '400px', height: '300px' }" />
                <img :src="require('@/assets/beverages/coffee.png')" alt="Coffee" :style="{ width: '400px', height: '300px' }" />
                <img :src="require('@/assets/beverages/hot_chocolate.png')" alt="Hot Chocolate" :style="{ width: '400px', height: '300px' }" />
                <img :src="require('@/assets/beverages/lemonade.png')" alt="Lemonade" :style="{ width: '400px', height: '300px' }" />
                <img :src="require('@/assets/beverages/milkshake.png')" alt="Milkshake" :style="{ width: '400px', height: '300px' }" />
                <img :src="require('@/assets/beverages/soda.png')" alt="Soda" :style="{ width: '400px', height: '300px' }" />
            </div>
        </div>
        <h3 class="m-3 text-center pt-2">Our Menu</h3>
        <div class="menu">
            <div v-for="(menuItem, index) in menuItems" :key="index" class="menu-card">
                <img :src="require(`@/assets/${menuItem.path}`)" alt="menuItem.name" />
                <h3 class="p-3">{{ menuItem.name }}</h3>
                <p>Rp {{ menuItem.price }},-</p>
            </div>
        </div>
        <!-- Footer -->
        <div class="footer">
            <h2 class="footer-brand">
                Paradise Bistro
            </h2>
            <p>Copyright © 2023 | Paradise Bistro</p>
            <div class="options">
                <!-- Payment Options -->
                <div class="icons">
                    <i class="fab p-3 fa-cc-paypal" aria-hidden="true"></i>
                    <i class="fab p-3 fa-cc-stripe" aria-hidden="true"></i>
                    <i class="fab p-3 fa-cc-visa" aria-hidden="true"></i>
                    <i class="fab p-3 fa-cc-mastercard" aria-hidden="true"></i>
                </div>
                <!-- Social Networks -->
                <div class="icons">
                    <i class="fab p-3 fa-facebook-square" aria-hidden="true"></i>
                    <i class="fab p-3 fa-instagram" aria-hidden="true"></i>
                    <i class="fab p-3 fa-twitter-square" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    </main>
</template>

<style>
*{
    overflow-x: hidden;
}
nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:15px 50px;
}

.navbar-brand{
    font-family: 'Otomanopee One', sans-serif;
    font-size: 30px;
}

.navbar-menu{
    list-style-type: none;
    display: flex;
    align-items: center;
}

.navbar-menu-item{
    margin:0px 10px;
    padding:5px 10px;
    font-family: 'Otomanopee One', sans-serif;
}

.navbar-menu-item:hover{
    cursor: pointer;
    background: black;
    color:rgb(250, 109, 43);
    border-radius: 10px;
}

.circle{
    width:1000px;
    height:1000px;
    border-radius: 50%;
    background: rgb(255, 170, 0);
    position: absolute;
    right:-350px;
    top:-350px;
    z-index: -1;
    border:100px solid rgb(255, 209, 83);
}

/* ============= Banner styles ============= */

.banner{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px 50px;
}

.banner-left{
    width:50%;
}

.banner-left .title{
    font-family: 'Otomanopee One', sans-serif;
    font-size: 60px;
}

.banner-left .sub-title{
    font-size: 18px;
    margin:30px 0px;
}

.banner-left button{
    padding:10px 15px;
    background-color: rgb(255, 209, 83);
    color:#000;
    border-radius: 10px;
    border:none;
    outline:none;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
}

.banner-left button:hover{
    background-color: black;
    color:rgb(255, 230, 0);
}

.banner-right img{
    filter: drop-shadow(0px 10px 10px black);
}

/* =========== Ticker Container Styles ============ */

.ticker-container{
    margin-top: 200px;
    width:100%;
    background-color: rgb(255, 209, 83);
    padding:50px;
    color:#fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.ticker-container h2{
    font-size: 32px;
    font-family: 'Otomanopee One', sans-serif;
}

.img-ticker {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ticker-kf 18s linear infinite;
    margin-top: 40px;
}

.img-ticker img{
    width:400px;
    filter:drop-shadow(5px 5px 5px #000);
}


.menu {
    background-color: #ffffff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    padding: 50px 20px;
}

.menu-card {
    width: 300px;
    padding: 20px;
    margin: 20px;
    background-color: #f9f9f9; 
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    border-radius: 10px;
}

.menu-card img {
    width: 100%;
    height: 200px;
    object-fit: cover; 
    border-radius: 8px;
}

.menu-card h3 {
    margin-top: 15px;
    font-size: 24px;
}

.menu-card p {
    margin-top: 10px;
    font-size: 18px;
    color: #555;
}

/* ========= footer styles ========= */
.footer{
    background: #000;
    padding:50px;
    padding-bottom: 20px;
    color:#fff;
}

.footer p{
    text-align: center;
}

.footer-brand{
    font-family: 'Otomanopee One', sans-serif;
    font-size: 30px;
    text-align: center;
}

.options{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.icons i{
    font-size: 24px;
    margin:0px 5px;
}

.icons i:hover{
    cursor: pointer;
}

@keyframes ticker-kf {
    0% {
      transform: translate3d(0, 0, 0);
    }
  
    100% {
      transform: translate3d(-115rem, 0, 0);
    }
  }
</style>

<script>
import Modal from "@/components/Modal.vue";
import { useMenuStore } from "@/store/menuStore";
import axios from "axios";

export default {
    data() {
        return {
            menuItems: [], // Add this line to store menu items
        };
    },
    async created() {
        try {
            // Fetch menu items from the API
            const response = await axios.get("http://localhost:5000/api/v1/foodnbaverages");
            this.menuItems = response.data.foods;

            // Handle default selection or initialization if needed
            if (this.menuItems.length > 0) {
            // Perform any necessary initialization here
            }
        } catch (error) {
            console.error("Error fetching menu items:", error);
        }
    }
};
</script>