<template>
    <div class="layout-wrapper">
        <div class="content" :class="classPrefix&&`${classPrefix}-content`">
            <slot />
        </div>       
        <Nav />
    </div>
</template>

<script>
    export default {
        props:['classPrefix']     
    }
</script>

<style lang="scss" scoped>
    .layout-wrapper{
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    .content{
        flex-grow: 1;
        overflow: auto;
    }

</style>