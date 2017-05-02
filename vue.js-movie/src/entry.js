import Vue from 'vue'
import App from 'Components/App.vue'

new Vue({
    // ref to id="app" in html
    el: '#app', 
    render(createElement){
        return createElement(App)
    }
})