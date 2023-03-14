<template>
    <v-list-item>
        <v-list-item-content>
            <v-list-item-title class="d-flex">
                <div class="mr-2">
                    <app-favorite-btn :active="isFavorite" @switchFavorite="switchFavorite"/>
                </div>
                <div>
                    <div>id: {{ todo.id }}</div>
                    <div>userId:{{ todo.userId }}</div>
                    <div>Completed:{{ todo.completed }}</div>
                    <div>title:{{ todo.title }}</div>
                </div>
            </v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
import AppFavoriteBtn from "@/components/Apps/AppFavoriteBtn.vue";

export default {
    name: 'TodoList',
    components: {AppFavoriteBtn},
    props: {
        todo: {
            type: Object,
            require: true,
        },
        idsFavorites: {
            type: Array,
            require: true,
        }
    },
    computed: {
        isFavorite() {
            return this.idsFavorites.some(e => e === this.todo.id);
        }
    },
    methods: {
        switchFavorite(active) {
            const {id = ''} = this.todo;
            this.$emit('switchFavorite', {active, id});
        },
    },
};
</script>

<style scoped>

</style>