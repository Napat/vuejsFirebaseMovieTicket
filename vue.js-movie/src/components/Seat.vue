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

const isSeated = (seat) => {
    return seat.seated === true
}
const isSeatSelected = (seatId) => {
    return seatId != -1
}
const isSelectByOther = (currentSeatId, dbSeatId) => {
    return isSeatSelected(dbSeatId) && !isSeatSelected(currentSeatId)
}

export default {
    props: [ 'movieId', 'selectSeats', 'firebaseSeats' ],
    methods: {
        className(seat) {
            const currentSelectSeatsId = this.selectSeats.map(s => s.id)
            const currentSeatId = currentSelectSeatsId.indexOf(seat.id)
            const dbSelecteSeatsId = this.firebaseSeats.map(s => s.id)
            const dbSeatId = dbSelecteSeatsId.indexOf(seat.id)

            return [
                'button',
                {   
                    'is-danger': isSeated(seat), 
                    // apply green color by primary if seat is seleted by current session 
                    'is-primary': isSeatSelected(currentSeatId),
                    // apply yellow color by is-warning if firebaseSeated by other session 
                    'is-warning':  isSelectByOther(currentSeatId, dbSeatId)
                }
            ]
        },
        chooseSeat(seat) {
            this.$emit('chooseSeat', seat)
        },
        checkBtnDisable(seat){
            if( isSeated(seat) === true){
                return true
            }

            const currentSelectSeatsId = this.selectSeats.map(s => s.id)
            const currentSeatId = currentSelectSeatsId.indexOf(seat.id)
            const dbSelecteSeatsId = this.firebaseSeats.map(s => s.id)
            const dbSeatId = dbSelecteSeatsId.indexOf(seat.id)

            if(isSelectByOther(currentSeatId, dbSeatId)){
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