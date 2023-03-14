<template>
    <v-card dark class="ma-6 todo" max-width="700px" height="900px">
        <v-card-title class="todo__title">
            Todo
        </v-card-title>
        <v-card-text class="todo__content">
            <post-todo @setNewTodo="setNewTodo"/>
            <filter-list :get-filter.sync="filter" :todos="todoList" class="mt-3"/>
            <v-list class="todo__list mt-2">
                <todo-list @switchFavorite="switchFavorite" :key="todo.id" v-for="todo in filterFull" :todo="todo"
                           :idsFavorites="idsFavorites"/>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
import Todos from "@/Api/Todos";
import TodoList from "@/components/Todos/TodoList.vue";
import FilterList from "@/components/Apps/FilterList.vue";
import PostTodo from "@/components/Todos/PostTodo.vue";

export default {
    name: 'TodoLists',
    components: {PostTodo, FilterList, TodoList},
    data() {
        return {
            idsFavorites: [],
            todoList: [],
            filter: {},
        };
    },
    computed: {
        filterSearchTodos() {
            const {searchQuery = ''} = this.filter;
            return this.todoList.filter(e => (e.title.toLowerCase()).includes(searchQuery.toLowerCase()));
        },
        filterTodosBySearchAndId() {
            const {value: id} = this.filter?.sortId || {};
            return this.filterSearchTodos.filter(e => !id ? e : e.userId === id);
        },
        filterFull() {
            const {value, item} = this.filter?.sortStatus || {};
            return this.filterTodosBySearchAndId.filter(e => {
                if (item === 'completed') return e.completed === value;
                else if (item === 'favorites') return this.idsFavorites.includes(e.id);
                else return e;
            });
        }
    },
    methods: {
        setNewTodo(data) {
            this.todoList.push(data);
        },
        switchFavorite({active, id}) {
            const {idsFavorites} = this;
            if (active) {
                this.idsFavorites = [id, ...idsFavorites];
            } else {
                this.idsFavorites = idsFavorites.filter(e => e !== id);
            }
            localStorage.setItem('favoriteIds', JSON.stringify(this.idsFavorites));
        }
    },
    async created() {
        this.todoList = await Todos.getAllTodos();
        const data = localStorage.getItem('favoriteIds');
        if (data) {
            this.idsFavorites = JSON.parse(data);
        }
    }
};
</script>

<style lang="scss" scoped>
.todo {
    display: flex;
    flex-direction: column;

    &__content {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    &__title {
        justify-content: center;
    }

    &__list {
        flex: 1 0 0;
        overflow: auto;
    }
}
</style>