import Vue from './vue'
// import {Goods} from './goods';
// import {Cart} from "./cart";
// import {Search} from "./search";
import Search from "./app.vue";

const vm = new Vue({
    el: '#app',
    data: {
        isVisibleCart: false,
        filterLine: '',
        cartCount: 0,
    },
    mounted() {
        this.isMounted = true;
    },
    components: {
        // 'cart': Cart,
        // 'goods': Goods,
        'search': Search
    },
    methods:{
        filterGoods(data) {
            this.filterLine = data;
        },
        addProduct(product) {
            this.$refs.cart.addProduct(product);
        },
        cartCountChanged(amount) {
            this.cartCount = amount;
        }
    },
})

export default vm;