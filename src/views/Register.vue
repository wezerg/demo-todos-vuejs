<script setup>
import { ref } from "vue";
import Joi from 'joi';
import { useUserStore } from '@/services/userstore';
import { useRouter } from 'vue-router';

    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPass = ref('');
    const errorSaisie = ref('');
    const errorConfirm = ref('');

    const {register} = useUserStore();
    const router = useRouter();
    async function inscription(){
        const scheme = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        const payload = {username: username.value, email: email.value, password: password.value};
        const {value, error} = scheme.validate(payload);
        if(password.value !== confirmPass.value){
            errorConfirm.value = "Le mot de passe n'est pas identique";
            return;
        }
        else{
            errorConfirm.value = "";
        }
        if (error) {
            errorSaisie.value = error.message;
            return;
        }
        else{
            const response = await register(username.value, email.value, password.value);
            if (response.status !== 201) {
                errorSaisie.value = "Erreur lors de l'envoi de la requete";
                return null;
            }
            else{
                router.push({name: "home"});
            }
        }
    }
</script>
<template>
    <div>
        <h1>Inscription</h1>
        <form @submit.prevent="inscription()">
            <label for="username">Nom d'utilisateur</label>
            <input type="text" id="username" v-model="username">
            <label for="email">Email</label>
            <input type="text" id="email" v-model="email">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password">
            <label for="confirmPass">Confirmez votre mot de passe</label>
            <input type="password" id="confirmPass" v-model="confirmPass">
            <p class="error" @click="errorConfirm = ''">{{errorConfirm}}</p>
            <button type="submit">S'inscrire</button>
            <p class="error" @click="errorSaisie = ''">{{errorSaisie}}</p>
        </form>
    </div>
</template>
<style scoped>
label{
    display: block;
}
</style>