<template>
  <div class="flex flex-col gap-4 w-full">

    <!-- Position picker -->
    <div>
      <p class="text-ontick-steel-500 text-[10px] font-semibold tracking-widest mb-2">POSIÇÃO</p>
      <div class="grid grid-cols-3 gap-1 w-fit">
        <button
          v-for="pos in positions"
          :key="pos.value"
          @click="toast.setPosition(pos.value)"
          class="text-xs px-2.5 py-1 rounded-md transition-colors border"
          :class="
            toast.defaultPosition === pos.value
              ? 'bg-ontick-lime-300/10 text-ontick-lime-300 border-ontick-lime-300/20'
              : 'bg-ontick-carbon-800 text-ontick-steel-400 hover:text-ontick-steel-200 border-white/8'
          "
        >
          {{ pos.label }}
        </button>
      </div>
    </div>

    <!-- Triggers -->
    <div>
      <p class="text-ontick-steel-500 text-[10px] font-semibold tracking-widest mb-2">DISPARAR</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="demo in demos"
          :key="demo.buttonLabel"
          @click="toast.show(demo.payload)"
          class="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors bg-ontick-carbon-800 text-ontick-steel-200 hover:bg-ontick-carbon-600 hover:text-white border border-white/8"
        >
          {{ demo.buttonLabel }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '../../components/Toast/toast.store'
import type { ToastPayload, ToastPosition } from '../../components/Toast/toast.store'

const toast = useToastStore()

interface PositionOption {
  label: string
  value: ToastPosition
}

const positions: PositionOption[] = [
  { label: '↖ Topo Esq',   value: 'top-left'      },
  { label: '↑ Topo Centro', value: 'top-center'    },
  { label: '↗ Topo Dir',   value: 'top-right'      },
  { label: '↙ Base Esq',   value: 'bottom-left'   },
  { label: '↓ Base Centro', value: 'bottom-center' },
  { label: '↘ Base Dir',   value: 'bottom-right'  },
]

interface Demo {
  buttonLabel: string
  payload: ToastPayload
}

const demos: Demo[] = [
  {
    buttonLabel: 'Backtest',
    payload: {
      label: 'BACKTEST',
      labelVariant: 'purple',
      title: 'Backtest finalizado!',
      description: 'Seu backtest foi realizado com sucesso. Clique aqui e confira os resultados.',
    },
  },
  {
    buttonLabel: 'Sucesso',
    payload: {
      label: 'SUCESSO',
      labelVariant: 'green',
      title: 'Operação realizada',
      description: 'Suas alterações foram salvas com sucesso.',
    },
  },
  {
    buttonLabel: 'Erro',
    payload: {
      label: 'ERRO',
      labelVariant: 'red',
      title: 'Algo deu errado',
      description: 'Não foi possível completar a operação. Tente novamente.',
    },
  },
  {
    buttonLabel: 'Sem label',
    payload: {
      title: 'Notificação simples',
      description: 'Um toast sem pill de destaque.',
      duration: 3000,
    },
  },
]
</script>
