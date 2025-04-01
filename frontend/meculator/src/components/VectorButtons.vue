<template>
    <div
        class="btn-group-vertical align-self-start"
        role="group"
        aria-label="Vertical button group"
    >
        <TransitionGroup name="fade">
            <button 
                v-for="btn in visibleButtons"
                :key="btn.icon"
                class="btn btn-dark"
                @click="btn.action"
                :disabled="btn.disabled">
                <i :class="`bi bi-${btn.icon}`"></i>
            </button>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 2px 0;
}

.btn:hover {
  transform: scale(1.05);
}

.fade-move {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.btn-group-vertical {
  position: relative;
  min-height: 38px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.btn-group-vertical > * {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

<script setup>
import { useVectorsStore } from '@/stores/VectorsStore';
import { validate } from 'vee-validate';
import { ref, watch, computed } from 'vue';

const store = useVectorsStore()
let is_savable = ref(false)

const visibleButtons = computed(() => 
    buttons.value.filter(btn => btn.condition)
)

const buttons = computed(() => [
    {
        icon: 'check-square',
        condition: !store.on_a_mode,
        action: () => store.select_mode = true,
        disabled: false
    },
    {
        icon: 'plus-lg',
        condition: !store.on_a_mode,
        action: () => store.input_mode = true,
        disabled: false
    },
    {
        icon: 'x-lg',
        condition: store.input_mode,
        action: () => store.input_mode = false,
        disabled: false
    },
    {
        icon: 'square',
        condition: store.just_selecting,
        action: () => store.deselect_all(),
        disabled: false
    },
    {
        icon: 'list-check',
        condition: store.just_selecting && store.selection_count < store.vectors.length,
        action: () => store.select_all(),
        disabled: false
    },
    {
        icon: 'arrow-up-square',
        condition: store.just_selecting,
        action: () => {},
        disabled: false  
    },
    {
        icon: 'check-lg',
        condition: store.just_selecting,
        action: () => {},
        disabled: false  
    },
    {
        icon: 'arrow-down-square',
        condition: store.just_selecting,
        action: () => {},
        disabled: false  
    },
    {
        icon: 'trash3',
        condition: store.selection_count > 0 && !store.input_mode,
        action: () => {},
        disabled: false  
    },
    {
        icon: 'floppy',
        condition: store.input_mode,
        action: () => store.save_vector(),
        disabled: !is_savable
    },
    {
        icon: 'pencil',
        condition: store.selection_count === 1 && !store.input_mode,
        action: () => store.enter_edit_mode(),
        disabled: false
    },
    {
        icon: 'calculator',
        condition: store.selection_count > 1,
        action: () => {},
        disabled: false  
    },
    {
        icon: 'arrow-clockwise',
        condition: store.selection_count > 1,
        action: () => {},
        disabled: false  
    },
    {
        icon: 'three-dots-vertical',
        condition: !store.on_a_mode || store.show_more_options,
        action: () => store.switch_show_more_options(),
        disabled: false
    },
    {
        icon: 'arrow-repeat',
        condition: store.show_more_options,
        action: () => {},
        disabled: false  
    },
    {
        icon: 'chevron-double-right',
        condition: store.show_more_options,
        action: () => {},
        disabled: false  
    },
    {
        icon: 'chevron-double-left',
        condition: store.show_more_options,
        action: () => {},
        disabled: false  
    },
    {
        icon: 'box-arrow-left',
        condition: store.show_more_options,
        action: () => {},
        disabled: false  
    }
])

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