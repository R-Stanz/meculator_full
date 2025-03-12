<template>
<vee-form :validationSchema="schema">
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
              class="m-0"
            >
              <div class="d-flex flex-column m-0">
                <vee-field 
                  :name="field.name" 
                  v-model="values[field.name]"
                  :placeholder="field.placeholder"
                  :type="field.type"
                  class="form-control-sm"
                />
                <error-message
                  class="text-danger mt-1"
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
            <td v-show="false" />
            <td 
              v-for="field in store.fields_config"
              class="m-0"
            >
              <div class="d-flex flex-column m-0">
                <vee-field 
                  :name="field.name" 
                  v-model="values[field.name]"
                  :placeholder="vec[field.name]"
                  :type="field.type"
                  class="form-control-sm"
                  :disabled="field.name === 'name'"
                />
                <error-message
                  class="text-danger mt-1"
                  :name="field.name"
                />
              </div>
            </td>
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
import { reactive, watch } from 'vue';

const store = useVectorsStore()

const schema = store.validationSchema
let values = reactive(store.input_vector)

const { errors, handleSubmit } = useForm({
  schema,
  initialValues: store.input_vector,
});

watch (() => store.input_mode, (new_value) =>
  {
    if (new_value && store.select_mode) {
      values = reactive(store.input_vector)
    }
  }
)

watch (values, (new_values) => 
  {
    store.$patch((state) =>{
      state.input_vector = {
        ...state.input_vector,
        ...new_values
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)

</script>
