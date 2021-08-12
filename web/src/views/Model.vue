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
import {Euler, Fog, GridHelper, SkeletonHelper, Vector3} from 'three';
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
      athlete: null,
      temperature: 0,
      pitch: 0,
      roll: 0,
      yaw: 0,
      toRads: Math.PI / 180,
      loadedModel: false,
      target: new Vector3(0, 100, 0),
      // Model body parts
      head: null,
      leftArm: null,
      rightArm: null,
      leftForeArm: null,
      rightForeArm: null,
      leftLeg: null,
      rightLeg: null,
      leftUpLeg: null,
      rightUpLeg: null,
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
      const {temperature, pitch, roll, yaw} = data;

      this.temperature = temperature;

      // Euler angles in three.js are in rads
      this.pitch = pitch * this.toRads;
      this.roll = roll * this.toRads;
      this.yaw = yaw * this.toRads;

      if (this.loadedModel) {
        this.head.quaternion.setFromEuler(new Euler(this.roll, this.pitch, this.yaw));
      }

      // console.log(`
      // pitch: ${this.pitch}
      // roll: ${this.roll}
      // yaw: ${this.yaw}
      // `);
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
      this.head = object.getObjectByName('mixamorig1Head');
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