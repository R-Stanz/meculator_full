import { defineStore } from 'pinia';

export const useVectorsStore = defineStore('vectors', {
    state: () => {
        return {
            attributes : [
                'Vector name',
                'Value',
                'x',
                'y',
                'z'
            ],

            select_mode : false,
            selected_vectors: [],
            input_mode : false,

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

            fields_config : [
                {name: 'name', type: 'text', placeholder: 'Vector Name'},
                {name: 'value', type: 'number', placeholder: '0.00'},
                {name: 'x', type: 'number', placeholder: '0.00'},
                {name: 'y', type: 'number', placeholder: '0.00'},
                {name: 'z', type: 'number', placeholder: '0.00'}
            ]
            
        }
    },
    getters: {
        on_a_mode: (state) => state.select_mode || state.input_mode,
        just_selecting: (state) => state.select_mode && !state.input_mode,
        selection_count: (state) => state.selected_vectors.length,
    },
    actions: {
        deselect_all() {
            this.$reset()
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
    }
});