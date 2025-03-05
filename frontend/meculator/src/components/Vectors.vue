<template>
  <div class="d-flex p-0">
    <div class="btn-group-vertical align-self-start"
      role="group" aria-label="Vertical button group">

      <button class="btn btn-dark" v-if="!select_mode" @click="select_mode=true">
        <i class="bi bi-check-square"></i>
      </button>

      <button class="btn btn-dark" v-if="select_mode" @click="deselect_all()">
        <i class="bi bi-square"></i>
      </button>

      <button class="btn btn-dark" v-if="select_mode && selection_count < vectors.length"
       @click="select_all()"
      >
        <i class="bi bi-list-check"></i>
      </button>

      <button class="btn btn-dark" v-if="selection_count > 0">
        <i class="bi bi-pencil"></i>
      </button>

      <button class="btn btn-dark" v-if="selection_count > 0">
        <i class="bi bi-trash3"></i>
      </button>

      <button class="btn btn-dark" v-if="selection_count > 1">
        <i class="bi bi-calculator"></i>
      </button>

      <button class="btn btn-dark" v-if="selection_count > 1">
        <i class="bi bi-arrow-clockwise"></i>
      </button>

      <button class="btn btn-dark" v-if="select_mode">
        <i class="bi bi-arrow-up-square"></i>
      </button>

      <button class="btn btn-dark" v-if="select_mode">
        <i class="bi bi-check-lg"></i>
      </button>

      <button class="btn btn-dark" v-if="select_mode">
        <i class="bi bi-arrow-down-square"></i>
      </button>

      <button class="btn btn-dark">
        <i class="bi bi-arrow-repeat"></i>
      </button>

      <button class="btn btn-dark">
        <i class="bi bi-chevron-double-right"></i>
      </button>

      <button class="btn btn-dark">
        <i class="bi bi-chevron-double-left"></i>
      </button>

      <button class="btn btn-dark">
        <i class="bi bi-box-arrow-left"></i>
      </button>

    </div>

    <div class="flex-grow-1">
      <table class="table table-dark table-hover table-responsive table-striped-columns">
        <thead>
          <tr>
            <th scope="col" v-show="select_mode">Select</th>
            <th scope="col" v-for="att in attributes">{{ att }}</th>
          </tr>
        </thead>

        <tbody class="table-group-divider rounded">
          <tr v-for="(vec, index) in vectors" :key="index">
            <td v-show="select_mode">
              <input class="form-check-input me-1" 
                type="checkbox" 
                v-model="vec.is_selected"
                @click="change_count(!vec.is_selected)"
              >
            </td>
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
})

const attributes = ref([
  'Vector name',
  'Value',
  'x',
  'y',
  'z'
])

let select_mode = ref(false)
const selection_count = ref(0)

const deselect_all = () => {
  select_mode.value = false
  vectors.forEach(vec => vec.is_selected = false)
  selection_count.value = 0
}

const select_all = () => {
  vectors.forEach(vec => vec.is_selected = true)
  selection_count.value = vectors.length
}

const change_count = (is_selected) => {
  if (is_selected) {
    selection_count.value++
  } else {
    selection_count.value--
  }
}

const vectors = reactive([
  { is_selected: false, name: 'Lorem', value: 30, x: 30, y: 0, z: 0 },
  { is_selected: false, name: 'ips', value: 30, x: 0, y: 30, z: 0 },
  { is_selected: false, name: 'um', value: 30, x: 0, y: 0, z: 30 }
])

</script>
