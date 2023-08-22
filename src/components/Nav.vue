<template>
    <nav>
      <router-link to="/money" class="item" active-class="selected">
        <Icon name="money" />
        记账</router-link>
      <router-link to="/labels" class="item" active-class="selected">
        <Icon name="labels" />
        标签</router-link>
      <router-link to="/statistics" class="item" active-class="selected">
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
    @import "~@/assets/style/helper.scss";
    nav{
      display: flex;
      @extend %outerShadow;
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
      >.item.selected{
        color:$color-highlight;
      }
    }
</style>