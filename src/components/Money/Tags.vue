<template>
    <div class="tags">
        <div class="new">
            <button @click="createTag">新增标签</button>
        </div>
        <ul class="current">
            <li v-for="tag in tagList" :key="tag.id"
                :class="{selected:selectedTags.indexOf(tag)>=0}"  
                @click="toggle(tag)">{{ tag.name }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component ,Prop} from 'vue-property-decorator';
    import Tag from '../../tag';
    import { mixins } from 'vue-class-component';
    import TagHelper from '../../mixins/TagHelper';
    
    @Component
    export default class Tags extends mixins(TagHelper){
        get tagList(){
            return this.$store.state.tagList
        }
        
        //@Prop() readonly dataSource:any //string[]|undefined，原来使用这个tag.id报错，但能运行
        selectedTags:string[]=[]
        created(){
            this.$store.commit('fetchTags')
        }
        toggle(tag:string){  
            const index=this.selectedTags.indexOf(tag)
            if(index>=0){
                this.selectedTags.splice(index,1)
            }else{
                this.selectedTags.push(tag)
            }
            this.$emit('update:value',this.selectedTags)
            
        }
        create(){
            const name=window.prompt('请输入标签名')
            if(!name){
                return window.alert('标签名不能为空')
            }
            this.$store.commit('createTag',name)  
            this.$store.commit('saveTags')
        }
    }
</script>

<style lang="scss" scoped>
    .tags{
        background: white;
        font-size: 14px;
        padding: 16px;
        display: flex;
        flex-direction: column-reverse;
        flex-grow: 1;
        > .current{
            display: flex;
            flex-wrap: wrap;
            > li{
                background:#fec269;
                $h:24px;
                height: $h;
                line-height: $h;
                border-radius: $h/2;
                padding: 0 16px;
                margin-right: 12px;
                margin-top: 8px;
                
                &.selected{
                    background:#ca8621;
                    color: white;
                }
            }
        }
        > .new{
            padding-top: 16px;
            button{
                background: transparent;
                border: none;
                border-bottom: 1px solid;
                color: #ffd552;
                padding: 0 3px;
            }
        }
    }
</style>