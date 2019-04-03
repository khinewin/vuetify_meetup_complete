import Vuex from 'vuex';
import Vue from 'vue';
import firebase from 'firebase'
import router from '../router'


Vue.use(Vuex);

export const store= new Vuex.Store({

    state:{
        user: null,
        error: null,
        loading: false,

        loadedMeetups:  [],



    },
    mutations:{
        createUser(state, payload){
            state.user=payload;
        },
        createError(state, payload){
            state.error=payload;
        },
        clearError(state){
            state.error=false;
        },
        createLoading(state, payload){
            state.loading=payload;
        },
        clearLoading(state){
            state.loading=false;
        },
        logout(state){
            firebase.auth().signOut();
            state.user=null;
        },
        setLoadedMeetup(state, payload){
            state.loadedMeetups=payload;
        },
        createMeetup(state, payload){
            state.loadedMeetups.push(payload);
        }
    },
    actions:{
        getMeetups({commit}){
            commit("createLoading", true)
            firebase.database().ref("meetups").once("value")
                .then(res=>{
                    commit("clearLoading");
                    const meetups=[];
                    const obj=res.val()
                    for(let key in obj){
                        meetups.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            location: obj[key].location,
                            image: obj[key].image,
                            get_date: obj[key].get_date,
                            get_time: obj[key].get_time
                        })

                    }
                    commit("setLoadedMeetup", meetups);

                })
                .catch(err=>{
                    console.log(err)
                })
        },
        createMeetup({commit}, payload){
            commit("createLoading", true)
            const meetup= {
                title: payload.title,
                image: payload.imageUrl,
                description: payload.description,
                get_date: payload.get_date,
                get_time:payload.get_time,
                location: payload.location,
            }
            firebase.database().ref("meetups").push(meetup)
                .then(res=>{
                    let key=res.key;
                        commit("createMeetup", {
                            ...meetup,
                            id:key,
                        })
                    commit("clearLoading");
                    console.log(res)
                    router.push('/meetups');
                })
                .catch(err=>{
                    commit("clearLoading");
                    commit("createError", err);
                    console.log(err)
                })
        },
        logout({commit}){
            commit("logout")
        },
        reLogin({commit}, payload){
            commit("createUser", {id:payload.uid, registeredMeetups: []});
        },
        clearError({commit}){
            commit("clearError");
        },
        doSignin({commit}, payload){
            commit('createLoading', true);
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(res=>{
                    commit("clearLoading");
                    let newUser={
                        id: res.user.uid,
                        registeredMeetups: []
                    }
                    commit("createUser", newUser);
                })
                .catch(err=>{
                    commit("createError", err);
                    commit("clearLoading");
                    console.log(err)
                })
        },
        doSignup({commit}, payload){
            commit("createLoading", true);
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(res=>{
                    commit("clearLoading");
                   let newUser={
                       id: res.user.uid,
                       registeredMeetups:[],
                   }
                   commit("createUser", newUser);
                })
                .catch(err=>{
                    commit("createError", err);
                    commit("clearLoading");
                    console.log(err.message)
                })

        }

    },
    getters:{

        user(state){
            return state.user;
        },

        loadedMenuItems(state){
            return state.menuItems;
        },

        loadedMeetups(state){
           return state.loadedMeetups.sort((meetupA, meetupB)=> {
               return meetupA.id < meetupB.id;
           })
        },
        featureMeetups(state, getters){
            return getters.loadedMeetups.slice(0, 3);
        },
        loadedMeetup(state){
           return (meetupId)=>{
               return state.loadedMeetups.find((meetup)=>{
                   if(meetupId==meetup.id){
                      return meetup;
                   }
               })
           }
        },
        loading(state){
            return state.loading;
        },
        error(state){
            return state.error;
        }

    }

});



