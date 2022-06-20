<script setup>
import { onMounted, ref } from 'vue';
import { useTaskStore } from '@/services/taskstore';

    const {tasks, getAll, addOne} = useTaskStore();
    const description = ref('');
    const errorSaisie = ref('');

    onMounted(async () => {
        await getAll();
    });

    async function addOneTask(){
        const response = await addOne(description.value);
        console.log(response)
        if (!response) {
            errorSaisie.value = "Erreur lors de la création de votre nouvelle tâche";
        }
        else{
            errorSaisie.value = "";
        }
    }

</script>
<template>
    <div>
        <form @submit.prevent="addOneTask()">
            <label for="description">Description</label>
            <input type="text" id="description" v-model="description">
            <button type="submit">Enregistrer nouvelle tâche</button>
            <p>{{errorSaisie}}</p>
        </form>
        <ul v-if="tasks && tasks.length > 0">
            <li v-for="obj in tasks" :key="obj.id">
                <p>{{obj.description}}</p>
            </li>
        </ul>
    </div>
</template>