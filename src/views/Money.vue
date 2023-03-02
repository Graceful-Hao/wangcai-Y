<template>
    <Layout class-prefix="layout">
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
        <Tabs :dataSource="recordTypeList" :value.sync="record.type"/>
        <div class="notes-wrapper">
            <Notes field-name="备注" :value="record.notes" placeholder="请输入备注" @update:value="onUpdateNotes" />
        </div>
        <Tags @update:value="onUpdateTags" />
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import { Component } from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';

@Component({
    components: { Tags, Notes, NumberPad,Tabs}
})
export default class Money extends Vue {
    recordTypeList = recordTypeList
    get recordList() {
        return this.$store.state.recordList;
    }
    created() {
        this.$store.commit('fetchRecords')
    }
    record: RecordItem = {
        tags: [], notes: '', type: '-', amount: 0,
    };
    onUpdateNotes(value: string) {
        this.record.notes = value
    }
    onUpdateAmount(value: string) {
        this.record.amount = parseFloat(value)
    }
    onUpdateTags(value: string[]) {
        this.record.tags = value
    }
    saveRecord() {
        if(!this.record.tags || this.record.tags.length === 0) {
            return window.alert('请至少选择一个标签')
        }
        this.$store.commit('createRecord', this.record)
        // if(this.$store.state.createTagError === null) {
        //     window.alert('已保存')
            this.record.notes = '';
        // }
        

    }
    
}

</script>

<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}

.notes-wrapper {
    padding: 10px;
}
</style>

<style lang="scss" scoped></style>