<script setup>
const config = useRuntimeConfig();
const { pending, error, data: ears } = await useFetch(`${config.apiHost}api/v1/Ears`);

</script>

<template>
  <section>
    <h1>Ears</h1>
    <p v-if="pending">Fetching Ears...</p>
    <p v-else-if="error">An error occured {{ error.message }}</p>
    <div v-else>
      <TraitComparison :traits="ears" type="Ear"></TraitComparison>
    </div>
  </section>
</template>
