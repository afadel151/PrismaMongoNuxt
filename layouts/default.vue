<script setup>
import { NuxtLoadingIndicator } from '#components';


</script>

<template>
 
    <div class="bg-slate-400">
        <NuxtLoadingIndicator/>
        <slot />
    </div>
</template>