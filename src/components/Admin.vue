<template>
    <h1>Admin Panel</h1>

    <div class="logout-section">
        <button @click="handleLogout" class="logout-button">Logout</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { authService } from './services/auth';

const router = useRouter();

const handleLogout = () => {
    authService.logout();
    router.push('/login');
};
</script>

<style scoped>
.logout-button {
    background: #f44336;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
}
</style>