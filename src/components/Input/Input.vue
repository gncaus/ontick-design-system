<template>
  <div>
    <div :class="title()">titulo</div>
    <input type="text" :class="base()" />
  </div>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants'

const input = tv({
  slots: {
    base: '',
    title: '',
  },
  variants: {
    variant: {
      default: {},
      filled: {},
      disabled: {},
      error: {},
    },
  },
})

const { base, title } = input()
</script>
