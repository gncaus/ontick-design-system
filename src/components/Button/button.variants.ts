import { tv } from 'tailwind-variants'

export type ButtonVariant = 'primary' | 'secondary' | 'disabled' | 'icon'
export type ButtonSize = 'sm' | 'base' | 'lg'

export const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-2',
    'font-bold transition-all duration-200 cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ontick-carbon-900',
  ],
  variants: {
    variant: {
      primary: [
        'bg-ontick-lime-300 text-ontick-carbon-900',
        'hover:bg-ontick-lime-400 active:bg-ontick-lime-500',
        'focus-visible:ring-ontick-lime-300',
      ],
      secondary: [
        'bg-ontick-prussian-300 text-white',
        'hover:bg-ontick-prussian-400 active:bg-ontick-prussian-500',
        'focus-visible:ring-ontick-prussian-300',
      ],
      disabled: [
        'bg-ontick-carbon-600 text-ontick-steel-400',
        'border border-white/10',
        'cursor-not-allowed opacity-60',
      ],
      icon: [
        'bg-ontick-carbon-600 text-ontick-steel-300',
        'border border-white/10',
        'hover:bg-ontick-carbon-500 hover:text-white',
        'active:bg-ontick-carbon-700',
        'focus-visible:ring-ontick-steel-400',
      ],
    },
    size: {
      sm:   'w-full py-2   px-4 text-xs  rounded-xl',
      base: 'w-full py-4   px-6 text-sm  rounded-2xl',
      lg:   'w-full py-5   px-8 text-base rounded-2xl',
    },
  },
  // Quando variant=icon, sobrescreve padding/width para botão quadrado
  compoundVariants: [
    { variant: 'icon', size: 'sm',   class: 'w-8  h-8  p-0 rounded-lg' },
    { variant: 'icon', size: 'base', class: 'w-10 h-10 p-0 rounded-xl' },
    { variant: 'icon', size: 'lg',   class: 'w-12 h-12 p-0 rounded-xl' },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'base',
  },
})
