<template>
    <div class="box">
        <h3 class="title">[[Seat]] {{ movieId }}</h3>
        <p> debug1: {{ seats }} </p>
        <template v-for="s in seats">
            <button 
                :class="className(s)"
                :disabled="s.seated"
                @click="chooseSeat(s)"
            > {{ s.id }} price: {{ s.price }} Baht</button>
            <span> &nbsp; </span>
        </template>
        <span> debug2: {{ selectSeats }}</span>
    </div>
</template>

<script>
import movie from 'Others/movie.json'
console.log('xxxx: ')
console.log(movie)

export default {
    props: [ 'movieId', 'selectSeats' ],
    methods: {
        className(seat) {
            const idOfSelectSeatsBuf = this.selectSeats.map(s => s.id)
            const idcheck = idOfSelectSeatsBuf.indexOf(seat.id)

            return [
                'button',
                {   'is-danger': seat.seated, 
                    'is-primary': idcheck != -1 
                }
            ]
        },
        chooseSeat(seat) {
            this.$emit('chooseSeat', seat)
        }
    },
    computed: {
        seats() {
            return movie[this.movieId]
        }
    }
}
</script>