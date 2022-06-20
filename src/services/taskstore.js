import axios from "axios";
import { ref } from "vue";

axios.interceptors.request.use(function (config) {
    config.headers['x-auth-token'] = localStorage.getItem('cours-token') || "";
    return config;
});

axios.interceptors.response.use(function (response) {
    return response;
});

const tasks = ref(null);

async function getAll(){
    const response = await axios.get('http://localhost:3001/task').then(res => res).catch(err => err);
    if (response.status !== 200) {
        return null;
    }
    console.log(response.data)
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
async function deleteOne(id){
    const response = await axios.delete(`http://localhost:3001/task/${id}`);
    if (response.status !== 200) {
        return null;
    }
    let index = tasks.value.indexOf(response.data.task);
    if (index !== -1) {
        tasks.value.splice(index, 1);
    }
    return response.data;
}

function useTaskStore(){
    return {tasks, getAll, addOne, deleteOne};
}

export {useTaskStore};