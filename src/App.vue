<template>
    <div id="app">
        <TodoRootCard></TodoRootCard>
    </div>
</template>

<script>

import TodoRootCard from '@/components/TodoRootCard.vue';

export default {
    name: 'App',
    components: {
        TodoRootCard,
    },
};
</script>

<style>
#app {
    display         : flex;
    flex-direction  : column;
    align-items     : center;
    justify-content : center;
    min-height      : 100vh;
}
</style>
