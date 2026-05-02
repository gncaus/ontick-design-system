<template>
  <div class="flex flex-col gap-6 w-full">

    <!-- Variantes -->
    <section class="flex flex-col gap-2">
      <p class="text-ontick-steel-500 text-[10px] font-semibold tracking-widest mb-1">VARIANTES</p>
      <Button variant="primary"   label="Button text" :onClick="() => triggerToast('primary')" />
      <Button variant="secondary" label="Button text" :onClick="() => triggerToast('secondary')" />
      <Button variant="disabled"  label="Button text" />
    </section>

    <!-- Tamanhos -->
    <section class="flex flex-col gap-2">
      <p class="text-ontick-steel-500 text-[10px] font-semibold tracking-widest mb-1">TAMANHOS</p>
      <Button size="lg"   label="Large" />
      <Button size="base" label="Base" />
      <Button size="sm"   label="Small" />
    </section>

    <!-- Ícone + texto -->
    <section class="flex flex-col gap-2">
      <p class="text-ontick-steel-500 text-[10px] font-semibold tracking-widest mb-1">ÍCONE COM TEXTO</p>
      <Button variant="primary"   :icon="arrowIcon" iconPosition="left"  label="Avançar" />
      <Button variant="secondary" :icon="arrowIcon" iconPosition="right" label="Avançar" />
      <Button variant="primary"   :icon="arrowIcon" iconPosition="left"  label="Avançar" size="sm" />
    </section>

    <!-- Somente ícone -->
    <section>
      <p class="text-ontick-steel-500 text-[10px] font-semibold tracking-widest mb-2">SOMENTE ÍCONE</p>
      <div class="flex items-center gap-3">
        <Button variant="icon" size="sm"   :icon="arrowIcon" />
        <Button variant="icon" size="base" :icon="arrowIcon" />
        <Button variant="icon" size="lg"   :icon="arrowIcon" />
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import Button from '../../components/Button/Button.vue'
import { useToastStore } from '../../components/Toast/toast.store'

const toast = useToastStore()

const arrowIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

function triggerToast(variant: 'primary' | 'secondary') {
  const map = {
    primary:   { label: 'PRIMARY',   labelVariant: 'lime' as const, title: 'Botão primary clicado!'   },
    secondary: { label: 'SECONDARY', labelVariant: 'blue' as const, title: 'Botão secondary clicado!' },
  }
  toast.show({ ...map[variant], description: 'O onClick pode chamar qualquer função.' })
}
</script>
