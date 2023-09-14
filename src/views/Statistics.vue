<template>
    <Layout>
        <Tabs classPrefix="type" :dataSource="recordTypeList" :value.sync="type" />
        <Tabs classPrefix="interval" :dataSource="intervalList" :value.sync="interval" />
        <div>
            type:{{ type }}
            <br />
            interval:{{ interval }}
        </div>
        <div>
            <ol>
                <li v-for="(group,index) in result" :key="index">
                    <h3>{{ group.title }}</h3>
                    <ol>
                        <li v-for="item in group.items" :key="item.id">
                            {{ item.amount }} {{ item.createdAt }}
                        </li>
                    </ol>
                </li>
            </ol>
        </div>
    </Layout>  
</template>

<script lang="ts">
//实在是无法解决RootState如何在本文件正常使用，只好在此重写一遍。老师说放在custom全局里，但是我总调用失败。
    type RootState={
        recordList:RecordItem[],
        tagList:Tag[],
        currentTag?:Tag
    }
    //RecordList要在该文件重新声明，不然总是报错，说找不到RecordList
    type RecordList={
        tags:string[]
        notes:string
        type:string
        amount:number
        createdAt?:string
        id:string
    }
    import Tag from '@/tag'
    import RecordItem from '@/custom'

    import Tabs from '@/components/Tabs.vue'
    import Vue from 'vue'
    import { Component } from 'vue-property-decorator';
    import intervalList from '@/constants/intervalList'
    import recordTypeList from '@/constants/recordTypeList'

    @Component({
        components: { Tabs }
    })
    export default class Statistics extends Vue{
        get recordList(){
            return (this.$store.state as RootState).recordList
        }
        get result(){
            const {recordList}=this
            type HashTableValue={title:string,items:RecordList[]}
            const hashTable:{[key:string]:HashTableValue}={}
            for(let i=0;i<recordList.length;i++){
                const [date,time]=recordList[i].createdAt!.split('T')
                console.log(date)
                hashTable[date]=hashTable[date]||{title:date,items:[]}
                hashTable[date].items.push(recordList[i])
            }
            return hashTable
        }
        beforeCreate(){
            this.$store.commit('fetchRecords')
        }
        type='-'
        interval='day'
        intervalList=intervalList
        recordTypeList=recordTypeList
    }
</script>

<style scoped lang="scss">
    ::v-deep {
        .type-tabs-item{
            background: #e6e6e6;
            &.selected{
                background:#ffffff ;
                color: #fcd85c;
                &::after{
                    display: none;
                }
            }
        }
        .interval-tabs-item{
            height: 48px;
            background: #e6e6e6;
        }
    }
    
</style>