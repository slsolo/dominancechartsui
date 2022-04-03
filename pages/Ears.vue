<script>
export default {
  name: 'EarsView',
  data() {
    return {
      ears: [],
      loading: false,
      first: '',
      second: '',
      result: '',
      error: '',
    }
  },
  async fetch() {
    this.ears = await fetch(`${this.$config.apiHost}api/Ears/names`, {
      method: 'get',
    }).then((res) => res.json())
  },
  methods: {
    async fetchCompare() {
      this.loading = true
      try {
        const ey = await this.$axios.$get(
          `${this.$config.apiHost}api/Ears/compare/${this.first}/${this.second}`
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
    <h1>Ears</h1>
    <p v-if="$fetchState.pending">Fetching Ears...</p>
    <p v-else-if="$fetchState.error">
      An error occured {{ $fetchState.error.message }}
    </p>
    <div v-else>
      <p>first</p>
      <select v-model="first">
        <option v-for="(item, key) in ears" :key="key" :value="item">
          {{ item }}
        </option>
      </select>
      <p>second</p>
      <select v-model="second">
        <option v-for="(item, key) in ears" :key="key" :value="item">
          {{ item }}
        </option>
      </select>
      <button @click="fetchCompare">Check</button>
      <p v-if="!loading && result">{{ result }}</p>
      <p v-else>{{ error }}</p>
    </div>
  </main>
</template>
