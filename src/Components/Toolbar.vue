<template>
    <nav>
        <v-toolbar app class="primary white--text">
            <v-toolbar-side-icon class="white--text"  @click="sideBar = !sideBar"></v-toolbar-side-icon>
            <v-toolbar-title style="cursor: pointer" @click="getIndex"><v-icon  class="white--text">vpn_lock</v-icon> MON Dev Meetup</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down" v-for="menu in menuItems">
                <v-tooltip bottom>
                    <v-btn slot="activator" fab small router :to="menu.url"><v-icon>{{menu.icon}}</v-icon></v-btn>
                    <span>{{menu.name}}</span>
                </v-tooltip>

            </v-toolbar-items>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-tooltip bottom v-if="isAuth">
                    <v-btn @click="onLogout" slot="activator" fab small>
                        <v-icon>exit_to_app</v-icon>
                    </v-btn>
                    <span>Sign Out</span>
                </v-tooltip>
            </v-toolbar-items>
        </v-toolbar>




        <v-navigation-drawer v-model="sideBar" app>
            <v-card class="text-xs-center" v-if="isAuth">
                <v-responsive class="pt-3">
                    <v-avatar size="100">
                        <img src="https://randomuser.me/api/portraits/men/85.jpg">
                    </v-avatar>
                </v-responsive>
                <v-card-text>
                    <div class="text--darken-4">Khine Win</div>
                    <div class="grey--text">Web Developer</div>
                </v-card-text>
            </v-card>

            <v-list>
                <v-list-tile v-for="menu in menuItems" :to="menu.url">
                    <v-list-tile-action>
                        <v-icon>{{menu.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        {{menu.name}}
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="onLogout" v-if="isAuth">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        Sign Out
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>
    
</template>

<script>
    export default {
        name: "Toolbar",
        data(){
            return{
                sideBar: false,

            }
        },
        methods:{
            getIndex(){
                this.$router.push('/');
            },
            onLogout(){
                this.$store.dispatch("logout");
            }
        },
        watch:{
          user(val){
              if((val == null) && (val==undefined)){
                  this.$router.push("/signin");
              }
          }
        },
        computed:{
            user(){
               return this.$store.getters.user;
            },
            menuItems(){
                if(this.isAuth){
                    let items=[
                        {
                            name: 'Meetups', icon: 'group', url: '/meetups',
                        },
                        {
                            name: 'Organize Meetup', icon: 'room', url: '/meetup/new',
                        },
                        {
                            name: 'Profile', icon: 'person', url: '/profile',
                        },
                    ]
                    return items;
                }else{
                    let items=[
                        {
                            name: 'Sign Up', icon: 'how_to_reg', url: '/signup',
                        },
                        {
                            name: 'Sign In', icon: 'lock_open', url: '/signin',
                        },

                    ]
                    return items;
                }
            },
            isAuth(){
                return this.$store.getters.user !== null && this.$store.getters.user !==undefined;
            }
        }
    }
</script>

<style scoped>

</style>