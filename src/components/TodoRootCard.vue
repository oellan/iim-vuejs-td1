<template>
    <main id="todo-root">
        <header>
            <span>{{ currentDate }}</span>
            <span>{{ title }}</span>
            {{ numberOfTasks }}
        </header>
        <div id="container">
            <TodoAdder></TodoAdder>
            <transition-group name="slide-fade"
                              tag="div">
                <TodoItem v-for="(task,index) in allTasks"
                          v-bind:key="task.hashId"
                          v-bind:todoItem="task"
                          v-bind:index="index">
                </TodoItem>
            </transition-group>
            <button @click="deleteAll">Delete all</button>
            <button @click="deleteFinished">Delete finished</button>
        </div>
    </main>
</template>

<script>

import TodoAdder from '@/components/TodoAdder.vue';
import TodoItem from '@/components/TodoItem.vue';

export default {
    name: 'TodoRootCard',
    components: {
        TodoItem,
        TodoAdder,
    },
    data: () => {
        return {
            title: 'Todo List',
        };
    },
    computed: {
        currentDate() {
            const now = new Date();
            const locale = navigator.language;
            return now.toLocaleDateString(locale, {weekday: 'long', month: 'long', day: 'numeric'});
        },
        numberOfTasks() {
            const tasksCount = Array.from(this.allTasks).length;
            return tasksCount + ' ' + (tasksCount > 1 ? 'tasks' : 'task');
        },
        /**
         *
         * @returns {Iterable<Task>}
         */
        allTasks() {
            return this.$store.state.tasks;
        },
    },
    methods: {
        deleteAll(){
            this.$store.commit('deleteAllTasks')
        },
        deleteFinished(){
            this.$store.dispatch('deleteFinishedTasks')
        }
    }
};
</script>

<style scoped>

/* Les animations d'entrée (« enter ») et de sortie (« leave »)  */
/* peuvent utiliser différentes fonctions de durée et de temps.  */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition : all .3s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
    opacity : 0;
}

#todo-root {

    width         : 100%;
    box-sizing    : border-box;
    border-radius : .5rem;
    box-shadow    : 0 1px 1px rgba(0, 0, 0, 0.12),
    0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.12),
    0 8px 8px rgba(0, 0, 0, 0.12),
    0 16px 16px rgba(0, 0, 0, 0.12);
}

#todo-root header {

    display         : flex;
    flex-direction  : row;
    justify-content : space-between;
    padding         : .5rem;
    box-shadow      : 0 1px 1px rgba(0, 0, 0, 0.12),
    0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.12),
    0 6px 6px rgba(0, 0, 0, 0.12);
}

#todo-root #container {

    padding : 1rem;
}

@media (min-width : 1200px) {
    #todo-root {
        max-width : 70%;
    }
}
</style>
