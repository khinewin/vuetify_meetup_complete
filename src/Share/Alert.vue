<template>
    <div>

        <v-alert
                :value="true"
                dismissible
                type="error"
                outline
                @input="onClose"
        >
            {{text}}
        </v-alert>

    </div>
</template>

<script>
    export default {
        props: ['text'],
        name: "Alert",
        data(){
            return{

            }
        },
        methods:{
            onClose(){
                this.$emit("dismissed");
            }
        }
    }
</script>

<style scoped>

</style>