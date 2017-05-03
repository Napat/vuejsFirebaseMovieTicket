<template>
    <div class="box">
        <h3 class="title">[[Seat]] {{ movieId }}</h3>
        <p> {{ seats }} </p>
        <template v-for="s in seats">
            <button :class="className(s)"> {{ s.id }} price: {{ s.price }} Baht</button>
            <span> &nbsp; </span>
        </template>
    </div>
</template>

<script>
import movie from 'Others/movie.json'
console.log('xxxx: ')
console.log(movie)

export default {
    props: [ 'movieId'],
    methods: {
        className(seat) {
            return [
                'button',
                { 'is-danger': seat.seated }
            ]
        }
    },
    computed: {
        seats() {
            return movie[this.movieId]
        }
    }
}
</script>