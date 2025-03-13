<template>
    <header>
        <nav>
            <div class="logo">&lt;/&gt;</div>
            <div class="nav-links">
                <a href="#">{{ $t('home') }}</a>
                <a href="#projects">{{ $t('projects') }}</a>
                <a href="#about">{{ $t('about') }}</a>
                <a href="#contact">{{ $t('contact') }}</a>
            </div>
            <LanguageSwitcher />
        </nav>
    </header>

    <section class="hero">
        <div class="hero-content">
            <div class="hero-text">
                <p class="hero-intro">
                    <span class="console-prefix">$</span> {{ $t('hello') }}
                </p>
                <div class="typing-container">
                    <p class="typing-text">{{ $t('slogan') }}</p>
                </div>
                <div class="hero-description">
                    <div v-html="$t('description')"></div>
                </div>
                <a href="#contact" class="cta-button">{{ $t('get-in-touch') }}</a>
            </div>
            <div class="hero-image">
                <div class="image-frame">
                    <img src="/src/assets/profile.jpeg" alt="404" />
                    <div class="frame-corner top-left"></div>
                    <div class="frame-corner top-right"></div>
                    <div class="frame-corner bottom-left"></div>
                    <div class="frame-corner bottom-right"></div>
                </div>
            </div>
        </div>
    </section>

    <section id="projects">
        <h2 class="section-title">{{ $t('projects-section') }}</h2>
        <div class="projects-grid">
            <div v-for="(project, index) in projects" :key="index" class="project-card">
                <h3 class="project-title">{{ project.name }}</h3>
                <p>{{ $i18n.locale == 'en' ? project.enDescription : project.ptDescription }}</p>
                <div class="project-tags">
                    <span v-for="(tag, tagIndex) in project.tags" :key="tagIndex" class="tag">{{ tag }}</span>
                </div>
            </div>
            <div v-if="projects.length === 0"><p>{{ $t('nothing-here') }}</p></div>
        </div>
    </section>
    <section id="about" class="about">
        <h2 class="section-title">{{ $t('about-section') }}</h2>
        <h3 style="margin-top: 1.5rem">{{ $t('skills') }}</h3>

        <div class="skills">
            <div v-for="category in orderedCategories" :key="category" class="skill-category">
                <h4>{{ $t(category.toLowerCase()) }}</h4>
                <div class="skill-icons">
                    <a v-for="skill in skills[category]" :key="skill.name" :href="skill.url" target="_blank"
                        rel="noopener noreferrer" class="skill-link">
                        <div class="skill-item">
                            <i :class="skill.icon"></i>
                            <span>{{ skill.name }}</span>
                        </div>
                    </a>
                    <div v-if="!skills[category] || skills[category].length === 0"><p>{{ $t('nothing-here') }}</p></div>
                </div>
            </div>
        </div>
    </section>



    <section id="contact">
        <h2 class="section-title">{{ $t('contact-section') }}</h2>
        <div class="contact-item">
            <span class="console-prefix">$</span>
            <span>email: devpedrobarbosa@gmail.com</span>
        </div>
        <div class="contact-item">
            <span class="console-prefix">$</span>
            <span>github:
                <a href="https://github.com/devpedrobarbosa/" target="_blank"
                    rel="noopener noreferrer">github.com/devpedrobarbosa</a></span>
        </div>
        <div class="contact-item">
            <span class="console-prefix">$</span>
            <span>linkedin:
                <a href="https://linkedin.com/in/pedro-gabry-barbosa-6a1285290/" target="_blank"
                    rel="noopener noreferrer">linkedin.com/in/pedro-gabry-barbosa</a></span>
        </div>
    </section>

    <footer>
        <p>Copywright © Pedro Barbosa 2025</p>
    </footer>
</template>

