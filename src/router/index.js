import vueRouter from 'vue-router';
import auth from './Auth';
import Index from '@/Views/Index'
import Meetup from '@/Views/Meetup'
import Meetups from '@/Views/Meetups'
import Profile from '@/Views/User/Profile'
import Signup from '@/Views/User/Signup'
import Signin from '@/Views/User/Signin'
import NewMeetup from '@/Views/Newmeetup'

let routes=[
    {
        path: "/",
        name: 'index',
        component: Index
    },
    {
        path: '/meetup/new',
        name: 'newmeetup' ,
        component:NewMeetup
    },

    {
        path: '/meetup/:id',
        name: 'meetup',
        props: true,
        component :Meetup,
        beforeEnter :auth,

    },
    {
        path: '/meetups',
        name: 'meetups',
        component: Meetups,
        beforeEnter: auth,
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        beforeEnter: auth
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup,
    },
    {
        path: '/signin',
        name: 'signin',
        component: Signin
    }

]

export default new vueRouter({
    routes,
})