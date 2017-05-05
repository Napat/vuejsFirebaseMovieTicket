<template>
    <div class="box">
    <h3 class="title">[App]: {{ movieId }}</h3>
    <p> Select: {{ status.count }} seat(s), Total price: {{ status.price }} Baht</p>
    <movie @chooseMovie="handleChooseMovie" :movieId="movieId" />
    <seat 
        :movieId="movieId" 
        @chooseSeat="handleChooseSeat" 
        :selectSeats="selectSeats"  
    />
    </div>
</template>

<script>
import Movie from 'Components/Movie.vue'
import Seat from 'Components/Seat.vue'

export default {
    components: { Movie, Seat },
    data() {
        return {
            movieId: '',
            selectSeats: [],
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
        },
        handleChooseSeat(seat){
            const idOfSelectSeatsBuf = this.selectSeats.map(s => s.id)
            const idcheck = idOfSelectSeatsBuf.indexOf(seat.id)

            if (idcheck === -1){
                //if not available(-1) then add new object to array buf
                this.selectSeats.push(seat)
            } else{
                //if available then delete object from array buf
                this.selectSeats.splice(idcheck, 1)
            }

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