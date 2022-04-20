<script setup>
const config = useRuntimeConfig().public;
const { pending, error, data: whiskerShapes } = await useFetch(`${config.apiHost}api/v1/Whisker%20Shape`);

</script>

<template>
  <section>
    <h1>Whisker Shapes</h1>
    <p v-if="pending">Fetching Whisker Shapes...</p>
    <p v-else-if="error">An error occured {{ error.message }}</p>
    <div v-else>
      <TraitComparison :traits="whiskerShapes" type="Whisker Shape"></TraitComparison>
    </div>
  </section>
</template>
