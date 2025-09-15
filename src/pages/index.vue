<script lang="ts" setup>
import { initData, useSignal } from '@telegram-apps/sdk-vue';

const initDataRef = useSignal(initData.state);
</script>

<template>
    <div class="p-4">
        <h4 class="title text-2xl text-center font-medium">Index Page</h4>
        <pre>initDataRef: {{ initDataRef }}</pre>
    </div>
</template>

<style scoped>
.title {
    background-color: var(--tg-theme-button-color);
    color: var(--tg-button-text-color);
}
</style>
