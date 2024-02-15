<script setup lang="ts">

const route = useRoute()

const output =
      '((Blog:1.00,(About Me:0.30,Publications:0.30,(Twitter:0.80,Github:0.80, LinkedIn:0.80)Social:0.30):1.00);'
const domains = ['Blog', 'Social', 'Pages']

</script>

<template>
  <div>
    <Dendrogram :data="output" :domains="domains"></Dendrogram>
  </div>
</template>

