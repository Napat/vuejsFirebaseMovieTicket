<template>
    <div class="box">
    <h3 class="title">[App]: {{ movieId }}</h3>
    <movie @chooseMovie="handleChooseMovie" :movieId="movieId" />
    <seat :movieId="movieId" />
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
        }
    }
}

</script>