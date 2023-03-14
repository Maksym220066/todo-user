<template>
    <div @click="switchFavorite" style="cursor: pointer">
        <v-icon
            v-if="!active"
            color="grey lighten-1"
        >
            mdi-star-outline
        </v-icon>

        <v-icon
            v-else
            color="yellow darken-3"
        >
            mdi-star
        </v-icon>
    </div>
</template>

<script>
export default {
    name: 'AppFavoriteBtn',
    props: {
        active: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        switchFavorite() {
            this.$emit('switchFavorite', !this.active);
        }
    }
};
</script>

<style scoped>

</style>