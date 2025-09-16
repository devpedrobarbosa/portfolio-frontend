<template>
    <SpeedInsights/>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import { inject } from "@vercel/analytics"
import { SpeedInsights } from "@vercel/speed-insights/vue"

inject();

export default {
    components: {
        LanguageSwitcher
    }
}
</script>