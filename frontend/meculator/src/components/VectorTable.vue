<template>
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
</template>

<style scoped>
</style>

<script setup>
import { useVectorsStore } from '@/stores/VectorsStore';

const store = useVectorsStore()
/*
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
*/

</script>
