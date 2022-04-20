<script setup>
const config = useRuntimeConfig().public;
const { pending, error, data: eyes } = await useFetch(`${config.apiHost}api/v1/Eyes`);

</script>

<template>
  <section>
    <h1>Eyes</h1>
    <p v-if="pending">Fetching Eyes...</p>
    <p v-else-if="error">An error occured {{ error.message }}</p>
    <div v-else>
      <TraitComparison :traits="eyes" type="Eye"></TraitComparison>
    </div>
  </section>
</template>
