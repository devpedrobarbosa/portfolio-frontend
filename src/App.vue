<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import LanguageSwitcher from './components/LanguageSwitcher.vue'

export default {
    components: {
        LanguageSwitcher
    }
}
</script>