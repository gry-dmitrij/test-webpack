import {Item} from "./item";

export let GoodsItem = {
    mixins: [Item],
    props: {
        url: {
            type: String,
            default: ''
        }
    },
    template:
        `<div class="product-card">
            <a class="product-card__link" :data-id="id_product" :href="url">
                <img class="product-card__img" :src="img" :alt="product_name" height="420">
                <span class="product-card__name">{{product_name}}</span>
                <p class="product-card__desc font_general">{{description}}}</p>
                <span class="product-card__price">{{price}}</span>
            </a>
            <button class="product__add-btn"
                @click="addProduct">Add to Cart</button>
        </div>`,
    methods: {
        addProduct: function () {
            const product = {
                id_product: this.id_product,
                product_name: this.product_name,
                price: this.price,
                img: this.img,
                description: this.description
            };
            this.$emit('add-product', product);
        }
    }
}