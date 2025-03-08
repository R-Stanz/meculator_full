<template>
<div class="flex-grow-1">
    <table
    class="table table-dark table-hover table-responsive table-striped-columns"
    >
    <thead>
        <tr>
          <th scope="col" v-show="store.just_selecting">Select</th>
          <th scope="col" v-for="att in store.attributes">{{ att }}</th>
        </tr>
    </thead>

    <tbody class="table-group-divider rounded">
      <tr v-if="store.input_mode && !store.select_mode">
          <th v-show="false"> Just to fix columns visual </th>
          <th>{{ store.new_vector.name }}</th>
          <td>{{ store.new_vector.value }}</td>
          <td>{{ store.new_vector.x }}</td>
          <td>{{ store.new_vector.y }}</td>
          <td>{{ store.new_vector.z }}</td>
      </tr>
        <template v-for="(vec, index) in store.vectors">
        <tr>
            <td v-show="store.just_selecting">
            <input class="form-check-input me-1" 
                type="checkbox" 
                v-model="vec.is_selected"
                @click="store.change_count(vec, index)"
            >
            </td>
            <th>{{ vec.name }}</th>
            <td>{{ vec.value }}</td>
            <td>{{ vec.x }}</td>
            <td>{{ vec.y }}</td>
            <td>{{ vec.z }}</td>
        </tr>
        <tr v-if="store.input_mode && vec.is_selected">
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

</script>
