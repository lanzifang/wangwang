<template>
    <Layout>
        <Tabs classPrefix="type" :dataSource="recordTypeList" :value.sync="type" />
        <Tabs :dataSource="intervalList" :value.sync="interval" />
        <div>
            type:{{ type }}
            <br />
            interval:{{ interval }}
        </div>
    </Layout>  
</template>

<script lang="ts">
    import Types from '@/components/Money/Types.vue';
    import Tabs from '@/components/Tabs.vue'
    import Vue from 'vue'
    import { Component } from 'vue-property-decorator';
    import intervalList from '@/constants/intervalList'
    import recordTypeList from '@/constants/recordTypeList'

    @Component({
        components: { Types,Tabs }
    })
    export default class Statistics extends Vue{
        type='-'
        interval='day'
        intervalList=intervalList
        recordTypeList=recordTypeList
    }
</script>

<style scoped lang="scss">
    ::v-deep .type-tabs-item{
        background: #e6e6e6;
        &.selected{
            background:#ffffff ;
            color: #fcd85c;
            &::after{
                display: none;
            }
        }
    }
</style>