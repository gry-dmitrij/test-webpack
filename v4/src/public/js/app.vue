<template>
  <div>
    <input type="text" class="search-field" v-model="searchLine">
    <button class="btn-search" type="submit" @click.prevent="filterGoods()">
      <i class="fas fa-search"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      searchLine: ''
    }
  },
  methods: {
    filterGoods() {
      this.$emit('filter', this.searchLine);
    }
  }
}
</script>

<style lang="scss">
.btn-search{
  color: red;
}
</style>