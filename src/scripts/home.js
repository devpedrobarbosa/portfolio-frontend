import LanguageSwitcher from '../components/LanguageSwitcher.vue'

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
                const response = await fetch('https://api.pedrao.tech:8080/v1/projects', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                this.projects = data;
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        },
        async fetchSkills(type) {
            try {
                const response = await fetch(`https://api.pedrao.tech:8080/v1/skills/type/${type}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                this.skills[type] = await response.json();
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        }
    },
    mounted() {
        this.fetchProjects();
        this.fetchSkills('LANGUAGE');
        this.fetchSkills('DATABASE');
        this.fetchSkills('OTHER');
    }
}