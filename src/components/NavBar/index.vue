<script setup lang="ts">
import { navListItem } from './nav';

const props = defineProps<{ navList: navListItem[], activeIndex: number }>()

const emit = defineEmits(['change'])

function change(index: number) {
    if (props.activeIndex !== index)
        emit('change', index)
}

</script>
<template>
    <ul>
        <li v-for="(item, index) of props.navList" :key="item.key" :class="{ active: props.activeIndex === index }"
            @click="change(index)">{{ item.title }}
        </li>
    </ul>
</template>
<style lang="less" scoped>
ul {
    height: 100%;
    display: flex;
    align-items: center;
    text-align: center;

    li {
        width: 52px;
        height: 100%;
        line-height: 52px;
        cursor: pointer;
        position: relative;

        &.active {
            color: #1e80ff;

            &::before {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                border-bottom: 1px solid #1e80ff;
            }
        }
    }
}
</style>
