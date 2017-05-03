<template>
    <div class="box">
        <h3 class="title">[[Movie]]: {{ movieId }}</h3>
        <div class="columns">
            <div v-for="m in movies" class="column" @click="chooseMovie(m.id)">
                <figure class="image">
                    <img :src="imgSrc(m.id)">                
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
import { movies } from 'Others/movie.json'

console.log(movies)

export default {
    props: [ 'movieId'],
    data() {
        return {
            movies
        }
    },
    methods: {
        imgSrc(movieId){   
            return `/movies/${movieId}.jpg`
        },
        chooseMovie(movieId){
            console.log(`notify(send) ${movieId} to app using this.$emit`)
            this.$emit('chooseMovie', movieId)
        }
    }
}
</script>

