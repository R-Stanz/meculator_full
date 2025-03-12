<template>
<div class="btn-group-vertical align-self-start"
    role="group" aria-label="Vertical button group">

    <!-- Select Mode -->
    <button
        class="btn btn-dark"
        v-if="!store.on_a_mode"
        @click="store.select_mode=true"
    >
        <i class="bi bi-check-square"></i>
    </button>

    <!-- Input Mode, Add Vector -->
    <button
        class="btn btn-dark"
        v-if="!store.on_a_mode"
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
        v-if="store.just_selecting"
        @click="store.deselect_all()"
    >
        <i class="bi bi-square"></i>
    </button>

    <!-- Select All -->
    <button
        class="btn btn-dark"
        v-if="store.just_selecting && store.selection_count < store.vectors.length"
        @click="store.select_all()"
    >
        <i class="bi bi-list-check"></i>
    </button>

    <!-- Move Selection Up -->
    <button 
        class="btn btn-dark"
        v-if="store.just_selecting"
    >
        <i class="bi bi-arrow-up-square"></i>
    </button>

    <!-- Check Vector -->
    <button
        class="btn btn-dark"
        v-if="store.just_selecting"
    >
        <i class="bi bi-check-lg"></i>
    </button>

    <!-- Move Selection Down -->
    <button
        class="btn btn-dark"
        v-if="store.just_selecting"
    >
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
    <button
        class="btn btn-dark"
        @click="store.save_vector()"
        v-if="store.input_mode"
        :disabled="!is_savable"
    >
        <i class="bi bi-floppy"></i>
    </button>

    <!-- Edit Vector -->
    <button
        class="btn btn-dark" 
        v-if="store.selection_count === 1 && !store.input_mode"
        @click="store.enter_edit_mode()"
    >
        <i class="bi bi-pencil"></i>
    </button>

    <!-- Operation Mode -->
    <button
        class="btn btn-dark"
        v-if="store.selection_count > 1"
    >
        <i class="bi bi-calculator"></i>
    </button>

    <!-- Reload Data -->
    <button
        class="btn btn-dark"
        v-if="store.selection_count > 1"
    >
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

</template>

<style scoped>
</style>

<script setup>
import { useVectorsStore } from '@/stores/VectorsStore';
import { validate } from 'vee-validate';
import { ref, watch } from 'vue';

const store = useVectorsStore()

let is_savable =  ref(false)

watch(() => store.input_vector,
    async (new_vector) => {
        const schema_entries = Object.entries(store.validationSchema)
        const validations = await Promise.all(
            schema_entries.map(async ([field, rule]) => {
                const validation = await validate(store.input_vector[field], rule)
                return validation.valid
            })
        )
        is_savable.value = validations.every(valid => valid)
    },
    { immediate: true }
)

</script>