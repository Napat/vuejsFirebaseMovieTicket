<template>
    <div class="box" v-if="islogin === true">
        <h3 class="title">[[Movie]]: {{ movieId }}</h3>
        <div class="columns">
            <div v-for="m in fbMoviesArg" :class="className(m.id)" @click="chooseMovie(m.id)">
                <figure class="image">
                    <img :src="imgSrc(m.id)">                
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
//import { movies } from 'Others/movie.json'

// console.log(movies)

export default {
    props: [ 'islogin', 'movieId', 'fbMoviesArg' ],
    data() {
        return {
            // movies
        }
    },
    methods: {
        imgSrc(movieId){   
            console.log('=====================')
            //console.log( this.fbMoviesArg.child("movies/0").hasChildren())
           // console.log( this.fbMoviesArg ) //??????
            
            return `/movies/${movieId}.jpg`
        },
        chooseMovie(movieId){
            // console.log(`notify(send) ${movieId} to app using this.$emit`)
            this.$emit('chooseMovie', movieId)
        },
        className(movieId){
            return [
                'column', 'pointer',
                { 'chosen': this.movieId === movieId }
            ]
        }
    },
    // mounted() will auto call when rendering page complete 
    mounted () {
        console.log('----------------------')
        console.log(this.fbMoviesArg)
        // console.log(movies[0].id)
        //this.chooseMovie( movies[0].id )
        console.log('----------------------')
    }
}
</script>

<style>
.pointer{
    cursor:pointer;
}

.chosen {
    border-style:solid;
}
</style>