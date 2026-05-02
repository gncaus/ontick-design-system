<template>
  <div class="min-h-screen flex bg-ontick-carbon-900 text-white">

    <!-- Sidebar -->
    <aside class="w-60 min-h-screen bg-ontick-carbon-800 flex flex-col shrink-0 border-r border-white/[0.06]">

      <!-- Brand -->
      <div class="flex items-center gap-2.5 px-4 py-5 border-b border-white/[0.06]">
        <div class="w-6 h-6 rounded-md bg-ontick-lime-300 flex items-center justify-center shrink-0">
          <span class="text-ontick-carbon-900 text-xs font-bold leading-none">O</span>
        </div>
        <div>
          <p class="text-white text-sm font-semibold leading-tight">Ontick DS</p>
          <p class="text-ontick-steel-400 text-xs leading-tight mt-0.5">Design System</p>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-2 pt-3">
        <p class="text-ontick-steel-400 text-[10px] font-semibold tracking-widest px-2 pb-1.5">
          COMPONENTES
        </p>
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="activeCategory = cat.id"
          class="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors"
          :class="
            activeCategory === cat.id
              ? 'bg-ontick-carbon-500 text-white'
              : 'text-ontick-steel-300 hover:bg-ontick-carbon-700 hover:text-white'
          "
        >
          <span>{{ cat.label }}</span>
          <span
            class="text-xs font-mono tabular-nums"
            :class="activeCategory === cat.id ? 'text-ontick-steel-300' : 'text-ontick-steel-500'"
          >
            {{ cat.components.length }}
          </span>
        </button>
      </nav>

      <!-- Footer -->
      <div class="px-4 py-4 border-t border-white/[0.06]">
        <p class="text-ontick-steel-500 text-xs">v0.1.0 · alpha</p>
      </div>

    </aside>

    <!-- Main area -->
    <main class="flex-1 flex flex-col min-w-0">

      <!-- Header -->
      <div class="px-8 py-6 border-b border-white/[0.06] shrink-0">
        <h1 class="text-white text-lg font-semibold">{{ currentCategory.label }}</h1>
        <p class="text-ontick-steel-400 text-sm mt-0.5">{{ currentCategory.description }}</p>
      </div>

      <!-- Content -->
      <div class="flex-1 px-8 py-8">

        <!-- Component grid -->
        <div
          v-if="currentCategory.components.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          <ComponentCard
            v-for="comp in currentCategory.components"
            :key="comp.name"
            :name="comp.name"
            :description="comp.description"
            :status="comp.status"
          >
            <component :is="comp.component" />
          </ComponentCard>
        </div>

        <!-- Empty state -->
        <div v-else class="flex items-center justify-center" style="min-height: 320px">
          <div class="text-center">
            <div
              class="w-12 h-12 rounded-xl bg-ontick-carbon-700 border border-white/[0.06] mx-auto mb-4 flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="#6c737f" stroke-width="1.5"/>
                <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="#6c737f" stroke-width="1.5"/>
                <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="#6c737f" stroke-width="1.5"/>
                <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="#6c737f" stroke-width="1.5"/>
              </svg>
            </div>
            <p class="text-ontick-steel-200 text-sm font-medium mb-1">Nenhum componente ainda</p>
            <p class="text-ontick-steel-400 text-sm max-w-xs leading-relaxed">
              Componentes de
              <span class="text-ontick-steel-300">{{ currentCategory.label }}</span>
              aparecerão aqui conforme forem desenvolvidos.
            </p>
          </div>
        </div>

      </div>
    </main>

  </div>

  <!-- Toast global — renderiza via Teleport no <body> -->
  <Toast />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Component } from 'vue'
import ComponentCard from './showcase/ComponentCard.vue'
import { Toast } from './components/Toast'
import ToastDemo from './showcase/demos/ToastDemo.vue'
import ButtonDemo from './showcase/demos/ButtonDemo.vue'

interface ComponentEntry {
  name: string
  description: string
  status?: 'ready' | 'wip' | 'planned'
  component?: Component
}

interface Category {
  id: string
  label: string
  description: string
  components: ComponentEntry[]
}

const categories: Category[] = [
  {
    id: 'forms',
    label: 'Formulários',
    description: 'Inputs, selects, checkboxes e outros controles de entrada de dados.',
    components: [],
  },
  {
    id: 'actions',
    label: 'Ações',
    description: 'Botões, links e outros elementos de ação interativa.',
    components: [
      {
        name: 'Button',
        description: 'Botão com variantes primary, secondary e disabled. Aceita onClick prop ou evento @click nativo.',
        status: 'ready',
        component: ButtonDemo,
      },
    ],
  },
  {
    id: 'display',
    label: 'Exibição',
    description: 'Badges, tags, cards e outros elementos de apresentação de dados.',
    components: [],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    description: 'Alertas, toasts, modais e outros elementos de resposta ao usuário.',
    components: [
      {
        name: 'Toast',
        description: 'Notificação flutuante disparada via store global. Suporta label colorida, título, descrição e auto-dismiss.',
        status: 'ready',
        component: ToastDemo,
      },
    ],
  },
  {
    id: 'navigation',
    label: 'Navegação',
    description: 'Tabs, breadcrumbs, menus e outros elementos de navegação.',
    components: [],
  },
  {
    id: 'typography',
    label: 'Tipografia',
    description: 'Estilos de texto, títulos, labels e hierarquia tipográfica.',
    components: [],
  },
]

const activeCategory = ref('feedback')

const currentCategory = computed<Category>(
  () => categories.find(c => c.id === activeCategory.value) ?? categories[0]!
)
</script>
