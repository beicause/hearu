declare module 'vue' {
  type naiveUi = typeof import('naive-ui')
  export interface GlobalComponents extends naiveUi {}
}

export {}
