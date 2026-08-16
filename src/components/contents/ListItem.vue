<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item, index) in items" :key="index">
        <router-link :to="{ name: 'user', params: { uid: item.uid._id } }" class="fly-avatar">
          <img :src="item.uid.pic" alt="贤心" />
        </router-link>
        <!-- <a href="user/home.html" class="fly-avatar">
          <img :src="item.uid.pic" alt="贤心" />
        </a> -->
        <h2>
          <a class="layui-badge">{{ item.catalog }}</a>
          <router-link :to="{ name: 'detail', params: { tid: item._id } }">{{
            item.title
          }}</router-link>
        </h2>
        <div class="fly-list-info">
          <router-link :to="{ name: 'user', params: { uid: item.uid._id } }" link>
            <cite>{{ item.uid.name }}</cite>
            <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
            <i class="layui-badge fly-badge-vip" v-if="item.uid.isVip !== '0'">{{
              'VIP' + item.uid.isVip
            }}</i>
          </router-link>
          <span>{{ formatDate(item.created) }}</span>
          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"
            ><i class="iconfont icon-kiss"></i> {{ item.fav }}</span
          >
          <span class="layui-badge fly-badge-accept layui-hide-xs" v-show="item.isEnd !== '0'"
            >已结</span
          >
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i> {{ item.answer }}
          </span>
        </div>
        <div class="fly-list-badge" v-show="item.tags.length > 0">
          <span
            class="layui-badge layui-bg-red"
            v-for="(tag, index) in item.tags"
            :key="index"
            :class="tag.class"
            >{{ tag.name }}</span
          >
        </div>
      </li>
    </ul>
    <div style="text-align: center" v-show="isShow">
      <div class="laypage-main" v-if="!isEnd">
        <a @click.prevent="more" class="laypage-next">更多求解</a>
      </div>
      <div class="nomore gray" v-else>我也是有底线的~~~</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import _ from 'lodash'
import { formatDate } from '@/utils/formatDate'
import type { Article } from '@/common/interface'
interface Props {
  list: Array<Article> //文章的信息
  isShow?: boolean //是否显示更多求解
  isEnd?: boolean //是否最后一页
}
//3.5写法
const { list = [], isShow = true, isEnd = false } = defineProps<Props>()
//计算属性
const items = computed(() => {
  _.map(list, (item) => {
    switch (item.catalog) {
      case 'ask':
        item.catalog = '提问'
        break
      case 'share':
        item.catalog = '分享'
        break
      case 'logs':
        item.catalog = '动态'
        break
      case 'notice':
        item.catalog = '公告'
        break
      case 'advise':
        item.catalog = '建议'
        break
      case 'discuss':
        item.catalog = '交流'
        break
    }
  })
  return list
})

const emit = defineEmits(['next-page'])
const more = () => {
  emit('next-page')
}
</script>

<style lang="scss" scoped>
.nomore {
  font-size: 16px;
  padding: 30px 0;
}
</style>
