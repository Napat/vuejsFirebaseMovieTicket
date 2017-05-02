<template>
    <div class="box">
        <h3 class="title">[[Movie]]</h3>
        <div class="columns">
            <div v-for="m in movies" class="column">
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
    data() {
        return {
            movies
        }
    },
    methods: {
        imgSrc(movieId){   
            return `/movies/${movieId}.jpg`
        }
    }
}
</script>

