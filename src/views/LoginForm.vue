<template>
    <div class="login-form">
        <v-card width="500px">
            <v-card-title class="justify-center">
                <div>
                    Login
                </div>
            </v-card-title>
            <v-card-text>
                <v-form v-model="valid"
                        lazy-validation
                        ref="form"
                        @submit.prevent="login">
                    <v-text-field
                        label="Username"
                        outlined
                        v-model.trim="form.username"
                        dense
                        :rules="usernameRules"
                    ></v-text-field>
                    <v-text-field
                        v-model="form.phone"
                        label="Phone number"
                        :rules="phoneNumberRules"
                        outlined
                        dense
                    ></v-text-field>
                    <app-alert :hide="3000" :text="textAlert" v-model="showAlert"/>
                    <v-btn
                        :loading="loading"
                        type="submit"
                        block
                        color="success">
                        Register
                    </v-btn>
                </v-form>
            </v-card-text>

        </v-card>
    </div>
</template>

<script>
import Users from "@/Api/Users";
import AppAlert from "@/components/Apps/AppAlert.vue";


export default {
    name: 'LoginForm',
    components: {AppAlert},
    data() {
        return {
            showAlert: false,
            form: {
                username: '',
                phone: '',
            },
            textAlert: "The user doesn't exist in database",
            valid: true,
            loading: false,
        };
    },
    methods: {
        validate() {
            this.$refs.form.validate();
        },

        async login() {
            await this.validate();
            console.log(this.valid);
            if (!this.valid) return false;
            this.loading = true;
            const data = await Users.getAllUsers();
            this.loginUser(data);
            this.loading = false;
        },
        loginUser(data) {
            const {username, phone} = this.form;
            const user = data.find(e => e.username === username && e.phone === phone);
            if (!user) {
                this.showAlert = true;
                return false;
            }
            this.$store.commit('setUser', user);
            localStorage.setItem('user', JSON.stringify(user));
            this.$router.push('/');

        }
    },
    computed: {

        usernameRules() {
            return [
                (value) => !!value || "Username is required",
                (value) =>
                    /^[a-zA-Z]+$/.test(value) ||
                    "Username must contain only letters",
            ];
        },
        phoneNumberRules() {
            return [
                (value) => !!value || "Phone number is required",
                (value) =>
                    /^[0-9 ()+-]+$/.test(value) ||
                    "Phone number must contain only numbers and symbols",
            ];
        },

    },
};

</script>

<style scoped>
.login-form {
    justify-content: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
}
</style>