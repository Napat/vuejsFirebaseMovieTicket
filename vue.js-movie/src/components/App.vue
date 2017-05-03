<template>
    <div class="box">
    <h3 class="title">[App]: {{ movieId }}</h3>
    <movie @chooseMovie="handleChooseMovie" :movieId="movieId" />
    </div>
</template>

<script>
import Movie from 'Components/Movie.vue'

export default {
    components: { Movie },
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