import axios from "axios";
import { ref } from "vue";

const tasks = ref(null);

async function getAll(){
    const response = await axios.get('http://localhost:3001/task').then(res => res).catch(err => err);
    if (response.status !== 200) {
        return null;
    }
    tasks.value = response.data;
    return response;
}
async function addOne(description){
    const response = await axios.post("http://localhost:3001/task",{"description": description, "faite": false});
    if (response.status !== 201) {
        return null;
    }
    tasks.value.push(response.data);
    return response.data;
}

function useTaskStore(){
    return {tasks, getAll, addOne};
}

export {useTaskStore};