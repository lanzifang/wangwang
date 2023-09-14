<template>
    <Layout>
        <Tabs classPrefix="type" :dataSource="recordTypeList" :value.sync="type" />
        <Tabs classPrefix="interval" :dataSource="intervalList" :value.sync="interval" />
        <ol>
            <li v-for="(group,index) in result" :key="index">
                <h3 class="title">{{ beautify(group.title) }}</h3>
                <ol>
                    <li class="record" v-for="item in group.items" :key="item.id">
                        <span>{{ tagString(item.tags) }}</span>
                        <span class="notes">{{ item.notes }}</span>
                        <span>￥{{ item.amount }} </span>
                    </li>
                </ol>
            </li>
        </ol>
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
    import dayjs from 'dayjs'

    @Component({
        components: { Tabs }
    })
    export default class Statistics extends Vue{
        tagString(tags:string[]){
            return tags.length===0?'无':tags.join(',')
        }
        beautify(string:string){
            const now=dayjs()
            const api=dayjs(string)
            if(api.isSame(now,'day')){
                return '今天'
            }else if(api.isSame(now.valueOf()-86400*1000,'day')){
                return '昨天'
            }else if(api.isSame(now.valueOf()-86400*1000*2,'day')){
                return '前天'
            }else if(api.isSame(now,'year')){
                return api.format('M月D日')
            }else{
                return api.format('YYYY年MM月DD日')
            }
        }
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
    %item{
        line-height: 24px;
        padding: 8px 16px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }
    .title{
        @extend %item
    }
    .record{
        background:#ffffff ;
        @extend %item
    }  
    .notes{
        margin-right: auto;
        margin-left: 16px;
        color: #999;
    }
</style>