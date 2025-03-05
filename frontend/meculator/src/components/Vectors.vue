<template>
  <div class="d-flex p-0">
    <div class="btn-group-vertical align-self-start"
      role="group" aria-label="Vertical button group">

      <!-- Select Mode -->
      <button
        class="btn btn-dark"
        v-if="!on_a_mode"
        @click="select_mode=true"
      >
        <i class="bi bi-check-square"></i>
      </button>

      <!-- Input Mode, Add Vector -->
      <button
        class="btn btn-dark"
        v-if="!on_a_mode"
        @click="input_mode=true"
      >
        <i class="bi bi-plus-lg"></i>
      </button>

      <!-- Get Out Input Mode -->
      <button
        class="btn btn-dark"
        v-if="input_mode"
        @click="input_mode=false"
      >
        <i class="bi bi-x-lg"></i>
      </button>

      <!-- Deselect All -->
      <button
        class="btn btn-dark"
        v-if="just_select_mode"
        @click="deselect_all()"
      >
        <i class="bi bi-square"></i>
      </button>

      <!-- Select All -->
      <button
        class="btn btn-dark"
        v-if="just_select_mode && selection_count < vectors.length"
        @click="select_all()"
      >
        <i class="bi bi-list-check"></i>
      </button>

      <!-- Move Selection Up -->
      <button class="btn btn-dark" v-if="just_select_mode">
        <i class="bi bi-arrow-up-square"></i>
      </button>

      <!-- Check Vector -->
      <button class="btn btn-dark" v-if="just_select_mode">
        <i class="bi bi-check-lg"></i>
      </button>

      <!-- Move Selection Down -->
      <button class="btn btn-dark" v-if="just_select_mode">
        <i class="bi bi-arrow-down-square"></i>
      </button>

      <!-- Delete Vector -->
      <button
        class="btn btn-dark"
        v-if="selection_count > 0 && !input_mode"
      >
        <i class="bi bi-trash3"></i>
      </button>

      <!-- Save Input Vector -->
      <button class="btn btn-dark" v-if="input_mode">
        <i class="bi bi-floppy"></i>
      </button>

      <!-- Edit Vector -->
      <button
        class="btn btn-dark" 
        v-if="selection_count === 1 && !input_mode"
        @click="input_mode=true"
      >
        <i class="bi bi-pencil"></i>
      </button>

      <!-- Operation Mode -->
      <button class="btn btn-dark" v-if="selection_count > 1">
        <i class="bi bi-calculator"></i>
      </button>

      <!-- Reload Data -->
      <button class="btn btn-dark" v-if="selection_count > 1">
        <i class="bi bi-arrow-clockwise"></i>
      </button>

      <!-- Reload Data -->
      <button class="btn btn-dark">
        <i class="bi bi-arrow-repeat"></i>
      </button>

      <!-- Next Page -->
      <button class="btn btn-dark">
        <i class="bi bi-chevron-double-right"></i>
      </button>

      <!-- Previous Page -->
      <button class="btn btn-dark">
        <i class="bi bi-chevron-double-left"></i>
      </button>

      <!-- Out -->
      <button class="btn btn-dark">
        <i class="bi bi-box-arrow-left"></i>
      </button>

    </div>

    <div class="flex-grow-1">
      <table
        class="table table-dark table-hover table-responsive table-striped-columns"
      >
        <thead>
          <tr>
            <th scope="col" v-show="just_select_mode">Select</th>
            <th scope="col" v-for="att in attributes">{{ att }}</th>
          </tr>
        </thead>

        <tbody class="table-group-divider rounded">
          <template v-for="vec in vectors">
            <tr>
              <td v-show="just_select_mode">
                <input class="form-check-input me-1" 
                  type="checkbox" 
                  v-model="vec.is_selected"
                  @click="change_count(!vec.is_selected)"
                >
              </td>
              <th>{{ vec.name }}</th>
              <td>{{ vec.value }}</td>
              <td>{{ vec.x }}</td>
              <td>{{ vec.y }}</td>
              <td>{{ vec.z }}</td>
            </tr>
            <tr v-if="edit_mode && vec.is_selected">
              <th>{{ vec.name }}</th>
              <td>{{ vec.value }}</td>
              <td>{{ vec.x }}</td>
              <td>{{ vec.y }}</td>
              <td>{{ vec.z }}</td>
            </tr>
          </template>
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
import { ref, reactive, computed, watch } from 'vue'

defineProps({
})

const attributes = ref([
  'Vector name',
  'Value',
  'x',
  'y',
  'z'
])

const on_a_mode = computed(() => {
  return select_mode.value || input_mode.value
})

const just_select_mode = computed(() => {
  return select_mode.value && !input_mode.value
})

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

let input_mode = ref(false)


const vectors = reactive([
  { is_selected: false, name: 'Lorem', value: 30, x: 30, y: 0, z: 0 },
  { is_selected: false, name: 'ips', value: 30, x: 0, y: 30, z: 0 },
  { is_selected: false, name: 'um', value: 30, x: 0, y: 0, z: 30 }
])

let new_vector = reactive({
  is_selected: false,
  name: '',
  value: 0,
  x: 0,
  y: 0,
  z: 0
})

watch([select_mode, input_mode],
  ([new_select_mode, new_input_mode], [old_select_mode, old_input_mode]) => {
    if (new_select_mode && new_input_mode) {
      for (let vec in vector) {
        if (vec.is_selected) {
          new_vector.name = vec.name
          break
        }
      }
    }
    else if (!new_input_mode) {
      new_vector = {
        is_selected: false,
        name: '',
        value: 0,
        x: 0,
        y: 0,
        z: 0
      }
    }
})

</script>
