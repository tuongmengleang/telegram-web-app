<script lang="ts" setup>
import AppLayout from '@/layouts/default.vue';
import { useBackButton } from '@/composables/useBackButton.ts';

useBackButton();
</script>

<template>
    <AppLayout>
        <RouterView />
    </AppLayout>
</template>
