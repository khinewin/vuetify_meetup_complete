<template>
    <v-container>
        <v-layout row wrap v-if="error">
            <v-flex sm6 offset-sm3 md4 offset-md4>
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex sm6 offset-sm3 md4 offset-md4>
                <v-card  class="pa-3">
                    <v-card-text class="primary--text text-xs-center subheading mb-3">Sign In</v-card-text>
                    <v-form ref="signinForm">

                        <v-text-field
                                v-model="email"
                                name="email"
                                id="email"
                                type="email"
                                label="Email"
                                prepend-icon="email"
                                :rules="emailRules"
                        >

                        </v-text-field>
                        <v-text-field
                                v-model="password"
                                name="password"
                                id="password"
                                type="password"
                                label="Password"
                                prepend-icon="vpn_key"
                                :rules="passwordRules"
                        >

                        </v-text-field>


                        <v-btn
                                :loading="loading"
                                :disabled="loading"
                                class="primary"
                                @click="doSignin"
                        >
                            Signin
                            <template v-slot:loader>
                                <span class="primary--text">Loading...</span>
                            </template>
                        </v-btn>

                    </v-form>
                </v-card>
                <div class="mt-3">Don't have an account ? <v-btn flat class="primary--text" to="/signup">Signup</v-btn></div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    export default {
        name: "Signup",

        data(){
            return{

                email: '',
                password: '',
                confirm_password: '',

                emailRules: [
                    (v)=> !!v || 'The email field is required.',
                    v => /.+@.+/.test(v) || "E-mail must be valid"
                ],
                passwordRules:[
                    (v)=> !!v || 'The password field is required.',
                    (v)=> v.length >=6 || 'The minimum password length is 6 required.',
                ],

            }
        },
        created(){

        },
        methods:{
            onDismissed(){
                this.$store.dispatch("clearError");
            },
            doSignin(){
                if(this.$refs.signinForm.validate()){
                    this.$store.dispatch("doSignin",{
                        email: this.email,
                        password: this.password
                    })
                }
            }
        },
        watch:{
            user(val){
                if((val !== undefined) && (val !==null)){
                    this.$router.push('/meetups');
                }
            }
        },
        computed:{
            user(){
                return this.$store.getters.user;
            },
            loading(){
                return this.$store.getters.loading;
            },
            error(){
                return this.$store.getters.error;
            }
        }
    }
</script>

<style scoped>

</style>