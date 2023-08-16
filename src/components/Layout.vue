<template>
    <div class="nav-wrapper">
        <div class="content">
            <slot />
        </div>       
        <Nav />
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .nav-wrapper{
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .content{
        border: 1px solid blue;
        flex-grow: 1;
        overflow: auto;
    }

</style>