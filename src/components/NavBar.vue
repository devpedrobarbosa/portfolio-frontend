<template>
  <header>
    <nav>
      <div class="logo">&lt;/&gt;</div>
      <div class="nav-links">
        <a href="/#">{{ $t('home') }}</a>
        <a href="/#projects">{{ $t('projects') }}</a>
        <a href="/#about">{{ $t('about') }}</a>
        <a href="/#contact">{{ $t('contact') }}</a>
      </div>
      <LanguageSwitcher/>
    </nav>
  </header>
</template>
<style src="../assets/styles/nav.css"></style>
<script>
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

export default {
  name: 'NavBar',
  components: {LanguageSwitcher}
}
</script>