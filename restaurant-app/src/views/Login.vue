<template>
    <div class="login-container">
      <div v-if="loggedIn" class="form-container">
        <router-view /> <!-- Menampilkan halaman beranda langsung setelah login -->
        <button @click="logout" class="logout-button">Logout</button>
      </div>
      <div v-else class="form-container">
        <label for="username" class="form-label">Username:</label>
        <input type="text" v-model="username" id="username" class="form-input" />
  
        <label for="password" class="form-label">Password:</label>
        <input type="password" v-model="password" id="password" class="form-input" />
  
        <button @click="login" class="login-button">Login</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        loggedIn: false,
        errorMessage: ''
      };
    },
    methods: {
      login() {
        if (this.username === 'user' && this.password === 'password') {
          this.loggedIn = true;
          this.errorMessage = '';
          this.$router.push('/home'); // Redirect to the home page after successful login
        } else {
          this.loggedIn = false;
          this.errorMessage = 'Username atau password salah';
        }
      },
      logout() {
        this.loggedIn = false;
        this.username = '';
        this.password = '';
      }
    }
  };
  </script>
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #FF8A00;
  }
  
  .welcome-container,
  .form-container {
    text-align: center;
  }
  
  .welcome-message {
    font-size: 20px;
    color: #ffffff;
  }
  
  .logout-button,
  .login-button {
    background-color: #ffffff; 
    color: #FF8A00; 
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
  }
  
  .logout-button:hover,
  .login-button:hover {
    background-color: #e0e0e0; 
  }
  
  .form-label {
    font-size: 16px;
    margin-top: 10px;
    display: block;
    color: #ffffff; 
  }
  
  .form-input {
    width: 100%;
    padding: 8px;
    margin: 6px 0;
    box-sizing: border-box;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>
  