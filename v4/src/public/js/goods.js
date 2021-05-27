import {GoodsItem} from "./goods-item";
import {GetData} from "./get-data";

export let Goods = {
    mixins: [GetData],
    props: {
        url: {
            type: String,
            default: '/api/products'
        },
        filter: {
            type: String,
            default: ''
        },
        cart: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            goods: [],
        }
    },
    mounted() {
        this.getJson(this.url)
            .then(data => {
                for (const el of data) {
                    this.goods.push(el);
                }
            })
    },
    components: {
        'goods-item': GoodsItem
    },
    template:
        `<div class="product-box">
            <slot></slot>
            <goods-item v-for="item in filterGoods" v-bind="item" :key="item.id" @add-product="addProduct"></goods-item>
        </div>`,
    computed: {
        filterGoods() {
            if (this.filter.trim() === '') return this.goods;
            let reg = new RegExp(this.filter, 'i');
            return this.goods.filter(item => reg.test(item.product_name));
        },
    },
    methods: {
        addProduct: function (product) {
            this.$emit('add-product', product);
        }
    }
}