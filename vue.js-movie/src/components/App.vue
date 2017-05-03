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
            movieId: ''
        }
    },
    methods: {
        handleChooseMovie(movieId){            
            this.movieId = movieId
        },
        handleChooseSeat(seat){
            console.log(seat)
        }
    }
}

</script>