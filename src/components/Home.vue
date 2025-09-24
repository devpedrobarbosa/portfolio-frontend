<template>
    <NavBar/>

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
                    <div v-html="$t('description').replace('%age%', age === 0 ? '--' : age).replaceAll('%ln%', '<br/>').replaceAll('%str%', '<strong>').replaceAll('%/str%', '</strong>')"></div>
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
                <p>{{ $i18n.locale === 'en' ? project.enDescription : project.ptDescription }}</p>
                <a v-if="project.githubLink && project.githubLink !== ''" class="project-link" :href="`${project.githubLink}`" target="_blank">GitHub</a>
                <div class="project-tags">
                    <span v-for="(tag, tagIndex) in project.tags" :key="tagIndex" class="tag">{{ tag }}</span>
                </div>
            </div>
            <div v-if="projects.length === 0">
                <p>{{ $t('nothing-here') }}</p>
            </div>
        </div>
    </section>
    <section id="about" class="about">
        <h2 class="section-title">{{ $t('about-section') }}</h2>
        <h3 style="margin-top: 1.5rem">{{ $t('skills') }}</h3>

        <div class="skills">
            <div v-for="category in orderedCategories" :key="category" class="skill-category">
                <h4>{{ $t(category.toLowerCase()) }}</h4>
                <div class="skill-icons">
                    <a v-for="skill in skills[category]" :key="skill.name" :href="skill.website" target="_blank"
                        rel="noopener noreferrer" class="skill-link">
                        <div class="skill-item">
                            <i :class="skill.icon"></i>
                            <span>{{ skill.name }}</span>
                        </div>
                    </a>
                    <div v-if="!skills[category] || skills[category].length === 0">
                        <p>{{ $t('nothing-here') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="contact">
        <h2 class="section-title">{{ $t('contact-section') }}</h2>
        <div class="contact-item">
            <span class="console-prefix">$</span>
            <span>e-mail: devpedrobarbosa@gmail.com</span>
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
</template>

<script>
import script from '../scripts/home.js'
export default script
</script>

<style src="../assets/styles/home.css"></style>