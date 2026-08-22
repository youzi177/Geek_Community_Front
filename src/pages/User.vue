<template>
  <div>
    <div class="fly-home fly-panel" style="background-image: url()">
      <img :src="userInfo.pic ? userInfo.pic : '/img/header.jpg'" alt="贤心" />
      <!-- <i class="iconfont icon-renzheng" title="geek极客社区认证"></i> -->
      <h1 class="flex">
        {{ userInfo.name }}
        <i
          :class="userInfo.gender === '0' ? 'iconfont icon-nan' : 'iconfont icon-nv'"
          class="ml1"
        ></i>
        <!-- <i class="iconfont icon-nv"></i>  -->
        <i class="layui-badge fly-badge-vip ml1">{{
          userInfo.isVip === '0' ? '非VIP' : 'VIP' + userInfo.isVip
        }}</i>
        <!--
    <span style="color:#c00;">（管理员）</span>
    <span style="color:#5FB878;">（社区之光）</span>
    <span>（该号已被封）</span>
    -->
        <span v-if="userInfo.status === '1'">（该号已被禁言）</span>
      </h1>

      <!-- <p style="padding: 10px 0; color: #5fb878">认证信息：layui 作者</p> -->

      <p class="fly-home-info">
        <i class="iconfont icon-kiss" title="飞吻"></i
        ><span style="color: #ff7200">{{ userInfo.favs }} 积分</span>
        <i class="iconfont icon-shijian"></i><span>{{ formatDate(userInfo.created) }} 加入</span>
        <template v-if="userInfo.regmark !== ''">
          <i class="iconfont icon-chengshi"></i>
          <span>{{ userInfo.location }}</span>
        </template>
      </p>

      <p class="fly-home-sign">{{ userInfo.regmark }}</p>

      <!-- <div class="fly-sns" data-user="">
        <a
          href="javascript:;"
          class="layui-btn layui-btn-primary fly-imActive"
          data-type="addFriend"
          >加为好友</a
        >
        <a href="javascript:;" class="layui-btn layui-btn-normal fly-imActive" data-type="chat"
          >发起会话</a
        >
      </div> -->
    </div>

    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md6 fly-home-jie">
          <div class="fly-panel">
            <h3 class="fly-panel-title">{{ userInfo.name }} 最近的贴子</h3>
            <ul class="jie-row">
              <li v-for="(item, index) in postList" :key="'postlist' + index">
                <div class="fly-list-badge" v-show="item.tags.length > 0">
                  <span
                    class="layui-badge layui-bg-red"
                    v-for="(tag, index) in item.tags"
                    :key="'tag' + index"
                    :class="tag.class"
                    >{{ tag.name }}</span
                  >
                </div>
                <router-link
                  class="jie-title link"
                  :to="{ name: 'detail', params: { tid: item._id } }"
                  >{{ item.title }}</router-link
                >
                <i>{{ formatDate(item.created) }}</i>
                <em class="layui-hide-xs">{{ item.reads }}阅/{{ item.answer }}答</em>
              </li>
              <div
                class="fly-none"
                style="min-height: 50px; padding: 30px 0; height: auto"
                v-show="postList.length === 0"
              >
                <i style="font-size: 14px">没有发表任何求解</i>
              </div>
            </ul>
          </div>
        </div>

        <div class="layui-col-md6 fly-home-da">
          <div class="fly-panel">
            <h3 class="fly-panel-title">{{ userInfo.name }} 最近的评论</h3>
            <ul class="home-jieda">
              <li v-for="(item, index) in commentList" :key="'comments' + index">
                <p>
                  <span>{{ formatDate(item.created) }}</span>
                  在<router-link
                    :to="
                      item.tid
                        ? { name: 'detail', params: { tid: item.tid ? item.tid._id : '' } }
                        : { name: '404' }
                    "
                    >{{ item.tid ? item.tid.title : '(用户已经删除该贴)' }}</router-link
                  >中回答：
                </p>
                <div class="home-dacontent" v-richtext="item.content"></div>
              </li>

              <div
                v-show="commentList.length === 0"
                class="fly-none"
                style="min-height: 50px; padding: 30px 0; height: auto"
              >
                <span>没有回答任何问题</span>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getInfo, getPostPublic, getCommentPublic } from '@/api/user'
import type { Article, Comments, HttpResponse } from '@/common/interface'

import { formatDate } from '@/utils/formatDate'
import { onMounted, reactive, toRefs, watch } from 'vue'

interface Props {
  uid: string //路由传参
}
interface UserInfo {
  name: string
  pic: string
  isVip: string
  count: number
  favs: number
  isSign: boolean
  lastSign: Date | null
  username: string
  location: string
  gender: string
  regmark: string
  _id: string
  status: string
  created: string
}
//3.5写法
const { uid } = defineProps<Props>()
const state = reactive({
  postList: [] as Article[],
  commentList: [] as Comments[],
  userInfo: {} as UserInfo,
})
const { postList, commentList, userInfo } = toRefs(state)

onMounted(() => {
  // console.log(route)

  getUserInfo()
  getPostList()
  getCommentList()
})
// 监听uid变化
watch(
  () => uid,
  () => {
    getUserInfo()
    getPostList()
    getCommentList()
  },
)

// 用户基本信息
const getUserInfo = async () => {
  const result = await getInfo({
    uid: uid,
  })
  const { code, data } = result as HttpResponse
  if (code === 200) {
    userInfo.value = data
  }
}
// 获取最近的发贴列表
const getPostList = async () => {
  const result = await getPostPublic({
    uid: uid,
    page: 0,
    limit: 20,
  })
  const { code, data } = result as HttpResponse
  if (code === 200) {
    postList.value = data
  }
}
// 获取最近的评论信息
const getCommentList = async () => {
  const result = await getCommentPublic({
    uid: uid,
    page: 0,
    limit: 20,
  })
  const { code, data } = result as HttpResponse
  if (code === 200) {
    commentList.value = data
  }
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
