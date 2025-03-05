<template>
  <div class="d-flex p-0">
    <div class="btn-group-vertical align-self-start"
      role="group" aria-label="Vertical button group">

      <button class="btn btn-dark" v-for="option in options">{{ option.name }}</button>
    </div>

    <div class="flex-grow-1">
      <table class="table table-dark table-hover table-responsive table-striped-columns">
        <thead>
          <tr>
            <th scope="col" v-show="options[0].active">Select</th>
            <th scope="col" v-for="att in attributes">{{ att }}</th>
          </tr>
        </thead>

        <tbody class="table-group-divider rounded">
          <tr v-for="vec in vectors">
            <td v-show="options[0].active">Ah</td>
            <th scope="row">{{ vec.name }}</th>
            <td>{{ vec.value }}</td>
            <td>{{ vec.x }}</td>
            <td>{{ vec.y }}</td>
            <td>{{ vec.z }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

<script setup>
import { ref, reactive } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
const attributes = ref([
  'Vector name',
  'Value',
  'x',
  'y',
  'z'
])

const vectors = reactive([
  { name: 'Lorem', value: 30, x: 30, y: 0, z: 0 },
  { name: 'ips', value: 30, x: 0, y: 30, z: 0 },
  { name: 'um', value: 30, x: 0, y: 0, z: 30 }
])

const options = reactive([
  { name: 'Selection', event: 'select', active: false },
  { name: 'Operation', event: 'operate', active: false},
  { name: 'Get Unit Vector', event: 'to_unit', active: false},
])
</script>
