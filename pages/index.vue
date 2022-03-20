<script>
export default {
  name: 'HomeView',
  data() {
    return {
      furs: [],
      loading: false,
      first: '',
      second: '',
      result: '',
      error: '',
    }
  },
  async fetch({ $config: { apiHost } }) {
    this.furs = await fetch(`${apiHost}api/Fur/names`, {
      method: 'get',
    }).then((res) => res.json())
  },
  methods: {
    async fetchCompare({ $config: { apiHost } }) {
      this.loading = true
      try {
        const ey = await this.$axios.$get(
          `${apiHost}api/Fur/compare/${this.first}/${this.second}`
        )
        this.result = ey
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <main>
    <h1>Furs</h1>
    <p v-if="$fetchState.pending">Fetching Furs...</p>
    <p v-else-if="$fetchState.error">An error occured {{ $fetchState.error.message }}</p>
    <div v-else>
      <p>first</p>
      <select v-model="first">
        <option v-for="(item, key) in furs" :key="key" :value="item">{{ item }}</option>
      </select>
      <p>second</p>
      <select v-model="second">
        <option v-for="(item, key) in furs" :key="key" :value="item">{{ item }}</option>
      </select>
      <button @click="fetchCompare">Check</button>
      <p v-if="!loading && result">{{ result }}</p>
      <p v-else>{{ error }}</p>
    </div>
  </main>
</template>
