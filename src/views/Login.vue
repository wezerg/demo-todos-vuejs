<script setup>
import { ref } from "vue";
import Joi from 'joi';
import { useUserStore } from '@/services/userstore';
import { useRouter } from 'vue-router';

    const email = ref('');
    const password = ref('');
    const errorSaisie = ref('');

    const {connect} = useUserStore();
    const router = useRouter();

    async function connexion(){
        const scheme = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        const payload = {email: email.value, password: password.value};
        const {value, error} = scheme.validate(payload);
        if (error) {
            errorSaisie.value = error.message;
            return;
        }
        else{
            const response = await connect(email.value, password.value);
            if (!response) {
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
        <h1>Connexion</h1>
        <form @submit.prevent="connexion()">
            <label for="email">Email</label>
            <input type="text" id="email" v-model="email">
            <label for="password">Mot de passe</label>
            <input type="text" id="password" v-model="password">
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