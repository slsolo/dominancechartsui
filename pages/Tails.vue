<script setup>
const config = useRuntimeConfig().public;
const { pending, error, data: tails } = await useFetch(`${config.apiHost}api/v1/Tails`);

</script>

<template>
  <section>
    <h1>Tails</h1>
    <p v-if="pending">Fetching Tails...</p>
    <p v-else-if="error">An error occured {{ error.message }}</p>
    <div v-else>
      <TraitComparison :traits="tails" type="Tail"></TraitComparison>
    </div>
  </section>
</template>
