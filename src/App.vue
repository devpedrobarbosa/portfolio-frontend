<template>
    <Analytics/>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import { Analytics } from "@vercel/analytics/next"

export default {
    components: {
        LanguageSwitcher
    }
}
</script>