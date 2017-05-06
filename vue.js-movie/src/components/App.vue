<template>
    <div class="box">
    <h3 class="title">[App]: {{ movieId }}</h3>
    <p> Select: {{ status.count }} seat(s), Total price: {{ status.price }} Baht</p>
    <movie @chooseMovie="handleChooseMovie" :movieId="movieId" />
    <seat 
        :movieId="movieId" 
        @chooseSeat="handleChooseSeat" 
        :selectSeats="selectSeats" 
        :firebaseSeats="firebaseSeats" 
    />
    </div>
</template>

<script>
import firebase from 'firebase'
import _ from 'lodash'

import Movie from 'Components/Movie.vue'
import Seat from 'Components/Seat.vue'
import { pushToArray } from 'Others/lib'

const config = {
    databaseURL: "https://vuejsfirebasemovieticket.firebaseio.com"
}
firebase.initializeApp(config);

const db = firebase.database()

export default {
    components: { Movie, Seat },
    data() {
        return {
            movieId: '',
            selectSeats: [],
            firebaseSeats: [],
            status: { count: 0, price: 0 }
        }
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
            
            const movieRef = db.ref('/').child(this.movieId)

            // register firebase event 'on value change'
            movieRef.on('value', snapshot => {
              // console.log(snapshot.val())  
              const seats = snapshot.val()
              
              this.firebaseSeats = []
              _.forOwn(seats, s => {
                  pushToArray(s, this.firebaseSeats)
              })
              console.log(this.firebaseSeats.length)
            } )

            

        },
        handleChooseSeat(seat){
            pushToArray(seat, this.selectSeats)

            const dbRef = db.ref('/').child(this.movieId)
            dbRef.push(seat)

            this.status = this.selectSeats.reduce( (sum, selectSeatsElement ) => {
                //console.log( `in. sum.count= ${sum.count}, sum.price= ${sum.price}` )
                sum.count++
                sum.price += selectSeatsElement.price   
                //console.log( `out. sum.count= ${sum.count}, sum.price= ${sum.price}` )             
                return sum
                }, { count: 0, price: 0 } 
            )
        }
    }
}

</script>