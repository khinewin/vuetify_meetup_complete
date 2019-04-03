<template>

    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm8 offset-sm2>
                <v-card>
                    <v-img :src="meetup.image">
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline white--text">{{meetup.title}}</span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-img>
                    <v-card-text class="text-xs-center">

                                <div class="primary--text mb-2">{{meetup.title}}</div>

                                 <div class="dark--text mb-2">{{meetup.description}}</div>
                                <div class="grey--text">{{getDate(meetup.get_date)}}, {{meetup.get_time}}</div>

                    </v-card-text>
                    <v-card-text>
                        <v-btn to="/meetups" flat class="text-lowercase" >
                            <v-icon left>arrow_back</v-icon>
                            Back
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    
</template>

<script>
    import moment from 'moment'
    export default {
        props: ['id'],
        name: "Meetup",
        data(){
            return{

            }
        },
        created(){

        },
        computed: {
            meetup(){
                return this.$store.getters.loadedMeetup(this.id);
            }
        },
        methods:{
            getDate(d){
                return moment(d).format('dddd, MMMM Do YYYY');
            },

        }
    }
</script>

<style scoped>

</style>