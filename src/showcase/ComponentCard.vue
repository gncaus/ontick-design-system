<template>
  <div class="rounded-xl overflow-hidden border border-white/[0.06] bg-ontick-carbon-500">

    <!-- Preview -->
    <div class="px-6 py-8 flex items-center justify-center min-h-32 bg-ontick-carbon-700 border-b border-white/[0.06]">
      <slot>
        <span class="text-ontick-steel-500 text-xs">sem preview</span>
      </slot>
    </div>

    <!-- Info -->
    <div class="p-4">
      <div class="flex items-center justify-between mb-1">
        <h3 class="text-white text-sm font-medium">{{ name }}</h3>
        <span class="text-xs px-1.5 py-0.5 rounded-full font-medium" :class="statusClasses">
          {{ statusLabel }}
        </span>
      </div>
      <p class="text-ontick-steel-400 text-xs leading-relaxed">{{ description }}</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    description: string
    status?: 'ready' | 'wip' | 'planned'
  }>(),
  { status: 'ready' }
)

const statusLabel = computed(() => {
  const map = { ready: 'Pronto', wip: 'Em dev', planned: 'Planejado' }
  return map[props.status]
})

const statusClasses = computed(() => {
  const map = {
    ready: 'bg-ontick-green-500/10 text-ontick-green-400',
    wip: 'bg-ontick-yellow-500/10 text-ontick-yellow-700',
    planned: 'bg-ontick-steel-500/10 text-ontick-steel-300',
  }
  return map[props.status]
})
</script>
