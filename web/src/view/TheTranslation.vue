<script setup lang="ts">
import { ref, watch } from 'vue'
import { Android } from '../common/android'
import { SelectOption } from 'naive-ui'
import 'babylonjs-loaders/babylonjs.loaders.min.js'
// @ts-ignore
import Exchange from '~icons/la/exchange-alt'
import { Engine, Scene, Quaternion, Animation, AnimationGroup, IAnimationKey, SceneLoader, ArcRotateCamera, Vector3, Space } from 'babylonjs'

const canvas = ref<HTMLCanvasElement | null>(null)

watch(canvas, el => {
  if (!el) return
  let fps: number | null = null
  const engine = new Engine(el)
  const scene = new Scene(engine)
  scene.useRightHandedSystem = true
  scene.createDefaultCamera(true, true, true)
  const camera = scene.cameras[0] as ArcRotateCamera
  scene.createDefaultLight(true)
  SceneLoader.AppendAsync('./model/', 'male.glb', scene)
  camera.setPosition(new Vector3(0, 1, 2))
  camera.setTarget(new Vector3(0, 1, 0))
  engine.runRenderLoop(() => scene.render())

  const motion = new AnimationGroup('motion', scene)

    ; (window as any).onSignData = (motionDate: string, face: string, _fps: number) => {
      fps = _fps
      const motionArr = JSON.parse(`[${motionDate}]`) as number[]
      const map = new Map<number, IAnimationKey[]>()
      const q = new Quaternion()
      for (let i = 0; i < motionDate.length; i++) {
        switch (i % 4) {
          case 0: q.w = motionArr[i]
            break
          case 1: q.x = motionArr[i]
            break
          case 2: q.y = motionArr[i]
            break
          case 3: {
            q.z = motionArr[i]
            const name = ((i - 3) / 4) % 45
            const frame = { frame: Math.floor((i - 3) / (4 * 45)), value: q.clone() }
            if (!map.has(name)) map.set(name, [])
            map.get(name)?.push(frame)
            break
          }
        }
      }
      map.forEach((v, k) => {
        const anim = new Animation('' + k, 'rotationQuaternion', fps ?? 30, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE)
        anim.setKeys(v)
        motion.addTargetedAnimation(anim, scene.getBoneByName('' + k))
      })
      motion.play()
    }
})



const input = ref('')
const lang1 = ref('zh')
const lang2 = ref('sign')
const options: SelectOption[] = [
  { label: '中文', value: 'zh' },
  { label: '手语', value: 'sign' }
]

</script>

<template>
  <div class="flex justify-center my-2">
    <NSelect v-model:value="lang1" class="w-20" :options="options.filter(l => l.value !== lang2)"></NSelect>
    <NButton :bordered="false">
      <template #icon>
        <Exchange />
      </template>
    </NButton>
    <NSelect v-model:value="lang2" class="w-20" :options="options.filter(l => l.value !== lang1)"></NSelect>
  </div>
  <canvas ref="canvas" class="w-full h-75"></canvas>
  <div class="mt-2 mx-1">
    <NInput v-model:value="input" clearable type="textarea"></NInput>
  </div>
  <div class="flex justify-center mt-2">
    <NButton type="primary" @click="Android && input && Android.text2sign(input)">点击翻译</NButton>
  </div>
</template>
