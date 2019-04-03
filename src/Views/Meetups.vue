<template>
    <v-container>
        <v-layout row v-if="loading">
            <v-flex xs12 sm4 offset-sm4 class="text-xs-center">
                <v-progress-circular
                        style="margin-top: 50px"
                        :size="200"
                        color="amber"
                        indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-card v-for="meetup in meetups" class="mb-2">
            <v-layout row wrap class="hidden-sm-and-up">
                <v-flex xs12>
                    <v-img :src="meetup.image" >
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline white--text">{{meetup.title}}</span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-img>
                    <v-card-text>
                            <span class="grey--text">{{getDate(meetup.get_date)}}, {{meetup.get_time}}</span>

                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="orange" flat router :to="/meetup/+meetup.id">
                            <v-icon left>visibility</v-icon>
                            <span class="text-lowercase">Meetup Detail</span>
                        </v-btn>
                    </v-card-actions>
                </v-flex>
            </v-layout>
            <v-layout row wrap class="hidden-xs-only">
                <v-flex sm4>
                    <v-img :src="meetup.image" ></v-img>
                </v-flex>
                <v-flex sm8>
                    <v-card-text class="text-xs-center">
                        <div class="primary--text subheading mb-2">{{meetup.title}}</div>
                        <div class="black--text mb-2">{{meetup.description}}</div>
                        <div class="grey--text">{{getDate(meetup.get_date)}}, {{meetup.get_time}}</div>
                    </v-card-text>
                    <v-card-text class="text-xs-center">
                        <v-btn color="orange" flat router :to="/meetup/+meetup.id">
                            <v-icon left>visibility</v-icon>
                            <span class="text-lowercase"> Meetup Detail</span>
                        </v-btn>
                    </v-card-text>
                </v-flex>
            </v-layout>
        </v-card>
    </v-container>
</template>

<script>
    import moment from 'moment'
    export default {

        name: "Meetups",
        data(){
            return{

            }
        },
        computed:{
            meetups (){
                return this.$store.getters.loadedMeetups;
            },
            loading(){
                return this.$store.getters.loading;
            }
        },
        methods:{
            getDate(d){
                return moment(d).format('dddd, MMMM Do YYYY');
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .v-progress-circular{
        margin: 1rem
    }
</style>