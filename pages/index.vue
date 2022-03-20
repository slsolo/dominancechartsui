<script>
export default ({
  name: "Home",
  data() {
    return {
      furs: [],
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
        const ey = await this.$axios.$get(`${apiHost}api/Fur/compare/${this.first}/${this.second}`);
        this.result = ey;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },

  },
  async fetch() {
    this.furs = await fetch(`${apiHost}api/Fur/names`, {
      method: 'get'
    }).then(res => res.json())
  }
});
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
