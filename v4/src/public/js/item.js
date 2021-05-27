export let Item = {
    props: {
        id_product: {
            type: Number,
            default: 0,
            required: true
        },
        product_name: {
            type: String,
            default: '',
            required: true
        },
        price: {
            type: Number,
            default: 0,
            required: true
        },
        img: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: ''
        }

    }
}