<script>
import LanguageSwitcher from './LanguageSwitcher.vue'

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
                const response = await fetch('https://api.pedrao.tech:8080/api/projects', {
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
                const response = await fetch(`https://api.pedrao.tech:8080/api/skills/type/${type}`, {
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
</script>

<style>
:root {
    --bg-color: #121212;
    --text-color: #f0f0f0;
    --accent-color: #00ff9d;
    --secondary-color: #404040;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: "Courier New", monospace;
    line-height: 1.6;
    padding: 2rem;
    padding-top: 6rem;
    max-width: 1200px;
    margin: 0 auto;
}

header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(18,
            18,
            18,
            0.95);
    padding: 1rem 2rem;
    margin-bottom: 0;
    backdrop-filter: blur(5px);
    border-bottom: 1px solid var(--secondary-color);
    transition: all 0.3s ease;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--accent-color);
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 2rem;
}

.nav-links a {
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: var(--accent-color);
}

.hero {
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 3rem;
}

.hero-intro {
    font-size: 1.2rem;
    color: var(--accent-color);
    margin-bottom: 0.8rem;
}

.hero-title {
    font-size: 3rem;
    margin-bottom: 0.8rem;
}

.typing-container {
    position: relative;
    display: inline-block;
    width: max-content;
    max-width: 100%;
}

.typing-text {
    position: relative;
    font-size: 1.5rem;
    white-space: nowrap;
    overflow: hidden;
    border-right: 2px solid var(--accent-color);
    width: 0;
    animation: typing 2s steps(40) 1s forwards,
        cursor-blink 0.75s step-end infinite;
}

.typing-cursor {
    position: absolute;
    right: 0;
    width: 2px;
    height: 1.5em;
    background-color: var(--accent-color);
    animation: cursor-blink 0.75s step-end infinite;
    animation-delay: 5s;
    animation-iteration-count: 3;
    animation-fill-mode: forwards;
}

@keyframes typing {
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
}

@keyframes cursor-blink {

    from,
    to {
        border-right-color: transparent;
    }

    50% {
        border-right-color: var(--accent-color);
    }
}

.hero-description {
    max-width: 650px;
    margin: 1.5rem 0;
}

.cta-button {
    display: inline-block;
    background-color: transparent;
    color: var(--accent-color);
    border: 1px solid var(--accent-color);
    padding: 0.8rem 1.5rem;
    text-decoration: none;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
}

.cta-button:hover {
    background-color: var(--accent-color);
    color: var(--bg-color);
}

.section-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    position: relative;
    padding-left: 2rem;
}

.section-title::before {
    content: ">";
    color: var(--accent-color);
    position: absolute;
    left: 0;
    margin-right: 0.5rem;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.project-card {
    border: 1px solid var(--secondary-color);
    padding: 1.5rem;
    transition: transform 0.3s;
}

.project-card:hover {
    transform: translateY(-5px);
}

.project-title {
    color: var(--accent-color);
    margin-bottom: 0.5rem;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.8rem 0;
}

.tag {
    background-color: var(--secondary-color);
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
}

.about {
    margin-bottom: 3rem;
}

.about p {
    margin-bottom: 1rem;
}

.skills {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.skill-category {
    margin-bottom: 0.5rem;

    h4 {
        margin-bottom: 0.5rem;
    }
}

.skill-icons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.skill-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(64, 64, 64, 0.3);
    padding: 1rem;
    border-radius: 8px;
    min-width: 80px;
    text-align: center;
    transition: transform 0.2s, background-color 0.2s;
}

.skill-item:hover {
    transform: translateY(-5px);
    background-color: rgba(64, 64, 64, 0.6);
}

.skill-item i {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.skill-item span {
    font-size: 0.9rem;
}

.skill-link {
    text-decoration: none;
    color: inherit;
    display: block;
}

.skill-link:hover .skill-item {
    transform: translateY(-5px);
    background-color: rgba(64, 64, 64, 0.6);
}

.skill-link:visited,
.skill-link:active {
    color: inherit;
}

.devicon-java-plain.colored {
    color: #ea2d2e;
}

.devicon-python-plain.colored {
    color: #3776ab;
}

.devicon-javascript-plain.colored {
    color: #f7df1e;
}

.devicon-mysql-plain.colored {
    color: #4479a1;
}

.devicon-postgresql-plain.colored {
    color: #336791;
}

.devicon-sqlite-plain.colored {
    color: #003b57;
}

.devicon-mongodb-plain.colored {
    color: #47a248;
}

.devicon-redis-plain.colored {
    color: #d82c20;
}

.devicon-spring-plain.colored {
    color: #6db33f;
}

.devicon-nodejs-plain.colored {
    color: #339933;
}

.contact-info {
    margin-bottom: 1.5rem;
}

.contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
}

.contact-item span {
    margin-left: 0.5rem;
}

.contact-item a {
    color: var(--text-color);
    transition: color 0.25s ease;
}

.contact-item a:hover {
    color: darkgray;
    transition: color 0.25s ease;
}

footer {
    text-align: center;
    padding: 1.5rem 0;
    border-top: 1px solid var(--secondary-color);
    margin-top: 1.5rem;
}

.console-prefix {
    color: var(--accent-color);
}

section {
    margin-bottom: 2.5rem;
    scroll-margin-top: 5rem;
}

.hero-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
}

.hero-text {
    flex: 3;
}

.hero-image {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-frame {
    position: relative;
    width: 250px;
    height: 250px;
    border: 2px solid var(--secondary-color);
    padding: 5px;
    background-color: rgba(64, 64, 64, 0.2);
    position: relative;
}

.image-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(20%) contrast(110%);
    transition: all 0.3s ease;
}

.image-frame:hover img {
    filter: grayscale(0%) contrast(100%);
}

.frame-corner {
    position: absolute;
    width: 15px;
    height: 15px;
    border-color: var(--accent-color);
    z-index: 2;
}

.top-left {
    top: -2px;
    left: -2px;
    border-top: 2px solid;
    border-left: 2px solid;
}

.top-right {
    top: -2px;
    right: -2px;
    border-top: 2px solid;
    border-right: 2px solid;
}

.bottom-left {
    bottom: -2px;
    left: -2px;
    border-bottom: 2px solid;
    border-left: 2px solid;
}

.bottom-right {
    bottom: -2px;
    right: -2px;
    border-bottom: 2px solid;
    border-right: 2px solid;
}

@media screen and (max-width: 900px) {
    .hero-content {
        flex-direction: column-reverse;
        text-align: center;
    }

    .hero-text {
        flex: 1;
    }

    .hero-image {
        flex: 1;
        margin-bottom: 2rem;
    }

    .typing-container {
        margin: 0 auto;
    }
}

@media screen and (max-width: 768px) {
    .skill-icons {
        justify-content: center;
    }
}

@media screen and (max-width: 768px) {
    .nav-links {
        display: none;
    }

    .hero-title {
        font-size: 2rem;
    }

    .projects-grid {
        grid-template-columns: 1fr;
    }
}
</style>