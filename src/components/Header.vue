<script setup>
    import { useUserStore } from '@/services/userstore';
    import { useRouter } from 'vue-router';
    
    const router = useRouter();
    const {user, disconnect} = useUserStore();
    function deconnexion(){
        disconnect();
        router.push({name: "acceuil"});
    }
</script>
<template>
    <nav style="display: flex">
        <h3>{{!user ? "Welcome" : `Hey ${user.username}`}}</h3>
        <ul>
            <li><RouterLink :to="{name: 'home'}">Accueil</RouterLink></li>
            <li><RouterLink :to="{name: 'about'}">A propos</RouterLink></li>
            <li v-if="!user"><RouterLink :to="{name: 'login'}">Connexion</RouterLink></li>
            <li v-if="!user"><RouterLink :to="{name: 'register'}">Inscription</RouterLink></li>
            <li v-if="user"><RouterLink :to="{name: 'todos'}">Liste des tâches</RouterLink></li>
        </ul>
    </nav>
</template>
<style scoped>
ul{
    display: flex;
    list-style-type: none;
}
li{
    margin-left: 8px;
    margin-right: 8px;
}
</style>