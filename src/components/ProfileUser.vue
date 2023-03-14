<template>
    <v-card dark class="ma-auto mt-5" width="500px">
        <v-card-title class="justify-center">
            User
        </v-card-title>
        <v-card-text>
            <div>
                name: {{ user.name }}
            </div>
            <div>
                username: {{ user.username }}
            </div>
            <div>
                email: {{ user.email }}
            </div>
            <div>
                phone: {{ user.phone }}
            </div>
            <div>
                website: {{ user.website }}
            </div>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="$store.dispatch('logOut')" color="primary">Sign Out</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'ProfileUser',
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
};
</script>

<style scoped>

</style>