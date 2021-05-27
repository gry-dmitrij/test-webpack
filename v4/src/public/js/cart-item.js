import {GetData} from "./get-data";
import {Item} from "./item";

export const CartItem = {
    mixins: [Item, GetData],
    props: {
        quantity: {
            type: Number,
            default: 1,
            required: false
        },
        url: {
            type: String,
            default: '/api/cart'
        }
    },
    data: function () {
        return {
            countItem: this.quantity
        }
    },
    template:
        `<div class="cart-item" :data-id="id_product">
            <div class="product-bio">
                <img :src="img" width="80" alt="Some img">
                <div class="product-desc">
                    <p class="product-title">{{product_name}}</p>
                    <p class="product-quantity">Количество: {{countItem}}</p>
                    <p class="product-single-price">{{price}} за ед.</p>
                </div>
                <div class="right-block">
                    <p class="product-price">{{sumPrice}} ₽</p>
                    <button class="del-btn" :data-id="id_product" v-on:click="subProduct">×</button>
                </div>
            </div>
        </div>`,
    computed: {
        sumPrice: function () {
            return this.price * this.countItem;
        }
    },
    methods: {
        subProduct() {
            if (this.countItem === 1) {
                this.$emit('delete-me', this.id_product);
            } else {
                this.putJson(`${this.url}/${this.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result === 1) {
                            this.countItem--;
                        }
                    });
            }
        },
        addProduct(amount = 1) {
            this.countItem += amount;
        }
    }
}