<script setup>
    /*import { useUserStore } from '@/services/userstore';*/
    import { useRouter } from 'vue-router';
    
    const router = useRouter();
    /*const {user, disconnect} = useUserStore();
    function deconnexion(){
        disconnect();
        router.push({name: "acceuil"});
    }*/
</script>
<template>
    <nav>
        <h3>{{!user ? "Welcome" : `Hey ${user.name}`}}</h3>
    </nav>
</template>
<style scoped>
</style>