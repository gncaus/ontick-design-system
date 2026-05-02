import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastLabelVariant =
  | 'purple'
  | 'blue'
  | 'green'
  | 'red'
  | 'orange'
  | 'lime'
  | 'pink'

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'

export interface ToastPayload {
  /** Pill de destaque à esquerda, ex: "BACKTEST" */
  label?: string
  /** Cor da pill. Default: 'purple' */
  labelVariant?: ToastLabelVariant
  /** Título em negrito */
  title: string
  /** Texto descritivo opcional */
  description?: string
  /** Duração em ms antes de fechar automaticamente. 0 = não fecha. Default: 4000 */
  duration?: number
  /** Sobrescreve a posição padrão para este toast específico */
  position?: ToastPosition
}

export const useToastStore = defineStore('toast', () => {
  const visible = ref(false)
  const payload = ref<ToastPayload | null>(null)

  /** Posição padrão — mude por tela com setPosition() */
  const defaultPosition = ref<ToastPosition>('top-right')
  /** Posição ativa do toast sendo exibido (snapshot no momento do show) */
  const activePosition = ref<ToastPosition>('top-right')

  let timer: ReturnType<typeof setTimeout> | null = null

  /** Define a posição padrão para os próximos toasts nesta tela */
  function setPosition(pos: ToastPosition) {
    defaultPosition.value = pos
  }

  function show(data: ToastPayload) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    activePosition.value = data.position ?? defaultPosition.value
    payload.value = data
    visible.value = true

    const duration = data.duration ?? 4000
    if (duration > 0) {
      timer = setTimeout(hide, duration)
    }
  }

  function hide() {
    visible.value = false
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return { visible, payload, defaultPosition, activePosition, show, hide, setPosition }
})
