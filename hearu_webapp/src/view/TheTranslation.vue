<script setup lang="ts">
import { ref, watch } from 'vue'
import { PerspectiveCamera, WebGLRenderer, sRGBEncoding, Scene, Quaternion, DirectionalLight } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { Android } from '../common/android'
import { SelectOption } from 'naive-ui'
// @ts-ignore
import Exchange from '~icons/la/exchange-alt'

const div_three = ref<HTMLDivElement | null>(null)
const tasks = [] as ((...arg: any) => any)[]
// let lastTime: number | null = null
watch(div_three, div => {
  if (!div) return

  const renderer = new WebGLRenderer()
  const camera = new PerspectiveCamera(75, window.innerWidth / 300, 0.01, 1000)
  const scene = new Scene()

  renderer.setSize(window.innerWidth, 300)
  renderer.outputEncoding = sRGBEncoding
  renderer.physicallyCorrectLights = true
  div_three.value?.appendChild(renderer.domElement)
  camera.position.set(0, 0, 1.2)
  camera.applyQuaternion(new Quaternion(0, 0, 0, -1))
  const trackballControls = new TrackballControls(camera, renderer.domElement)

  const render = () => renderer.render(scene, camera)
  const renderLooper = () => {
    requestAnimationFrame(renderLooper)
    // if (lastTime && new Date().getTime() - lastTime < 1000) return
    // lastTime = new Date().getTime()
    trackballControls.update()
    const fun = tasks.shift()
    fun && fun()
    render()
  }

  const light1 = new DirectionalLight(undefined, 3)
  const light2 = new DirectionalLight(undefined, 3)
  const light3 = new DirectionalLight(undefined, 3)
  light1.position.set(-1.5, 2.5, 1.5)
  light2.position.set(-1.5, 2.5, -2)
  light3.position.set(1.5, 2.5, -1.5)
  light1.applyQuaternion(new Quaternion(-0.47, -0.171, 0.296, 0.814))
  light2.applyQuaternion(new Quaternion(0.242, -0.52, 0.346, 0.742))
  light3.applyQuaternion(new Quaternion(0.526, -0.229, 0.751, 0.327))
  scene.add(light1, light2, light3)


  const dracoLoader = new DRACOLoader()
  const loader = new GLTFLoader()
  dracoLoader.setDecoderPath('./draco/')
  loader.setPath('./male/')
  loader.setDRACOLoader(dracoLoader)
  loader.load('male.glb', gltf => {
    gltf.scene.position.set(0, -1, 0)
    scene.add(gltf.scene)
    renderLooper()
  }, undefined, err => console.log(err)
  )

    ; (window as any).onSignData = (motion: string, face: string) => {
      console.log(motion + '\n' + face)
      const motionArr = JSON.parse(`[${motion}]`) as number[]
      const q = { x: 0, y: 0, z: 0, w: 1 }
      let skip = true
      for (let i = 0; i < motion.length; i++) {
        switch (i % 4) {
          case 0: q.w = motionArr[i]
            break
          case 1: q.x = motionArr[i]
            break
          case 2: q.y = motionArr[i]
            break
          case 3: {
            q.z = motionArr[i]
            skip = !skip
            if (!skip) {
              const p = Object.assign({}, q)
              tasks.push(() => {
                const bone = scene.getObjectByName(String(((i - 3) / 4) % 45))
                bone?.quaternion.set(p.x, p.y, p.z, p.w)
              })
            }
            break
          }
        }
      }
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
  <div ref="div_three"></div>
  <div class="mt-2 mx-1">
    <NInput v-model:value="input" clearable type="textarea"></NInput>
  </div>
  <div class="flex justify-center mt-2">
    <NButton type="primary" @click="Android && input && Android.text2sign(input)">点击翻译</NButton>
  </div>
</template>
