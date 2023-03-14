<template>
    <div>
        <profile-user/>
        <todo-lists/>
    </div>
</template>

<script>

import TodoLists from "@/components/Todos/TodoLists.vue";
import ProfileUser from "@/components/ProfileUser.vue";

export default {
    name: 'MainPage',
    components: {ProfileUser, TodoLists},

};
</script>

<style scoped>

</style>