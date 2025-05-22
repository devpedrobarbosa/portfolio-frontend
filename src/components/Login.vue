<template>
    <NavBar/>
    <div class="login-container">
        <h2>Login</h2>
        <div v-if="error" class="error">{{ error }}</div>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit" :disabled="loading">
                {{ loading ? 'Logging in...' : 'Login' }}
            </button>
        </form>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {authService} from '../services/auth';
import NavBar from "@/components/NavBar.vue";

const router = useRouter();
const route = useRoute();

const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
    loading.value = true;
    error.value = '';

    try {
        await authService.login(username.value, password.value);
        const redirectPath = route.query.redirect || '/admin';
        await router.push(redirectPath);
    } catch (err) {
        error.value = err.message || 'Login failed';
    } finally {
        loading.value = false;
    }
};
</script>

<style src="../assets/styles/login.css"></style>
