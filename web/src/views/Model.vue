<template>
  <h1 v-if="athlete" class="title is-2">/athletes/{{ athlete.name }}/model</h1>

  <div v-if="athlete" class="notification is-primary is-light">
    This is a realtime animation for "{{ athlete.name }}"!
  </div>

  <div id="three-wrapper" class="box">
    <Renderer ref="renderer" :orbit-ctrl="{ enableDamping: true, target }" antialias resize shadow>

      <span id="temp" class="tag is-primary has-text-weight-bold is-family-code">{{ this.temperature }}°C</span>

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

        <FbxModel ref="model" src="animation-model.fbx" @error="onError" @load="onLoad"/>
      </Scene>

    </Renderer>
  </div>
</template>

<!--Only for this module the language is JS instead of TS.-->
<script lang="js">
import {defineComponent} from 'vue'
import {Fog, GridHelper, SkeletonHelper, Vector3} from 'three';
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
      // Constants
      gravitationalAcceleration: 9.82,
      fractionAccuracy: 2,
      samplingInterval: 0.1,
      gyroSens: 131,
      orderOfMag: Math.PI / 180,
      loadedModel: false,
      target: new Vector3(0, 100, 0),
      // Model body parts
      leftArm: null,
      rightArm: null,
      leftForeArm: null,
      rightForeArm: null,
      leftLeg: null,
      rightLeg: null,
      leftUpLeg: null,
      rightUpLeg: null,
      athlete: null,
      // Local calculations
      pitch: 0,
      roll: 0,
      yaw: 0,
      // IMU data as streamed by the server
      temperature: 0,
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
      this.pitch += (gyroscope.rate.x / this.gyroSens) * this.samplingInterval;
      this.roll -= (gyroscope.rate.y / this.gyroSens) * this.samplingInterval;
      this.yaw = (gyroscope.rate.z / this.gyroSens) * this.samplingInterval;

      // Only use accelerometer when forces are ~1g
      if (accelerometer.acceleration > 0.9 && accelerometer.acceleration < 1.1) {
        // Dont use johnny-five's pitch, roll, yaw
        this.pitch =
            this.pitch * 0.95 +
            Math.atan2(accelerometer.y, Math.hypot(accelerometer.x, accelerometer.z)) * 0.05;

        this.roll =
            this.roll * 0.95 +
            Math.atan2(-accelerometer.x, Math.hypot(accelerometer.y, accelerometer.z)) * 0.05;

        this.yaw =
            this.yaw * 0.95 +
            Math.atan2(accelerometer.z, Math.hypot(accelerometer.x, accelerometer.z)) * 0.05;
      }

      // Filter out noise (a small tremor appears with too many fraction digits)
      this.pitch = this.toFixed(this.pitch);
      this.roll = this.toFixed(this.roll);
      this.yaw = this.toFixed(this.yaw);

      // Euler -> Quaternion conversion
      const cy = Math.cos(this.yaw * 0.5);
      const sy = Math.sin(this.yaw * 0.5);
      const cp = Math.cos(this.pitch * 0.5);
      const sp = Math.sin(this.pitch * 0.5);
      const cr = Math.cos(this.roll * 0.5);
      const sr = Math.sin(this.roll * 0.5);

      if (this.loadedModel) {
        this.leftArm.quaternion.w = cr * cp * cy + sr * sp * sy;
        this.leftArm.quaternion.x = sr * cp * cy - cr * sp * sy;
        this.leftArm.quaternion.y = cr * sp * cy + sr * cp * sy;
        this.leftArm.quaternion.z = cr * cp * sy - sr * sp * cy;
      }

      console.log(`
      pitch: ${this.pitch}
      roll: ${this.roll}
      yaw: ${this.yaw}
      `);
    },
    initScene() {
      const scene = this.$refs.scene.scene;
      scene.fog = new Fog(0xa0a0a0, 200, 1000);

      const grid = new GridHelper(2000, 20, 0x000000, 0x000000);
      grid.material.opacity = 0.2;
      grid.material.transparent = true;
      this.$refs.scene.add(grid);
    },
    onLoad(object) {
      // Add the skeleton to the scene
      const skeleton = new SkeletonHelper(object);
      skeleton.visible = true;
      this.$refs.scene.add(skeleton);

      // Get all the necessary body parts for the animation
      this.leftArm = object.getObjectByName('mixamorig1LeftArm');
      this.rightArm = object.getObjectByName('mixamorig1RightArm');
      this.leftForeArm = object.getObjectByName('mixamorig1LeftForeArm');
      this.rightForeArm = object.getObjectByName('mixamorig1RightForeArm');
      this.leftLeg = object.getObjectByName('mixamorig1RightLeg');
      this.rightLeg = object.getObjectByName('mixamorig1LeftLeg');
      this.leftUpLeg = object.getObjectByName('mixamorig1RightUpLeg');
      this.rightUpLeg = object.getObjectByName('mixamorig1LeftUpLeg');

      // Add shadows
      object.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.loadedModel = true;
    },
    onError(error) {
      console.log(error);
    },
    toFixed(arg) {
      return +arg.toFixed(this.fractionAccuracy);
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

#three-wrapper {
  position: relative;
}

#temp {
  position: absolute;
  top: 2rem;
  left: 2rem;
}
</style>