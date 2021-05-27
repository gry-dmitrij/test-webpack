export const Search = {
    name: 'search',
    data() {
        return {
            searchLine: ''
        }
    },
    template:
        `<div>
            <input type="text" class="search-field" v-model="searchLine">
            <button class="btn-search" type="submit" @click.prevent="filterGoods()">
                <i class="fas fa-search"></i>
            </button>
        </div>`,
    methods: {
        filterGoods() {
            this.$emit('filter', this.searchLine);
        }
    }
}