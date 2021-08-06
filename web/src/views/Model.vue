<template>
  <h1 v-if="athlete" class="title is-2">/athletes/{{ athlete.name }}/model</h1>

  <div v-if="athlete" class="notification is-primary is-light">
    This is a realtime animation for "{{ athlete.name }}"!
  </div>

  <div class="box">
    <Renderer ref="renderer" :orbit-ctrl="{ enableDamping: true, target }" antialias resize shadow>

      <Camera :position="{ x: 100, y: 200, z: 300 }"/>

      <Scene ref="scene" background="#a0a0a0">
        <HemisphereLight/>

        <DirectionalLight
            :position="{ x: 0, y: 200, z: 100 }"
            :shadow-camera="{ top: 180, bottom: -120, left: -120, right: 120 }" cast-shadow
        />

        <Plane :height="2000" :rotation="{ x: -Math.PI / 2 }" :width="2000" receive-shadow>

          <PhongMaterial :props="{ depthWrite: false }" color="#999999"/>
        </Plane>

        <Box ref="box"
             :position="{ x: 0, y: 50, z: 0 }"
             :rotation="{ x: 0, y: 0, z: 0 }"
             :scale="{ x: 100, y: 100, z: 100 }"
             :cast-shadow="false"
             :receive-shadow="false"
        >
          <BasicMaterial/>
        </Box>


        <!--        <FbxModel src="animation-model.fbx" @error="onError" @load="onLoad"/>-->
      </Scene>

    </Renderer>
  </div>
</template>

<!--Only for this module the language is JS instead of TS.-->
<script lang="js">
import {defineComponent} from 'vue'

import {AnimationMixer, Clock, Fog, GridHelper, Vector3} from 'three';
import {
  AmbientLight,
  BasicMaterial,
  Box,
  BoxGeometry,
  Camera,
  DirectionalLight,
  FbxModel,
  HemisphereLight,
  PhongMaterial,
  Plane,
  Renderer,
  Scene,
} from 'troisjs';

export default defineComponent({
  components: {
    AmbientLight,
    Box,
    BoxGeometry,
    BasicMaterial,
    Camera,
    DirectionalLight,
    FbxModel,
    HemisphereLight,
    Renderer,
    PhongMaterial,
    Plane,
    Scene,
  },
  data() {
    return {
      target: new Vector3(0, 100, 0),
      athlete: null,
      temperature: 0,
      gravitationalAcceleration: 9.82,
      fractionAccuracy: 2,
      samplingInterval: 1,
      accelerometer: {},
      gyroscope: {},
    };
  },
  mounted() {
    this.$store.dispatch('athlete_getOne', this.$route.params.id).then((res) => this.athlete = res.data);
    this.$socket.client.on('console', this.parseData);

    this.initScene();
  },
  beforeUnmount() {
    this.$socket.client.off('console', this.parseData);
  },
  methods: {
    parseData(data) {
      const {temperature, accelerometer, gyroscope} = data;

      this.temperature = temperature;

      // Get pitch, roll from gyro
      let compPitch = gyroscope.pitch.angle;
      let compRoll = gyroscope.roll.angle;

      // Only use accelerometer when forces are ~1g
      if (accelerometer.acceleration > 0.9 && accelerometer.acceleration < 1.1) {
        compPitch = -compPitch * 0.95 + accelerometer.pitch * 0.05;
        compRoll = compRoll * 0.95 + accelerometer.roll * 0.05;
      }

      console.log(`
      pitch: ${compPitch}
      inclination: ${accelerometer.inclination}
      roll: ${compRoll}
      `)

      // this.$refs.box.mesh.rotation.x = compRoll;
      // this.$refs.box.mesh.rotation.y = compPitch;

    },
    initScene() {
      const scene = this.$refs.scene.scene;
      scene.fog = new Fog(0xa0a0a0, 200, 1000);

      const grid = new GridHelper(2000, 20, 0x000000, 0x000000);
      grid.material.opacity = 0.5;
      grid.material.transparent = true;
      this.$refs.scene.add(grid);
    },
    onLoad(object) {
      this.mixer = new AnimationMixer(object);

      const action = this.mixer.clipAction(object.animations[0]);
      action.play();

      object.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.clock = new Clock();
      this.$refs.renderer.onBeforeRender(this.updateMixer);
    },
    updateMixer() {
      this.mixer.update(this.clock.getDelta());
    },
    animate() {

    },
    onError(error) {
      console.log(error);
    }
  },
});
</script>

<style>
canvas {
  display: block;
  width: 100%;
  height: 70vh;
}
</style>