<template>
    <svg class="icon">
        <use v-bind:xlink:href="'#'+name" />
    </svg>
</template>

<script lang="ts">
    let importAll=(requierContext:__WebpackModuleApi.RequireContext)=>requierContext.keys().forEach(requierContext);
    try{
      importAll(require.context('../assets/icons',true,/\.svg$/));
    }catch(error){
      console.log(error);
    }
    export default {
        props:['name']
    }
</script>

<style lang="scss" scoped>
    .icon{
        width: 2.3em;
        height: 2.3em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

</style>