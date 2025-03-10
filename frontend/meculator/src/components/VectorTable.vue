<template>
<vee-form :validationSchema="validationSchema">
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
            <td v-show="false"> Just to fix columns visual </td>
            <td 
              v-for="field in store.fields_config"
            >
              <div class="d-flex flex-column mb-3">
                <vee-field 
                  :name="field.name" 
                  v-model="store.input_vector[field.name]"
                  :placeholder="field.placeholder"
                  :type="field.type"
                  class="form-control-sm p-2"
                />
                <error-message
                  class="text-danger p-2"
                  :name="field.name"
                />
              </div>
            </td>
        </tr>

        <template v-for="(vec, index) in store.vectors">
          <tr>
              <td v-show="store.just_selecting">
                <input
                  class="form-check-input me-1" 
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
</vee-form>
</template>

<style scoped>
</style>

<script setup>
import { useVectorsStore } from '@/stores/VectorsStore';
import { useForm } from 'vee-validate';

const store = useVectorsStore()

const validationSchema = {
  name: 'required|min:3',
  value: 'required|alpha_dash',
  x: 'required|alpha_dash',
  y: 'required|alpha_dash',
  z: 'required|alpha_dash',
}

const { errors, errorBag, handleSubmit } = useForm({
  validationSchema,
  initialValues: store.input_vector,
});

</script>
