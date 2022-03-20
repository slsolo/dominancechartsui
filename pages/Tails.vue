<script>
export default ({
  name: "Tails",
  data() {

    return {
      tails: [],
      loading: false,
      first: "",
      second: "",
      result: "",
      error: ""
    }
  },
  methods: {
    async fetchCompare() {
      this.loading = true;
      try {
        const ey = await this.$axios.$get(`${apiHost}api/Tails/compare/${this.first}/${this.second}`);
        this.result = ey;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
  },
  async fetch() {
    this.tails = await fetch(`${apiHost}api/Tails/names`, {
      method: 'get'
    }).then(res => res.json())
  }
});
</script>

<template>
  <main>
    <h1>Tails</h1>
    <p v-if="$fetchState.pending">Fetching Tails...</p>
    <p v-else-if="$fetchState.error">An error occured {{ $fetchState.error.message }}</p>
    <div v-else>
      <p>first</p>
      <select v-model="first">
        <option v-for="(item, key) in tails" :key="key" :value="item">{{ item }}</option>
      </select>
      <p>second</p>
      <select v-model="second">
        <option v-for="(item, key) in tails" :key="key" :value="item">{{ item }}</option>
      </select>
      <button @click="fetchCompare">Check</button>
      <p v-if="!loading && result">{{ result }}</p>
      <p v-else>{{ error }}</p>
    </div>
  </main>
</template>
