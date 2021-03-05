<template>
    <div class="todo-item">
        <span @click="toggleDone($event)"
              :class="todoItem.isFinished ? 'done' : ''"
              class="spacer-right">{{ todoItem.taskName }}
        </span>
        <button v-if="index > 0"
                @click="moveUp">Move up
        </button>
        <button v-if="index < (taskCount - 1)"
                >Move down
        </button>
        <button @click="deleteMe">Delete</button>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'TodoItem',
    props: ['todoItem', 'index'],
    computed: {
        ...mapGetters(['taskCount']),
    },
    methods: {
        /**
         * @param {Event} event
         */
        toggleDone(event) {
            this.$store.commit('toggleTaskState', this.todoItem.taskName);
            event.target.classList[this.todoItem.isFinished ? 'add' : 'remove']('done');
        },
        deleteMe() {
            this.$store.commit('deleteTask', this.todoItem.taskName);
        },
        moveUp() {
            this.$store.commit('moveTaskUp', this.index);
        },
    },
};
</script>

<style>

.done {
    text-decoration : line-through;
}
</style>

<style scoped>

.spacer-right {
    margin-right : auto;
}

.todo-item {

    display        : flex;
    flex-direction : row;
}
</style>
