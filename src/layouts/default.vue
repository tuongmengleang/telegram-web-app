<script lang="ts" setup></script>

<template>
    <main id="main" class="w-full px-4 bg-cover bg-center">
        <slot />
    </main>
</template>

<style scoped>
#main {
    padding-top: env(safe-area-inset-top, 20px);
    padding-bottom: env(safe-area-inset-bottom, 20px);
}
</style>
