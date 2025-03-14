<template>
    <h1>Admin Panel</h1>

    <main>
        <h2>Add new Skill</h2>
        <form class="row gy-2 gx-3 align-items-center" @submit.prevent="handleSubmit">
            <div class="col-auto">
                <input v-model="skill.name" type="text" class="form-control" placeholder="Name">
            </div>
            <div class="col-auto">
                <input v-model="skill.website" type="text" class="form-control" placeholder="Website">
            </div>
            <div class="col-auto">
                <input v-model="skill.devicon" type="text" class="form-control" placeholder="DevIcon">
            </div>
            <div class="col-auto">
                <select v-model="skill.type" class="form-select">
                    <option disabled value="">Type...</option>
                    <option value="LANGUAGE">Language</option>
                    <option value="DATABASE">Database</option>
                    <option value="OTHER">Framework & Others</option>
                </select>
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-success">Add Skill</button>
            </div>
        </form>

        <p v-if="message" class="alert alert-danger">{{ message }}</p>
    </main>

    <div class="logout-section">
        <button @click="handleLogout" class="logout-button">Logout</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { authService } from '../services/auth';

const router = useRouter();
const message = ref("");
const skill = ref({
    name: "",
    website: "",
    icon: "",
    type: ""
});

const handleSubmit = async () => {
    if (!skill.value.name.trim()) {
        message.value = "Error: Name is required.";
        return;
    }
    if (!isValidURL(skill.value.website)) {
        message.value = "Error: Invalid website URL.";
        return;
    }
    if (!skill.value.type) {
        message.value = "Error: Please select a type.";
        return;
    }
    try {
        const response = await axios.post('https://api.pedrao.tech:8080/v1/skills', skill.value);
        message.value = "Skill added successfully!";

        // Reset form after success
        skill.value = { name: "", website: "", icon: "", type: "" };
    } catch (error) {
        message.value = "Error adding skill. Please try again.";
        console.error(error);
    }
};

const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
};

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

main p {
    margin-top: 1rem;
}
</style>
