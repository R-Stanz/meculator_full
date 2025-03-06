<template>
  <div class="d-flex p-0">
    <div class="btn-group-vertical align-self-start"
      role="group" aria-label="Vertical button group">

      <!-- Select Mode -->
      <button
        class="btn btn-dark"
        v-if="!store.is_on_a_mode"
        @click="store.select_mode=true"
      >
        <i class="bi bi-check-square"></i>
      </button>

      <!-- Input Mode, Add Vector -->
      <button
        class="btn btn-dark"
        v-if="!store.is_on_a_mode"
        @click="store.input_mode=true"
      >
        <i class="bi bi-plus-lg"></i>
      </button>

      <!-- Get Out Input Mode -->
      <button
        class="btn btn-dark"
        v-if="store.input_mode"
        @click="store.input_mode=false"
      >
        <i class="bi bi-x-lg"></i>
      </button>

      <!-- Deselect All -->
      <button
        class="btn btn-dark"
        v-if="store.is_just_on_select_mode"
        @click="store.deselect_all()"
      >
        <i class="bi bi-square"></i>
      </button>

      <!-- Select All -->
      <button
        class="btn btn-dark"
        v-if="store.is_just_on_select_mode && store.selection_count < store.vectors.length"
        @click="store.select_all()"
      >
        <i class="bi bi-list-check"></i>
      </button>

      <!-- Move Selection Up -->
      <button class="btn btn-dark" v-if="store.is_just_on_select_mode">
        <i class="bi bi-arrow-up-square"></i>
      </button>

      <!-- Check Vector -->
      <button class="btn btn-dark" v-if="store.is_just_on_select_mode">
        <i class="bi bi-check-lg"></i>
      </button>

      <!-- Move Selection Down -->
      <button class="btn btn-dark" v-if="store.is_just_on_select_mode">
        <i class="bi bi-arrow-down-square"></i>
      </button>

      <!-- Delete Vector -->
      <button
        class="btn btn-dark"
        v-if="store.selection_count > 0 && !store.input_mode"
      >
        <i class="bi bi-trash3"></i>
      </button>

      <!-- Save Input Vector -->
      <button class="btn btn-dark" v-if="store.input_mode">
        <i class="bi bi-floppy"></i>
      </button>

      <!-- Edit Vector -->
      <button
        class="btn btn-dark" 
        v-if="store.selection_count === 1 && !store.input_mode"
        @click="store.input_mode=true"
      >
        <i class="bi bi-pencil"></i>
      </button>

      <!-- Operation Mode -->
      <button class="btn btn-dark" v-if="store.selection_count > 1">
        <i class="bi bi-calculator"></i>
      </button>

      <!-- Reload Data -->
      <button class="btn btn-dark" v-if="store.selection_count > 1">
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
            <th scope="col" v-show="store.is_just_on_select_mode">Select</th>
            <th scope="col" v-for="att in store.attributes">{{ att }}</th>
          </tr>
        </thead>

        <tbody class="table-group-divider rounded">
          <template v-for="vec in store.vectors">
            <tr>
              <td v-show="store.is_just_on_select_mode">
                <input class="form-check-input me-1" 
                  type="checkbox" 
                  v-model="vec.is_selected"
                  @click="store.change_count(vec)"
                >
              </td>
              <th>{{ vec.name }}</th>
              <td>{{ vec.value }}</td>
              <td>{{ vec.x }}</td>
              <td>{{ vec.y }}</td>
              <td>{{ vec.z }}</td>
            </tr>
            <tr v-if="store.edit_mode && vec.is_selected">
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
</style>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useVectorsStore } from '@/stores/VectorsStore';

const store = useVectorsStore()

watch([store.select_mode, store.input_mode],
  ([new_select_mode, new_input_mode], [old_select_mode, old_input_mode]) => {
    if (new_select_mode && new_input_mode) {
      for (let vec in store.vector) {
        if (vec.is_selected) {
          store.new_vector = vec
          break
        }
      }
    }
    else if (!new_input_mode) {
      store.new_vector = {
        is_selected: false,
        name: '',
        value: 0,
        x: 0,
        y: 0,
        z: 0
      }
    }
  },
  { immediate: true }
)

</script>
