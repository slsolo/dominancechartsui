<script setup>
const config = useRuntimeConfig().public;
const { pending, error, data: whiskerColours } = await useFetch(`${config.apiHost}api/v1/Whisker%20Colour`);

</script>

<template>
  <section>
    <h1>Whisker Colours</h1>
    <p v-if="pending">Fetching Whisker Colours...</p>
    <p v-else-if="error">An error occured {{ error.message }}</p>
    <div v-else>
      <TraitComparison :traits="whiskerColours" type="Whisker Colour"></TraitComparison>
    </div>
  </section>
</template>
