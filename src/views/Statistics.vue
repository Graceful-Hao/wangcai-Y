<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
        <ol v-if="groupedList.length>0">
            <li v-for="(group, index) in groupedList" :key="index">
                <h3 class="title">{{ beautify(group.title) }} <span>￥{{ group.total }}</span></h3>
                <ol>
                    <li v-for="(item, index) in group.items" :key="index" class="record">
                        <span>{{ tagString(item.tags) }}</span>
                        <span class="note">{{ item.notes }}</span>
                        <span>￥{{ item.amount }}</span>
                    </li>
                </ol>
            </li>
        </ol>
        <div v-else class="null">
            目前没有相关记录
        </div>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

@Component({
    components: { Tabs }
})
export default class Statistics extends Vue {
    beautify(timeTitle: string) {
        const day = dayjs(timeTitle)
        const now = dayjs()
        if (day.isSame(now, 'day')) {
            return '今天'
        } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
            return '昨天'
        } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
            return '前天'
        } else if (day.isSame(now, 'year')) {
            return day.format('M月D日')
        } else {
            return day.format('YYYY年M月D日')
        }
    }
    tagString(tags: string[]) {
        return tags.length === 0 ? '无' : tags.join(',')
    }
    get recordList() {
        return (this.$store.state as RootState).recordList
    }
    get groupedList() {
        const { recordList } = this;
        
        const newList = clone(recordList).filter(r => r.type===this.type).sort((a, b) => dayjs(b.timeAt).valueOf() - dayjs(a.timeAt).valueOf())
        if (newList.length === 0) { return [] as Result};
        type Result = {title:string, total?:number, items: RecordItem[]}[]
        const result:Result = [{ title: dayjs(newList[0].timeAt).format('YYYY-MM-DD'), items: [newList[0]] }]
        for (let i = 1; i < newList.length; i++) {
            const current = newList[i]
            const last = result[result.length - 1]
            if (dayjs(last.title).isSame(dayjs(current.timeAt), 'day')) {
                last.items.push(current);
            } else {
                result.push({ title: dayjs(current.timeAt).format('YYYY-MM-DD'), items: [current] })
            }
        }
        result.forEach(group => {
            group.total = group.items.reduce((sum, item)=> sum+item.amount, 0);
        })
        return result;
    }

    created() {
        this.$store.commit('fetchRecords')
    }

    type = '-';
    recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
.null {
    text-align: center;
    padding: 24px 16px;
}
::v-deep {
    .type-tabs-item {
        background: #c4c4c4;

        &.selected {
            background: white;
            border: none;
        }
    }

    .interval-tabs-item {
        height: 48px;
        line-height: 48px;
    }

    %item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 24px;
        padding: 8px 16px;
    }

    .title {
        @extend %item
    }

    .record {
        @extend %item;
        background: white;

        .note {
            margin-right: auto;
            margin-left: 16px;
            color: #999;
        }
    }
}
</style>