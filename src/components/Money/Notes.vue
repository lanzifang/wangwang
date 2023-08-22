<template>
    <div>
        <label class="notes">
            <span class="name">备注</span>
            <input type="text" placeholder="请输入备注...">
        </label>
    </div>
</template>

<script>
    export default {
        name:'Notes'
    }
</script>

<style lang="scss" scoped>
    .notes{
        background: #f6f6f6;
        display: flex;
        align-items: center;
        font-size: 14px;
        padding-left:16px;
        .name{
            padding-right: 16px;
        }
        input{
            height: 64px;
            flex-grow: 1;
            background: transparent;
            border: none;
            padding-right: 16px;
        }
    }
</style>