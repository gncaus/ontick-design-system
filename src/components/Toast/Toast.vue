<template>
  <Teleport to="body">
    <Transition :name="transitionName">
      <div
        v-if="store.visible && store.payload"
        class="fixed z-50 flex items-start gap-3 rounded-2xl p-4 shadow-2xl"
        :class="positionClass"
        :style="{ background: 'var(--color-ontick-steel-500)', width: '400px' }"
      >
        <!-- Label pill -->
        <span
          v-if="store.payload.label"
          class="shrink-0 self-start text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg"
          :class="labelClasses"
        >
          {{ store.payload.label }}
        </span>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <p class="text-white font-semibold text-sm leading-snug">
            {{ store.payload.title }}
          </p>
          <p
            v-if="store.payload.description"
            class="text-sm mt-1 leading-relaxed"
            style="color: var(--color-ontick-steel-300)"
          >
            {{ store.payload.description }}
          </p>
        </div>

        <!-- Close button -->
        <button
          @click="store.hide()"
          class="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors bg-black/20 hover:bg-black/40"
          aria-label="Fechar"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1L9 9M9 1L1 9" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToastStore } from './toast.store'
import type { ToastLabelVariant, ToastPosition } from './toast.store'

const store = useToastStore()

// --- Label ---

const variantClasses: Record<ToastLabelVariant, string> = {
  purple: 'bg-ontick-purple-600 text-white',
  blue:   'bg-ontick-blue-500 text-white',
  green:  'bg-ontick-green-500 text-white',
  red:    'bg-ontick-red-500 text-white',
  orange: 'bg-ontick-orange-500 text-white',
  lime:   'bg-ontick-lime-300 text-ontick-carbon-900',
  pink:   'bg-ontick-pink-500 text-white',
}

const labelClasses = computed(() =>
  variantClasses[store.payload?.labelVariant ?? 'purple']
)

// --- Position ---

const positionClasses: Record<ToastPosition, string> = {
  'top-right':     'top-5 right-5',
  'top-left':      'top-5 left-5',
  'top-center':    'top-5 left-1/2 -ml-[200px]',
  'bottom-right':  'bottom-5 right-5',
  'bottom-left':   'bottom-5 left-5',
  'bottom-center': 'bottom-5 left-1/2 -ml-[200px]',
}

const positionClass = computed(() => positionClasses[store.activePosition])

// Nome da transição muda conforme a posição — cada uma tem seu próprio keyframe CSS global
const transitionName = computed(() =>
  store.activePosition.startsWith('bottom') ? 'toast-bottom' : 'toast-top'
)
</script>

<!--
  Não usar "scoped": elementos teletransportados pelo <Teleport> ficam fora
  do escopo do componente no DOM, quebrando os seletores com data-v-*.
-->
<style>
.toast-top-enter-active,
.toast-top-leave-active,
.toast-bottom-enter-active,
.toast-bottom-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.toast-top-enter-from,
.toast-top-leave-to {
  opacity: 0;
  transform: translateY(-14px);
}

.toast-bottom-enter-from,
.toast-bottom-leave-to {
  opacity: 0;
  transform: translateY(14px);
}
</style>
