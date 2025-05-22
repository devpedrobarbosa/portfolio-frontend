import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import api from '../services/api'

export default {
    components: {
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
                this.projects = await api.get('/v1/projects');
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
        this.fetchProjects();
        this.orderedCategories.forEach(cat => this.fetchSkills(cat));
    }
}