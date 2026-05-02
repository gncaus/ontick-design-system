<template>
  <button
    :class="buttonVariants({ variant, size })"
    :disabled="variant === 'disabled'"
    @click="handleClick"
  >
    <!-- Ícone esquerda  |  ícone centralizado quando variant="icon" -->
    <span
      v-if="icon && (variant === 'icon' || iconPosition === 'left')"
      class="flex items-center shrink-0"
    >
      <span v-if="isStringIcon" v-html="icon" />
      <component v-else :is="icon" />
    </span>

    <!-- Texto / slot  (oculto em variant="icon") -->
    <slot v-if="variant !== 'icon'">{{ label }}</slot>

    <!-- Ícone direita -->
    <span
      v-if="icon && variant !== 'icon' && iconPosition === 'right'"
      class="flex items-center shrink-0"
    >
      <span v-if="isStringIcon" v-html="icon" />
      <component v-else :is="icon" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { buttonVariants } from './button.variants'
import type { ButtonVariant, ButtonSize } from './button.variants'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    label?: string
    /** Componente Vue ou string SVG */
    icon?: Component | string
    /** Posição do ícone em botões com texto. Default: 'left' */
    iconPosition?: 'left' | 'right'
    /** Função executada ao clicar. Ignorada quando variant="disabled" */
    onClick?: () => void
  }>(),
  { variant: 'primary', size: 'base', iconPosition: 'left' }
)

const emit = defineEmits<{ click: [] }>()

const isStringIcon = computed(() => typeof props.icon === 'string')

function handleClick() {
  if (props.variant === 'disabled') return
  props.onClick?.()
  emit('click')
}
</script>
