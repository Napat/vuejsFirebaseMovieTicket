<template>
    <div class="box" v-if="islogin === true" >
        <h3 id='mytitle' class="title" v-bind:title="appHoverMsg">[App]: {{ movieId }}</h3>
        <div id="googlemail">
            {{ displayName }}
            <br>
            <img :src="photoURL" height="100" width="100" alt="LoginImg" > 
            <br>
            <button @click="googlesignOut()"> signout </button>
            <br>            
        </div>    
        <p> Select: {{ status.count }} seat(s), Total price: {{ status.price }} Baht</p>
        <movie @chooseMovie="handleChooseMovie" 
            :islogin="islogin"        
            :movieId="movieId"
            :fbMoviesArg="fbMoviesArg"
        />
        <seat 
            @chooseSeat="handleChooseSeat"     
            :islogin="islogin"
            :movieId="movieId" 
            :selectSeats="selectSeats" 
            :firebaseSeats="firebaseSeats" 
            :fbConfirmArg="fbConfirmArg"
        />
    </div>
    <div class="box" v-else >
        <h3 class="title" v-bind:title="appHoverMsg">[App]: {{ movieId }}</h3>
        <div id="googlemail">
            <button @click="googlesign()"> signin </button>
        </div> 
    </div>
</template>

<script>
import firebase from 'firebase'
import _ from 'lodash'

import Movie from 'Components/Movie.vue'
import Seat from 'Components/Seat.vue'
import { pushToArray } from 'Others/lib'
import { firebaseconfig } from 'Others/config'

firebase.initializeApp(firebaseconfig);
var provider = new firebase.auth.GoogleAuthProvider()

provider.addScope('https://www.googleapis.com/auth/plus.login');
provider.setCustomParameters({
  'login_hint': 'user@example.com'
})

var _this = this
const db = firebase.database()

export default {
    name: 'app',
    components: { Movie, Seat },
    data() {
        return {
            islogin: false,
            displayName: '',
            photoURL: '',
            movieId: '',
            selectSeats: [],
            firebaseSeats: [],
            status: { count: 0, price: 0 },
            displayName: '',
            photoURL: '',
            firebaseArg: '',
            fbConfirmArg: '',
            fbMoviesArg: '',
            appHoverMsg: 'You loaded this page on ' + new Date()
        }
    },
    // mounted() will auto call when rendering page complete 
    mounted () {
        this.firebaseArg=firebase

        console.log('xxx')  
        console.log(this.firebaseArg)  
    },
    methods: {
        handleChooseMovie(movieId){   
            if( this.status.count != 0 ){
                if( confirm('Are you sure to select new movie? Old data will be lost!!)') == true){
                    //Reset all data
                    this.status = { count: 0, price: 0 }
                    this.selectSeats = []
                }else{
                    return false
                }
            }       
            this.movieId = movieId
            
            const movieRef = db.ref('/').child('seattmp').child(this.movieId)

            // register firebase event 'on value change'
            movieRef.on('value', snapshot => {
              // console.log(snapshot.val())  
              const seats = snapshot.val()
              
              this.firebaseSeats = []
              _.forOwn(seats, s => {
                  pushToArray(s, this.firebaseSeats)
              })
            } )
        },
        handleChooseSeat(seat){
            pushToArray(seat, this.selectSeats)

            const dbRef = db.ref('/').child('seattmp').child(this.movieId)
            dbRef.push(seat)

            this.status = this.selectSeats.reduce( (sum, selectSeatsElement ) => {
                //console.log( `in. sum.count= ${sum.count}, sum.price= ${sum.price}` )
                sum.count++
                sum.price += selectSeatsElement.price   
                //console.log( `out. sum.count= ${sum.count}, sum.price= ${sum.price}` )             
                return sum
                }, { count: 0, price: 0 } 
            )
        },
        googlesign () {
            console.log('googlesign')
            var vm = this
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken
                // The signed-in user info.
                var user = result.user
                console.log(token, user)
                console.log('displayName :: ', user.displayName)
                console.log('photoURL ::', user.photoURL)
                vm.displayName = user.displayName
                vm.photoURL = user.photoURL

                // query database node /confirm
                db.ref('/confirm').once("value")
                .then(function(snapshot) {
                    // if data is not empty then binding
                    if(snapshot.val() != null){ 
                         vm.fbConfirmArg = snapshot.val()
                    }else{
                        console.log('firebase with bad schema database')
                    }
                    console.log('++++++++++++++++')
                    console.log(snapshot.val())
                    console.log(vm.fbConfirmArg)
                });

                // query database node /confirm/movies
                db.ref('/confirm/movies').once("value")
                .then(function(snapshot) {
                    // if data is not empty then binding
                    if(snapshot.val() != null){ 
                         vm.fbMoviesArg = snapshot.val()
                    }else{
                        console.log('firebase with bad schema database')
                    }
                    console.log('++++++++++++++++')
                    console.log(snapshot.val())
                    console.log(vm.fbMoviesArg)
                });
                vm.islogin = true

            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                vm.islogin = false
                console.log(error)
            })
        },
        googlesignOut () {
            var vm = this
            firebase.auth().signOut().then(function () {
                console.log('googlesignOut')
                vm.displayName = ''
                vm.photoURL = ''
                vm.islogin = false
                vm.fbMoviesArg = ''
            }, function (error) {
                console.log(error)
                vm.islogin = false
            })
        }
    }
}
</script>

<style>
#googlemail {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>