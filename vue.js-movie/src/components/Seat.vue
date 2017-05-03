<template>
    <div class="box">
        <h3 class="title">[[Seat]] {{ movieId }}</h3>
        <p> {{ this.seats }} </p>
    </div>
</template>

<script>
import movie from 'Others/movie.json'
console.log('xxxx: ')
console.log(movie)

export default {
    props: [ 'movieId'],
    computed: {
        seats() {
            return movie[this.movieId]
        }
    }
}
</script>