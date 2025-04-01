import { defineStore } from 'pinia';

export const useVectorsStore = defineStore('vectors', {
    state: () => {
        return {

            select_mode : false,
            selected_vectors: [],
            input_mode : false,
            show_more_options: false,

            vectors : [
                { is_selected: false, name: 'Lorem', value: 30, x: 30, y: 0, z: 0 },
                { is_selected: false, name: 'ips', value: 30, x: 0, y: 30, z: 0 },
                { is_selected: false, name: 'um', value: 30, x: 0, y: 0, z: 30 }
            ],
            
            input_vector : {
                is_selected: false,
                name: '',
                value: 0,
                x: 0,
                y: 0,
                z: 0
            },

            validationSchema : {
                name:   'required|min:3',
                value:  'required|decimal:3',
                x:      'required|decimal:3',
                y:      'required|decimal:3',
                z:      'required|decimal:3',
            },
            
        }
    },
    getters: {
        on_a_mode: (state) => state.select_mode || state.input_mode || state.show_more_options,
        just_selecting: (state) => state.select_mode && !state.input_mode && !state.show_more_options,
        selection_count: (state) => state.selected_vectors.length,
    },
    actions: {
        deselect_all() {
            this.selected_vectors.forEach((index) =>
                this.vectors[index].is_selected = false
            )

            this.selected_vectors = []
            this.select_mode = false
        },
        select_all() {
            this.vectors.forEach((vec, index) => 
                {
                    vec.is_selected = true
                    this.selected_vectors.push(index)
                }
            )
        },
        change_count(vector, vector_index) {
            if (!vector.is_selected) {
                this.selected_vectors.push(vector_index)
            } else {
                this.selected_vectors = 
                    this.selected_vectors.filter((index) => vector_index !== index)
            }
        },
        update_input_vector(new_values) {
            this.input_vector = { 
                ...this.input_vector, 
                ...new_values 
            }
        },
        enter_edit_mode() {
            this.input_vector = { ...this.vectors[this.selected_vectors[0]] }
            this.input_mode = true
        },
        save_vector() {
            if (this.select_mode) {
                this.input_vector.is_selected = true
                
                console.log(
                    'Updating vector:', this.vectors[this.selected_vectors[0]], " => ", 
                    this.input_vector
                )

                this.vectors[this.selected_vectors[0]] = this.input_vector
                console.log('Vector Updated!')
                this.input_mode = false
            }
            else {
                console.log('Adding vector: ', this.input_vector)
                this.vectors.push(this.input_vector)
                console.log('Vector Added!')
                this.input_mode = false
            }
        },
        switch_show_more_options() { 
            this.show_more_options = !this.show_more_options
        },
    }
});