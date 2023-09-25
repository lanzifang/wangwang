<template>
    <Layout>
        <Tabs classPrefix="type" :dataSource="recordTypeList" :value.sync="type" />
        <ol v-if="groupedList.length>0">
            <li v-for="(group,index) in groupedList" :key="index">
                <h3 class="title">{{ beautify(group.title) }}<span>￥{{ group.total }}</span></h3>
                <ol>
                    <li class="record" v-for="(item,index) in group.items" :key="index">{{ item.id }}
                        <span>{{ tagString(item.tags) }}</span>
                        <span class="note">{{ item.notes }}</span>
                        <span>￥{{ item.amount }} </span>
                    </li>
                </ol>
            </li>
        </ol>
        <div v-else class="noResult">
            当前无记录
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
   

    import Tag from '@/tag'
    import RecordItem from '@/custom'

    import Tabs from '@/components/Tabs.vue'
    import Vue from 'vue'
    import { Component } from 'vue-property-decorator';
    import recordTypeList from '@/constants/recordTypeList'
    import dayjs from 'dayjs'
    import clone from '@/lib/clone'

    @Component({
        components: { Tabs }
    })
    export default class Statistics extends Vue{
        tagString(tags:Tag[]){
            return tags.length===0?'无':tags.map(t=>t.name).join(',')
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
        get groupedList(){
            const {recordList}=this
            if(recordList.length===0){return []}
            const newList=clone(recordList).filter(r=>r.type===this.type).sort((a,b)=>dayjs(b.createdAt).valueOf()-dayjs(a.createdAt).valueOf())
            type Result={title:string,total?:number,items:RecordItem[]}[]
            const result:Result=[{title:dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items:[newList[0]]}]
            for(let i=1;i<newList.length;i++){
                const current=newList[i]
                const last=result[result.length-1]
                if(dayjs(last.title).isSame(dayjs(current.createdAt),'day')){
                    last.items.push(current)
                }else{
                    result.push({title:dayjs(current.createdAt).format('YYYY-MM-DD'),items:[current]})
                }
            }
            result.map(group=>{
                group.total=group.items.reduce((sum,item)=>sum+item.amount,0)
            })
            return result
        }
        beforeCreate(){
            this.$store.commit('fetchRecords')
        }
        type='-'
        recordTypeList=recordTypeList
    }
</script>

<style scoped lang="scss">
    .noResult{
        padding: 16px;
        text-align: center;
    }
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
    .note{
        margin-right: auto;
        margin-left: 16px;
        color: #999;
    }
</style>