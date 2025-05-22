import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import api from '../services/api'
import NavBar from "@/components/NavBar.vue";

export default {
    components: {
        NavBar,
        LanguageSwitcher
    },
    data() {
        return {
            projects: [],
            skills: {},
            orderedCategories: ["LANGUAGE", "DATABASE", "OTHER"]
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
    mounted() {
        this.fetchProjects().then(projects => this.projects = projects);
        this.orderedCategories.forEach(cat => this.fetchSkills(cat));
    }
}