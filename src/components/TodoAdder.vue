<template>
    <div class="task-adder">
        <input v-model="newTask"
               placeholder="task name">
        <button @click="addTask">Add</button>
    </div>
</template>

<script>

import Task from '@/models/Task.js';
import _ from 'lodash';

export default {
    name: 'TodoAdder',
    data() {
        return {
            newTask: '',
        };
    },
    methods: {
        addTask() {
            if (_.isEmpty(this.newTask))
                return;
            const task = new Task(this.newTask, false);
            this.$store.commit('addTask', task);
            this.newTask = '';
        },
    }
};
</script>

<style scoped>

.task-adder {

    display         : flex;
    justify-content : center;
    align-items     : center;
}

.task-adder input {
    border        : none;
    border-bottom : 1px red solid;
}

.task-adder button {

    border           : 1px red solid;
    background-color : inherit;
    margin-left      : 1rem;
}
</style>
