<script setup>
const first = ref(0);
const second = ref(0);
let result = ref("");

const props = defineProps(['traits', 'type'])
function fetchCompare() {
  if (first.value === second.value) {
    result.value = `Both ${props.type}s are the same`
  } else {
    let flt1 = props.traits.filter((item) => {
      return item.position === first.value
    })
    let flt2 = props.traits.filter((item) => {
      return item.position === second.value
    })

    if (first.value < second.value) {
      result.value = `${flt1[0].name} is dominant to ${flt2[0].name}`
    } else {
      result.value = `${flt1[0].name} is recessive to ${flt2[0].name}`
    }
  }
}
</script>

<template>
  <div>
    <p>First {{ type }}</p>
    <select v-model="first">
      <option
        v-for="(item, key) in traits"
        :key="key"
        :value="item['position']"
      >{{ item["name"] }}{{ item["retired"] ? " (retired)" : "" }}{{ item["limited_edition"] ? " (Ltd. Release)" : "" }}{{ item["initial_release"] ? " *" : "" }}</option>
    </select>
    <p>Second {{ type }}</p>
    <select v-model="second">
      <option
        v-for="(item, key) in traits"
        :key="key"
        :value="item['position']"
      >{{ item["name"] }}{{ item["retired"] ? " (retired)" : "" }}{{ item["limited_edition"] ? " (Ltd. Release)" : "" }}{{ item["initial_release"] ? " *" : "" }}</option>
    </select>
    <button @click="fetchCompare">Check</button>
    <p>{{ result }}</p>
  </div>
</template>

<style scoped></style>
