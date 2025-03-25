<template>
    <h1>Admin Panel</h1>

    <main>
        <h2>{{ editingSkill ? 'Edit Skill' : 'Add new Skill' }}</h2>
        <form class="row gy-2 gx-3 align-items-center" @submit.prevent="handleSubmit">
            <div class="col-auto">
                <input v-model="skill.name" type="text" class="form-control" placeholder="Name">
            </div>
            <div class="col-auto">
                <input v-model="skill.website" type="text" class="form-control" placeholder="Website">
            </div>
            <div class="col-auto">
                <input v-model="skill.icon" type="text" class="form-control" placeholder="DevIcon">
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
                <button type="submit" class="btn btn-success">{{ editingSkill ? 'Update Skill' : 'Add Skill' }}</button>
                <button v-if="editingSkill" type="button" class="btn btn-secondary"
                    @click="cancelEdit('skill')">Cancel</button>
            </div>
        </form>

        <h2 class="mt-4">{{ editingProject ? 'Edit Project' : 'Add new Project' }}</h2>
        <form class="row g-3" @submit.prevent="handleProjectSubmit">
            <!-- Project Name - Full width on small screens, 8 columns on medium and up -->
            <div class="col-12 col-md-8 col-lg-6">
                <label for="projectName" class="form-label">Project Name</label>
                <input v-model="project.name" type="text" class="form-control" id="projectName" placeholder="Project Name">
            </div>
            
            <!-- Clear div for new row -->
            <div class="w-100"></div>
            
            <!-- Descriptions side by side -->
            <div class="col-12 col-md-6">
                <label for="enDescription" class="form-label">English Description</label>
                <textarea v-model="project.enDescription" class="form-control" id="enDescription" rows="3"
                    placeholder="English Description"></textarea>
            </div>
            <div class="col-12 col-md-6">
                <label for="ptDescription" class="form-label">Portuguese Description</label>
                <textarea v-model="project.ptDescription" class="form-control" id="ptDescription" rows="3"
                    placeholder="Portuguese Description"></textarea>
            </div>
            
            <!-- Tags input with appropriate width -->
            <div class="col-12 col-md-8 col-lg-6">
                <label for="projectTags" class="form-label">Tags</label>
                <input v-model="project.tags" type="text" class="form-control" id="projectTags" 
                    placeholder="Tags (comma-separated)">
            </div>
            
            <!-- Buttons on a new row -->
            <div class="col-12 mt-2">
                <button type="submit" class="btn btn-success me-2">
                    {{ editingProject ? 'Update Project' : 'Add Project' }}
                </button>
                <button v-if="editingProject" type="button" class="btn btn-secondary"
                    @click="cancelEdit('project')">Cancel</button>
            </div>
        </form>

        <p v-if="message" class="alert" :class="message.includes('Error') ? 'alert-danger' : 'alert-success'">{{ message
            }}</p>

        <h2 class="mt-4">Existing Skills</h2>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Website</th>
                        <th>Icon</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in loadedSkills" :key="index">
                        <td>{{ item.name }}</td>
                        <td><a :href="item.website" target="_blank">{{ item.website }}</a></td>
                        <td>{{ item.icon }}</td>
                        <td>{{ item.type }}</td>
                        <td>
                            <button class="btn btn-sm btn-primary me-2" @click="editSkill(item)">Edit</button>
                            <button class="btn btn-sm btn-danger" @click="deleteSkill(item.id)">Delete</button>
                        </td>
                    </tr>
                    <tr v-if="loadedSkills.length === 0">
                        <td colspan="5" class="text-center">No skills found</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h2 class="mt-4">Existing Projects</h2>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>English Description</th>
                        <th>Portuguese Description</th>
                        <th>Tags</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in loadedProjects" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.enDescription.substring(0, 50) }}{{ item.enDescription.length > 50 ? '...' : '' }}
                        </td>
                        <td>{{ item.ptDescription.substring(0, 50) }}{{ item.ptDescription.length > 50 ? '...' : '' }}
                        </td>
                        <td>{{ item.tags.join(', ') }}</td>
                        <td>
                            <button class="btn btn-sm btn-primary me-2" @click="editProject(item)">Edit</button>
                            <button class="btn btn-sm btn-danger" @click="deleteProject(item.id)">Delete</button>
                        </td>
                    </tr>
                    <tr v-if="loadedProjects.length === 0">
                        <td colspan="5" class="text-center">No projects found</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="logout-section">
            <button @click="handleLogout" class="logout-button">Logout</button>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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

