import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import api from '../services/api'
import NavBar from "@/components/NavBar.vue";
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default {
    components: {
        NavBar,
        LanguageSwitcher
    },
    data() {
        return {
            projects: [],
            skills: {},
            orderedCategories: ["LANGUAGE", "DATABASE", "OTHER"],
            age: 0
        }
    },
    methods: {
        async fetchProjects() {
            try {
                const obj = await api.get('/v1/projects');
                return new Promise(resolve => {
                    resolve(obj);
                })
            } catch (error) {
                console.error('Error fetching projects:', error);
                // You might want to show a user-friendly error message here
            }
        },
        async fetchSkills(type) {
            try {
                this.skills[type] = await api.get(`/v1/skills/type/${type}`);
            } catch (error) {
                console.error(`Error fetching ${type} skills:`, error);
            }
        }
    },
    async mounted() {
        this.fetchProjects().then(projects => this.projects = projects);
        this.orderedCategories.forEach(cat => this.fetchSkills(cat));
        const now = new Date();
        const birth = new Date(2004, 10, 20);
        this.age = now.getFullYear() - birth.getFullYear();
        if ((now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate()) || now.getMonth() < birth.getMonth()) {
            this.age--;
        }

        // await axios.post(`${API_BASE_URL}/v1/access`);
    }
}