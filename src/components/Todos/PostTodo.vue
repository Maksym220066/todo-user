<template>
    <v-card>
        <v-card-title>
            Create Todo
        </v-card-title>
        <v-card-text>
            <v-form ref="form" @submit.prevent="createTodo" lazy-validation v-model="validate">
                <v-row my-0>
                    <v-col cols="5">
                        <v-text-field
                            v-model="todo.userId"
                            label="User Id"
                            :rules="[(value) => !!value || 'User id is required']"
                            outlined
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-text-field
                            v-model="todo.title"
                            :rules="[(value) => !!value || 'Title is required']"
                            label="Title"
                            outlined
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-btn :loading="loading" type="submit" style="margin-top: 3px;" color="success">Add</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import Todos from "@/Api/Todos";

export default {
    name: 'PostTodo',
    data() {
        return {
            validate: true,
            loading: false,
            rules: [(value) => !!value || "Username is required"],
            todo: {
                userId: '',
                title: '',
            }
        };
    },
    methods: {
        async createTodo() {
            await this.$refs.form.validate();
            if (!this.validate) return false;
            this.loading = true;

            const {data, error} = await Todos.setTodo(this.todo);
            this.loading = false;
            if (error) return false;
            this.$emit('setNewTodo', data);
            this.todo = {};
            this.$refs.form.resetValidation();

        }
    }
};
</script>

<style scoped>

</style>