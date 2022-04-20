<script setup>
const config = useRuntimeConfig().public;
const { pending, error, data: furs } = await useFetch(`${config.apiHost}api/v1/Fur`);

</script>

<template>
  <section>
    <h1>Furs</h1>
    <p v-if="pending">Fetching Furs...</p>
    <p v-else-if="error">An error occured {{ error.message }}</p>
    <div v-else>
    <TraitComparison :traits="furs" type="Fur"></TraitComparison>
          </div>
  </section>
</template>
