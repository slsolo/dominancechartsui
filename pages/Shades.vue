<script setup>
const config = useRuntimeConfig();
const { pending, error, data: shades } = await useFetch(`${config.apiHost}api/v1/Other`);

</script>

<template>
  <section>
    <h1>Shades</h1>
    <p v-if="pending">Fetching Shades...</p>
    <p v-else-if="error">An error occured {{ error.message }}</p>
    <div v-else>
      <TraitComparison :traits="shades" type="Shade"></TraitComparison>
    </div>
  </section>
</template>
