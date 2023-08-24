<template>
    <div class="tags">
        <div class="new">
            <button>新增标签</button>
        </div>
        <ul class="current">
            <li v-for="tag in dataSource" :key="tag"
                :class="{selected:selectedTags.indexOf(tag)>=0}"
                @click="toggle(tag)">{{ tag }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component ,Prop} from 'vue-property-decorator';

    @Component
    export default class Tags extends Vue{
        @Prop() dataSource:string[]|undefined
        selectedTags:string[]=[]
        toggle(tag:string){
            const index=this.selectedTags.indexOf(tag)
            if(index>=0){
                this.selectedTags.splice(index,1)
            }else{
                this.selectedTags.push(tag)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tags{
        font-size: 14px;
        padding: 16px;
        display: flex;
        flex-direction: column-reverse;
        flex-grow: 1;
        > .current{
            display: flex;
            > li{
                background:#fec269;
                $h:24px;
                height: $h;
                line-height: $h;
                border-radius: $h/2;
                padding: 0 16px;
                margin-right: 12px;
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