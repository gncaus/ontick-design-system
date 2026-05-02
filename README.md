# Ontick Design System

Biblioteca de componentes UI da Ontick, construída com Vue 3, TypeScript e Tailwind CSS v4. O projeto serve como vitrine interativa para desenvolvimento e documentação dos componentes antes de serem publicados como pacote npm.

## Tecnologias

| Tecnologia | Versão | Papel |
|---|---|---|
| Vue 3 | 3.5+ | Framework de componentes |
| TypeScript | 5.9 | Tipagem estática |
| Vite | 7 | Build e dev server |
| Tailwind CSS | v4 | Utilitários de estilo |
| tailwind-variants | 3 | Sistema de variantes tipado |
| tailwind-merge | 3 | Resolução de conflitos de classes |
| Pinia | 2 | State management (stores de componentes) |

## Executando localmente

```bash
npm install
npm run dev      # inicia o servidor de desenvolvimento
npm run build    # build de produção (type-check + vite build)
```

## Arquitetura

### Estrutura de pastas

```
src/
  components/
    ComponenteName/
      ComponentName.vue          # componente visual
      component-name.variants.ts # variantes via tailwind-variants (componentes UI)
      component-name.store.ts    # store Pinia (componentes com estado global)
      index.ts                   # barrel export
  showcase/
    ComponentCard.vue            # card wrapper do vitrine
    demos/
      ComponentNameDemo.vue      # demo interativo para o vitrine
  App.vue                        # vitrine principal (registro de componentes)
  style.css                      # tokens de cor (@theme) + base
```

### Padrões

**Componentes UI** (Button, Input, Badge…) usam `tailwind-variants` para as variantes de estilo. O arquivo `*.variants.ts` centraliza toda a lógica visual e é a única fonte de verdade para classes.

**Componentes com estado global** (Toast, Modal…) usam uma store Pinia isolada. O arquivo `*.store.ts` define tipos, estado e ações. Cada componente tem sua própria store, sem estado compartilhado entre componentes diferentes.

**Paleta de cores** — definida em `src/style.css` via `@theme`. Todos os tokens seguem o prefixo `ontick-`:
`ontick-lime`, `ontick-prussian`, `ontick-teal`, `ontick-pink`, `ontick-purple`, `ontick-orange`, `ontick-yellow`, `ontick-blue`, `ontick-green`, `ontick-red`, `ontick-steel`, `ontick-graphite`, `ontick-carbon`

Cada família tem 10 tons (50–900). Ex: `bg-ontick-lime-300`, `text-ontick-steel-400`.

### Registrando um componente no vitrine

Em `src/App.vue`, adicione uma entrada no array da categoria correspondente:

```ts
{
  id: 'actions',
  components: [
    {
      name: 'Button',
      description: 'Descrição curta.',
      status: 'ready', // 'ready' | 'wip' | 'planned'
      component: ButtonDemo,
    },
  ],
}
```

---

## Componentes

### Button

Botão de ação com suporte a variantes visuais, tamanhos, ícones e estado desabilitado.

**Importação**
```ts
import { Button } from '@/components/Button'
```

**Props**

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `variant` | `ButtonVariant` | `'primary'` | Estilo visual do botão |
| `size` | `ButtonSize` | `'base'` | Tamanho do botão |
| `label` | `string` | — | Texto quando não há slot |
| `icon` | `Component \| string` | — | Componente Vue ou SVG como string |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Posição do ícone em botões com texto |
| `onClick` | `() => void` | — | Função executada ao clicar |

**Eventos**

| Evento | Descrição |
|---|---|
| `@click` | Emitido no clique (alternativa ao prop `onClick`) |

**Variantes — `ButtonVariant`**

| Valor | Descrição |
|---|---|
| `primary` | Fundo lime, texto escuro. Ação principal da tela |
| `secondary` | Fundo prussian, texto branco. Ação secundária |
| `disabled` | Fundo escuro, opacidade reduzida. Bloqueia cliques |
| `icon` | Botão quadrado sem texto, estilo ghost. Só exibe ícone |

**Tamanhos — `ButtonSize`**

| Valor | Padding | Font | Border radius |
|---|---|---|---|
| `sm` | `py-2 px-4` | `text-xs` | `rounded-xl` |
| `base` | `py-4 px-6` | `text-sm` | `rounded-2xl` |
| `lg` | `py-5 px-8` | `text-base` | `rounded-2xl` |

