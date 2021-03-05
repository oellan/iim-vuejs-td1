import Task from '@/models/Task.js';
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexPersist = new VuexPersistence({
    storage: window.localStorage,
});

export default new Vuex.Store({
    state: {
        /** @var {Task[]} */
        tasks: [],
    },
    mutations: {
        /**
         * @param state
         * @param {Task} newTask
         */
        addTask(state, newTask) {
            if (Task.looksLikeMe(newTask)
                && !taskExists(state, newTask.taskName))
                state.tasks.push(newTask);
        },
        /**
         * @param state
         * @param {string} taskName
         */
        toggleTaskState(state, taskName) {
            if (!taskExists(state, taskName))
                return;
            const task = findTask(state, taskName);
            task.isFinished = !task.isFinished;
        },
        deleteTask(state, taskName) {
            if (!taskExists(state, taskName))
                return;
            state.tasks.splice(state.tasks.indexOf(findTask(state, taskName)), 1);
        },
        deleteAllTasks(state) {
            if (state.tasks.length !== 0)
                Vue.set(state, 'tasks', []);
        },
        moveTaskUp(state, {index, up}) {
            let asksToSwap = [state.tasks[index - (up ? 1 : 0)], state.tasks[index + (up ? 0 : 1)]];
            state.tasks.splice(index - 1, 2, asksToSwap[1], asksToSwap[0]);
        },
        tasksOnlySelected(state, selected) {
            Vue.set(state, 'tasks', selected);
        },
    },
    modules: {},
    getters: {
        taskCount(state) {
            return state.tasks.length;
        },
    },
    plugins: [vuexPersist.plugin],
    actions: {
        deleteFinishedTasks(store) {
            store.commit('tasksOnlySelected', store.state.tasks.filter(({isFinished}) => !isFinished));
        },
    },
});

const findTask = (state, taskName) =>
    state.tasks.find(search_task_callback_by_name_lower(taskName));

const taskExists = (state, taskName) =>
    state.tasks.some(search_task_callback_by_name_lower(taskName));

const search_task_callback_by_name_lower = (taskName) =>
    (
        (task) => task.taskName.toLowerCase() === taskName.toLowerCase()
    );
