<template>
    <div class="box">
        <h3 class="title">[[Seat]] {{ movieId }}</h3>
        <p> debug1: {{ seats }} </p>
        <template v-for="s in seats">
            <button 
                :class="className(s)"
                :disabled="checkBtnDisable(s)"
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
    props: [ 'movieId', 'selectSeats', 'firebaseSeats' ],
    methods: {
        className(seat) {
            const idSelectSeats = this.selectSeats.map(s => s.id)
            const idcheck = idSelectSeats.indexOf(seat.id)

            const firebaseIdSelecteSeats = this.firebaseSeats.map(s => s.id)
            const firebaseIdcheck = firebaseIdSelecteSeats.indexOf(seat.id)

            return [
                'button',
                {   
                    'is-danger': seat.seated, 
                    // apply green color by primary if seat is seleted by current session 
                    'is-primary': idcheck != -1,
                    // apply yellow color by is-warning if firebaseSeated by other session 
                    'is-warning': firebaseIdcheck != -1 && idcheck === -1 
                }
            ]
        },
        chooseSeat(seat) {
            this.$emit('chooseSeat', seat)
        },
        checkBtnDisable(seat){
            if(seat.seated === true){
                return true
            }
            const idSelectSeats = this.selectSeats.map(s => s.id)
            const idcheck = idSelectSeats.indexOf(seat.id)

            const firebaseIdSelecteSeats = this.firebaseSeats.map(s => s.id)
            const firebaseIdcheck = firebaseIdSelecteSeats.indexOf(seat.id)

            if(firebaseIdcheck != -1 && idcheck === -1){
                return true
            }

            return false
        }
    },
    computed: {
        seats() {
            return movie[this.movieId]
        }
    }
}
</script>