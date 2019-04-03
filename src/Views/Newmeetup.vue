<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card class="pa-3">
                    <v-card-text class="text-xs-center primary--text subheading mb-2">Organize Meetup</v-card-text>
                    <v-form ref="createMeetupForm">
                        <v-img :src="imageUrl" v-if="imageUrl"/>
                        <v-text-field :rules="imageRules" label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                        <input
                                type="file"
                                style="display: none"
                                ref="image"
                                accept="image/*"
                                @change="onFilePicked"


                        >
                        <v-text-field
                                name="title"
                                id="title"
                                label="Title"
                                prepend-icon="title"
                                v-model="title"
                                :rules="titleRules"
                        >

                        </v-text-field>
                        <v-text-field
                                name="location"
                                id="location"
                                label="Location"
                                prepend-icon="local_library"
                                v-model="location"
                                :rules="locationRules"
                        >

                        </v-text-field>
                        <v-text-field
                                name="description"
                                id="description"
                                label="Description"
                                prepend-icon="description"
                                v-model="description"
                                :rules="descriptionRules"
                        >


                        </v-text-field>

                        <v-layout row wrap>
                            <v-flex xs12 sm6>
                                <v-menu
                                        v-model="pickDate"
                                        :close-on-content-click="false"
                                        full-width

                                        max-width="290"

                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                :rules="dateRules"
                                                :value="computedDateFormattedMomentjs"
                                                clearable
                                                label="Pick Date"
                                                readonly
                                                v-on="on"
                                                prepend-icon="calendar_today"
                                                v-model="get_date"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                            v-model="get_date"
                                            :value="computedDateFormattedMomentjs"
                                            @change="pickDate = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-flex>



                            <v-flex xs12 sm6>
                                <v-dialog
                                        ref="dialog"
                                        v-model="pickTime"
                                        :return-value.sync="get_time"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                :rules="timeRules"
                                                v-model="get_time"
                                                label="Pick Time"
                                                prepend-icon="access_time"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                            v-if="pickTime"
                                            v-model="get_time"
                                            full-width
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="pickTime = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="$refs.dialog.save(get_time)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-flex>
                        </v-layout>



                        <v-btn
                                :loading="loading"
                                :disabled="loading"
                                class="primary"
                                @click="createMeetup"
                        >
                            Create
                            <template v-slot:loader>
                                <span class="primary--text">Loading...</span>
                            </template>
                        </v-btn>

                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "Newmeetup",
        data(){
            return{
                imageName: '',
                imageUrl: '',
                imageFile: '',
                title: '',
                location:'',
                description: '',
                get_time: null,
                pickTime: false,
                pickDate: false,
                get_date:null,
                date: new Date().toISOString().substr(0, 10),
                titleRules:[
                    (v)=> !!v || "The title field is required.",
                ],
                locationRules:[
                    (v)=> !!v || "The location field is required.",
                ],
                imageRules: [
                    (v) => !!v || "The image is selected required."
                ],
                descriptionRules: [
                    (v)=> !!v || "The description field is required."
                ],
                dateRules:[
                    (v)=> !!v || "The date field is required."
                ],
                timeRules:[
                    (v)=> !!v || "The time field is require."
                ]

            }
        },
        computed:{
            computedDateFormattedMomentjs () {
                return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
            },
            loading(){
                return this.$store.getters.loading;
            }
        },
        methods:{

            pickFile () {
                this.$refs.image.click ()
            },

            onFilePicked (e) {
                const files = e.target.files
                if(files[0] !== undefined) {
                    this.imageName = files[0].name
                    if(this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        this.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
            },
            createMeetup(){
                if(this.$refs.createMeetupForm.validate()){
                    this.$store.dispatch("createMeetup", {
                        title : this.title,
                        description: this.description,
                        imageUrl: this.imageUrl,
                        get_date: this.get_date,
                        get_time:this.get_time,
                        location: this.location
                    })
                }

            }
        }
    }
</script>

<style scoped>

</style>