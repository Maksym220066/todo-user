<template>
    <v-alert transition="scale-transition" text v-model="alert" type="error">
        {{ text }}
    </v-alert>
</template>

<script>
export default {
    name: 'AppAlert',
    props: {
        hide: {
            type: Number,
            default: 0,
        },
        value: {
            type: Boolean,
            require: true,
        },
        text: {
            type: String,
            require: true,
        }
    },
    data() {
        return {
            alert: false,
        };
    },
    watch: {
        value(newVal) {
            this.alert = newVal;
            if (this.hide) {
                setTimeout(() => {
                    this.alert = false;
                }, this.hide);
            }
        },
        alert(newVal) {
            this.$emit('input', newVal);
        },
    },
};
</script>

<style scoped>

</style>