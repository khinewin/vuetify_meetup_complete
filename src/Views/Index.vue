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
        <v-carousel v-if="!loading">
            <v-carousel-item
                    v-for="item in items"
                    :key="item.id"
                    :src="item.image"
                    @click="loadedMeetup(item.id)"
                    style="cursor: pointer"

            >
                <div class="title">{{item.title}}</div>
            </v-carousel-item>

        </v-carousel>
    </v-container>
</template>

<script>

    export default {
        name: "index",
        components:{
        },
        created(){

        },
        data(){
            return {

            }
        },
        methods:{
          loadedMeetup(id){
              this.$router.push("/meetup/" + id);
          }
        },
        computed: {
            items(){
               return this.$store.getters.featureMeetups;
            },
            loading(){
                return this.$store.getters.loading;
            }
        }
    }
</script>

<style scoped>
    .title{
        background: rgba(0,0,0,0.5);
        padding: 20px;
        text-align: center;
        color: white;

    }

</style>