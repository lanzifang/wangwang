<template> 
    <Layout class-prefix="layout"> 
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
        <Tabs :dataSource="recordTypeList" :value.sync="record.type" />
        <div class="notes">
            <FormItem fieldName="备注" 
               placeholder="请输入备注..."
               @update:value="onUpdateNotes" />
        </div>
        <Tags />
    </Layout>      
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component} from 'vue-property-decorator'
    import NumberPad from '@/components/Money/NumberPad.vue'
    import Tabs from '@/components/Tabs.vue'
    import FormItem from '@/components/Money/FormItem.vue'
    import Tags from '@/components/Money/Tags.vue'
    import RecordItem from '@/custom'
    import recordTypeList from '@/constants/recordTypeList'


    @Component({
        components:{NumberPad,FormItem,Tags,Tabs},
    })
    export default class Money extends Vue {
        recordTypeList=recordTypeList
        get recordList(){
            return this.$store.state.recordList
        }
        record:RecordItem={
            tags:[],notes:'',type:'-',amount:0,id:''
        }
        created(){
            this.$store.commit('fetchRecords')
        }
        onUpdateNotes(value:string){
            this.record.notes=value
        }
        onUpdateAmount(value:string){
            this.record.amount=parseFloat(value)
        }
        saveRecord(){
            this.$store.commit('createRecord',this.record)
        }
    }
</script>

<style lang="scss">
    .layout-content{
        display: flex;
        flex-direction: column-reverse;
    }
    .notes{
        padding: 12px 0;
    }
</style>

