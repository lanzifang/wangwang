<template>
    <nav>
      <router-link to="money" class="item">
        <Icon name="money" />
        记账</router-link>
      <router-link to="labels" class="item">
        <Icon name="labels" />
        标签</router-link>
      <router-link to="statistics" class="item">
        <Icon name="statistics" />
        统计</router-link>
    </nav>
</template>

<script lang="ts">
    // import x from '@/assets/icons/labels.svg'
    // console.log(x)
    export default {
        
    }
</script>

<style lang="scss" scoped>
    nav{
      display: flex;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
      flex-direction: row;
      font-size: 12px;
      >.item{
        padding: 2px 0;
        width: 33.33333%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .icon{
          width: 2.3em;
          height: 2.3em;
        }
      }
     
    }
</style>