> Na variante `icon`, os tamanhos se tornam dimensões fixas: `sm` = 32px, `base` = 40px, `lg` = 48px.

**Exemplos**

```vue
<!-- Botão simples -->
<Button label="Confirmar" />

<!-- Com evento nativo -->
<Button variant="secondary" label="Cancelar" @click="cancel" />

<!-- Com prop onClick -->
<Button variant="primary" label="Salvar" :onClick="save" />

<!-- Tamanho pequeno -->
<Button size="sm" variant="secondary" label="Ver mais" />

<!-- Ícone à esquerda (SVG string) -->
<Button :icon="arrowSvg" label="Avançar" />

<!-- Ícone à direita -->
<Button :icon="arrowSvg" iconPosition="right" label="Próximo" />

<!-- Ícone à esquerda (componente Vue) -->
<Button :icon="ArrowRightIcon" variant="secondary" label="Continuar" />

<!-- Somente ícone -->
<Button variant="icon" size="lg" :icon="SearchIcon" />

<!-- Desabilitado -->
<Button variant="disabled" label="Indisponível" />
```

**Adicionando uma nova variante**

Em `src/components/Button/button.variants.ts`, adicione uma entrada no objeto `variants.variant`:

```ts
variants: {
  variant: {
    // ...existentes
    danger: [
      'bg-ontick-red-500 text-white',
      'hover:bg-ontick-red-600 active:bg-ontick-red-700',
      'focus-visible:ring-ontick-red-500',
    ],
  },
}
```

O tipo `ButtonVariant` e a prop `variant` em `Button.vue` são atualizados junto.

---

### Toast

Notificação flutuante global, disparada via store Pinia. O componente `<Toast />` é montado uma única vez no `App.vue` e pode ser acionado de qualquer tela ou componente da aplicação.

**Setup — montar uma vez na raiz da aplicação**

```vue
<!-- App.vue ou layout raiz -->
<template>
  <RouterView />
  <Toast />
</template>

<script setup lang="ts">
import { Toast } from '@/components/Toast'
</script>
```

**Importação da store**
```ts
import { useToastStore } from '@/components/Toast'
```

**Interface — `ToastPayload`**

| Campo | Tipo | Default | Descrição |
|---|---|---|---|
| `title` | `string` | obrigatório | Título em negrito |
| `description` | `string` | — | Texto descritivo |
| `label` | `string` | — | Texto da pill de destaque (ex: `"BACKTEST"`) |
| `labelVariant` | `ToastLabelVariant` | `'purple'` | Cor da pill |
| `duration` | `number` | `4000` | Tempo em ms até fechar. `0` = não fecha |
| `position` | `ToastPosition` | `defaultPosition` | Sobrescreve a posição só para este toast |

**Cores de label — `ToastLabelVariant`**

`'purple'` · `'blue'` · `'green'` · `'red'` · `'orange'` · `'lime'` · `'pink'`

**Posições — `ToastPosition`**

`'top-right'` · `'top-left'` · `'top-center'` · `'bottom-right'` · `'bottom-left'` · `'bottom-center'`

**Exemplos**

```ts
const toast = useToastStore()

// Toast simples
toast.show({
  title: 'Operação realizada com sucesso.',
})

// Com pill de destaque
toast.show({
  label: 'BACKTEST',
  labelVariant: 'purple',
  title: 'Backtest finalizado!',
  description: 'Clique aqui e confira os resultados.',
})

// Toast permanente (não fecha sozinho)
toast.show({
  label: 'ERRO',
  labelVariant: 'red',
  title: 'Falha na conexão',
  description: 'Verifique sua internet e tente novamente.',
  duration: 0,
})

// Fechar manualmente
toast.hide()
```

**Configurando a posição por tela**

Por padrão o toast aparece em `top-right`. Para mudar em uma tela específica, chame `setPosition()` no `setup` do componente:

```ts
const toast = useToastStore()

// Muda o padrão para esta tela
toast.setPosition('bottom-right')

// A partir daqui, todo toast.show() usa bottom-right
toast.show({ title: 'Backtest finalizado!' })
```

Para sobrescrever pontualmente sem mudar o padrão:

```ts
toast.show({
  position: 'bottom-center',
  title: 'Arquivo exportado.',
})
```
