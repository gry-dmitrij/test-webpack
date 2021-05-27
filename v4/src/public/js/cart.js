import {GetData} from "./get-data";
import {CartItem} from "./cart-item";

export let Cart = {
    mixins: [GetData],
    props: {
        url: {
            type: String,
            default: '/api/cart'
        },
        urlAddProduct: {
            type: String,
            default: '/addToBasket.json'
        },
        urlSubProduct: {
            type: String,
            default: '/deleteFromBasket.json'
        },
        isVisible:{
            type: Boolean,
            default: false,

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
                for (const el of data.contents) {
                    this.goods.push(el);
                }
                this.goodsChanged();
            });
    },
    components: {
        'cart-item': CartItem
    },
    template:
        `<div class="cart-block" :class="{invisible: !isVisible}">
            <cart-item v-for="item in goods" v-bind="item" :key="item.id_product" v-on:delete-me="deleteItem"></cart-item>
            <p v-if="goods.length === 0">Корзина пуста</p>
        </div>`,
    methods: {
        deleteItem(id) {
            const index = this.goods.findIndex(item => item.id_product === id);
            if (index < 0) return;
            this.deleteJson(`${this.url}/${id}`)
                .then(data => {
                    if (data.result === 1) {
                        this.goods.splice(index, 1);
                        this.goodsChanged();
                    }
                })
        },
        addProduct(prod) {
            let product = this.$children.find(item => item.id_product === prod.id_product);
            if (product) {
               this.putJson(`${this.url}/${product.id_product}`, {quantity: 1})
                   .then(data => {
                       if (data.result === 1) {
                           product.addProduct();
                       }
                   })
            } else {
                prod.quantity = 1;
                this.postJson(this.url, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.goods.push(prod);
                            this.goodsChanged();
                        }
                    });
            }
        },
        goodsChanged() {
            this.$emit('goods-changed', this.goods.length);
        }
    },
    computed: {
        length() {
            return this.goods.length;
        }
    }
}