const project = ref({
    name: "",
    enDescription: "",
    ptDescription: "",
    tags: ""
});

const loadedSkills = ref([]);
const loadedProjects = ref([]);
const editingSkill = ref(null);
const editingProject = ref(null);

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
        if (editingSkill.value) {
            await axios.put(`https://api.pedrao.tech:8080/v1/skills/${editingSkill.value.id}`, skill.value);
            message.value = "Skill updated successfully!";
            editingSkill.value = null;
        } else {
            await axios.post('https://api.pedrao.tech:8080/v1/skills', skill.value);
            message.value = "Skill added successfully!";
        }
        // Reset form after success
        skill.value = { name: "", website: "", icon: "", type: "" };
        // Refresh skills list
        await fetchSkills();
    } catch (error) {
        message.value = "Error adding/updating skill. Please try again.";
        console.error(error);
    }
};

const handleProjectSubmit = async () => {
    if (!project.value.name.trim()) {
        message.value = "Error: Project name is required.";
        return;
    }
    if (!project.value.enDescription.trim()) {
        message.value = "Error: English description is required.";
        return;
    }
    if (!project.value.ptDescription.trim()) {
        message.value = "Error: Portuguese description is required.";
        return;
    }

    // Convert comma-separated tags to array
    const tagsArray = project.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    try {
        const projectData = {
            ...project.value,
            tags: tagsArray
        };

        if (editingProject.value) {
            // Include the ID in the projectData when editing
            projectData.id = editingProject.value.id;
            await axios.put(`https://api.pedrao.tech:8080/v1/projects/${editingProject.value.id}`, projectData);
            message.value = "Project updated successfully!";
            editingProject.value = null;
        } else {
            await axios.post('https://api.pedrao.tech:8080/v1/projects', projectData);
            message.value = "Project added successfully!";
        }

        // Reset form after success
        project.value = { name: "", enDescription: "", ptDescription: "", tags: "" };
        // Refresh projects list
        await fetchProjects();
    } catch (error) {
        message.value = "Error adding/updating project. Please try again.";
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

const fetchSkills = async () => {
    try {
        const response = await axios.get('https://api.pedrao.tech:8080/v1/skills');
        loadedSkills.value = response.data;
    } catch (error) {
        console.error('Error fetching skills:', error);
        message.value = "Error loading skills.";
    }
};

const fetchProjects = async () => {
    try {
        const response = await axios.get('https://api.pedrao.tech:8080/v1/projects');
        loadedProjects.value = response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        message.value = "Error loading projects.";
    }
};

const deleteSkill = async (skillId) => {
    if (confirm('Are you sure you want to delete this skill?')) {
        try {
            await axios.delete(`https://api.pedrao.tech:8080/v1/skills/${skillId}`);
            message.value = "Skill deleted successfully!";
            await fetchSkills();
        } catch (error) {
            console.error('Error deleting skill:', error);
            message.value = "Error deleting skill.";
        }
    }
};

const deleteProject = async (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
        try {
            await axios.delete(`https://api.pedrao.tech:8080/v1/projects/${projectId}`);
            message.value = "Project deleted successfully!";
            await fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            message.value = "Error deleting project.";
        }
    }
};

const editSkill = (skillToEdit) => {
    editingSkill.value = skillToEdit;
    skill.value = {
        name: skillToEdit.name,
        website: skillToEdit.website,
        icon: skillToEdit.icon,
        type: skillToEdit.type
    };
};

const editProject = (projectToEdit) => {
    editingProject.value = projectToEdit;
    project.value = {
        name: projectToEdit.name,
        enDescription: projectToEdit.enDescription,
        ptDescription: projectToEdit.ptDescription,
        tags: projectToEdit.tags.join(', ')
        // Note: We don't include ID in project.value as it's already in editingProject.value
        // The ID will be added to projectData in handleProjectSubmit when needed
    };
};

const cancelEdit = (type) => {
    if (type === 'skill') {
        editingSkill.value = null;
        skill.value = { name: "", website: "", icon: "", type: "" };
    } else {
        editingProject.value = null;
        project.value = { name: "", enDescription: "", ptDescription: "", tags: "" };
    }
};

const handleLogout = () => {
    authService.logout();
    router.push('/login');
};

onMounted(() => {
    fetchSkills();
    fetchProjects();
});
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
