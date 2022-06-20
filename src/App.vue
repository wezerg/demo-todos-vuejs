<script setup>
import Header from '@/components/Header.vue';
import { useUserStore } from './services/userstore';
    
    const {autoConnect} = useUserStore();
    autoConnect();
    
</script>

<template>
    <div>
        <Header></Header>
        <RouterView/>
    </div>
</template>
<style>
</style>