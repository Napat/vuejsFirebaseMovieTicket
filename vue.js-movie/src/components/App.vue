<template>
    <div class="box">
    <h3 class="title">[App]: {{ movieId }}</h3>
    <movie @chooseMovie="handleChooseMovie" :movieId="movieId" />
    <seat :movieId="movieId" @chooseSeat="handleChooseSeat" />
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
            selectSeats: []
        }
    },
    methods: {
        handleChooseMovie(movieId){            
            this.movieId = movieId
        },
        handleChooseSeat(seat){
            const idofselectSeatsBuf = this.selectSeats.map(s => s.id)
            const idcheck = idofselectSeatsBuf.indexOf(seat.id)

            if (idcheck === -1){
                //if not available(-1) then add new object to array buf
                this.selectSeats.push(seat)
            } else{
                //if available then delete object from array buf
                this.selectSeats.splice(idcheck, 1)
            }
            console.log(this.selectSeats.length)
        }
    }
}

</script>