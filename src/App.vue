<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import { inject } from "@vercel/analytics"

inject();

export default {
    components: {
        LanguageSwitcher
    }
}
</script>