<template>
  <div class="layui-container">
    <Panel></Panel>
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{ page.title }}</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span class="layui-badge layui-bg-green fly-detail-column" v-if="page.catalog === 'log'"
              >动态</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'share'"
              >分享</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'advise'"
              >建议</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'ask'"
              >提问</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'discuss'"
              >交流</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'notice'"
              >公告</span
            >

            <span class="layui-badge" style="background-color: #999" v-if="page.isEnd === '0'"
              >未结</span
            >
            <span class="layui-badge" style="background-color: #5fb878" v-else>已结</span>

            <span class="layui-badge layui-bg-black" v-show="page.isTop === '1'">置顶</span>
            <span
              class="layui-badge layui-bg-red"
              v-for="(tag, index) in page.tags"
              :key="index"
              :class="tag.class"
              >{{ tag.name }}</span
            >
            <!-- admin -->
            <!-- <div class="fly-admin-box" data-id="123">
              <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>

              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1"
                >置顶</span
              >
              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span>

              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1"
                >加精</span
              >
              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span>
            </div> -->
            <span class="fly-list-nums">
              <a href="#comment"><i class="iconfont" title="回答">&#xe60c;</i> {{ page.answer }}</a>
              <i class="iconfont" title="人气">&#xe60b;</i> {{ page.reads }}
            </span>
          </div>
          <!-- 收藏、作者信息 -->
          <div class="detail-about">
            <a class="fly-avatar" href="../user/home.html">
              <img :src="page.uid ? page.uid.pic : '/img/default.png'" alt="贤心" />
            </a>
            <div class="fly-detail-user">
              <a href="../user/home.html" class="fly-link">
                <cite>{{ page.uid ? page.uid.name : 'fluff' }}</cite>
                <!-- <i class="iconfont icon-renzheng" title="认证信息：{{ rows.user.approve }}"></i> -->
                <i
                  class="layui-badge fly-badge-vip mr1"
                  v-if="page.uid && page.uid.isVip !== '0' ? page.uid.isVip : false"
                  >VIP{{ page.uid.isVip }}</i
                >
              </a>
              <span>{{ formatDate(page.created) }}</span>
            </div>
            <div class="detail-hits">
              <span style="padding-right: 10px; color: #ff7200">悬赏：{{ page.fav }}积分</span>
            </div>
          </div>
          <div class="layui-btn-container fly-detail-admin pt-1">
            <a href="" class="layui-btn layui-btn-sm jie-admin">编辑</a>
            <a href="" class="layui-btn layui-btn-sm jie-admin jieda-admin-colllect">收藏</a>
          </div>
          <div class="detail-body photos" v-html="replaceContent"></div>
        </div>
        <!-- 回帖相关内容 -->
        <div class="fly-panel detail-box" id="flyReply">
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center">
            <legend>回帖</legend>
          </fieldset>

          <ul class="jieda" id="jieda">
            <li class="jieda-daan" v-for="(item, index) in comments" :key="index">
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href="">
                  <img :src="item.uid ? item.uid.pic : '/img/default.png'" />
                </a>
                <div class="fly-detail-user">
                  <a href="" class="fly-link">
                    <cite>{{ "item.uid ? item.uid.name : 'fluff'" }}</cite>
                    <!-- <i class="iconfont icon-renzheng" title="认证信息：XXX"></i> -->
                    <i
                      class="layui-badge fly-badge-vip"
                      v-if="item.uid && item.uid.isVip !== '0' ? item.uid.isVip : false"
                      >VIP{{ item.uid.isVip }}</i
                    >
                  </a>

                  <span v-if="index === 0">(楼主)</span>
                  <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                --></div>

                <div class="detail-hits">
                  <span>{{ formatDate(item.created) }}</span>
                </div>

                <!-- <i class="iconfont icon-caina" title="最佳答案"></i> -->
              </div>
              <!-- 回帖内容 -->
              <div class="detail-body jieda-body photos" v-html="item.content"></div>
              <div class="jieda-reply">
                <span class="jieda-zan" :class="{ zanok: item.handed === '1' }" type="zan">
                  <i class="iconfont icon-zan"></i>
                  <em>{{ item.hands }}</em>
                </span>
                <span type="reply">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span type="edit">编辑</span>
                  <span type="del">删除</span>
                  <!-- <span class="jieda-accept" type="accept">采纳</span> -->
                </div>
              </div>
            </li>

            <!-- 无数据时 -->
            <li class="fly-none" v-if="comments.length === 0">消灭零回复</li>
          </ul>
          <!-- 自定义分页组件 -->
          <pageination
            :has-select="true"
            :total="total"
            :size="size"
            :current="current"
            :show-end="true"
            @change-current="handleChange"
            v-if="comments.length >= 10"
          ></pageination>
          <div class="layui-form layui-form-pane">
            <Form @submit="submit" v-slot="{ errors }">
              <Editor @changeContent="add" :initContent="content"></Editor>
              <div class="layui-form-item">
                <label for="L_vercode" class="layui-form-label">验证码</label>
                <div class="layui-input-inline">
                  <Field
                    type="text"
                    as="input"
                    rules="required|length:4"
                    name="code"
                    placeholder="请输入验证码"
                    class="layui-input"
                    v-model="code"
                  />
                </div>
                <div>
                  <span class="svg" style="color: #c00" @click="_getCode" v-html="svg"></span>
                </div>
                <div class="layui-form-mid">
                  <span style="color: #c00">{{ errors.code }}</span>
                </div>
              </div>
              <div class="layui-form-item">
                <!-- <input type="hidden" name="jid" value="123" /> -->
                <button class="layui-btn" type="submit">提交回复</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div class="layui-col-md4">
        <HotList></HotList>
        <Ads></Ads>
        <Links></Links>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, toRefs } from 'vue'
import Panel from '../Panel.vue'
import Ads from '../sidebar/Ads.vue'
import HotList from '../sidebar/HotList.vue'
import Links from '../sidebar/Links.vue'
import Editor from '@/components/modules/editor/Index.vue'
import pageination from '@/components/modules/pageination/Index.vue'
import Uselogin from '@/hooks/Uselogin'
import { Field, Form } from 'vee-validate'
import { getDetail } from '@/api/content.ts'
import { getComments } from '@/api/comments.ts'
import type { Article, Comments, HttpResponse } from '@/common/interface.ts'
import { formatDate } from '@/utils/formatDate.ts'
import { escapeHtml } from '@/utils/escapeHtml.ts'
//封装函数
const { state, _getCode, setid } = Uselogin()
const { code, svg } = toRefs(state)
const state1 = reactive({
  content: '',
  total: 10,
  size: 10,
  current: 0,
  page: {} as Article, //文章信息
  comments: [] as Comments[], //评论列表
})
const { content, total, size, current, page, comments } = toRefs(state1)
interface Props {
  tid: string //路由传参
}
//3.5写法
const { tid } = defineProps<Props>()
onMounted(() => {
  setid()
  _getCode()
  getPostDetail()
  getCommentsList()
})
const submit = () => {}
const add = () => {}
const replaceContent = computed(() => {
  if (typeof page.value.content === 'undefined' || page.value.content.trim() === '') {
    return ''
  }
  return escapeHtml(page.value.content)
})
//翻页事件
const handleChange = (val: number) => {
  current.value = val
}
//获取文章详情
const getPostDetail = async () => {
  const result = await getDetail(tid)
  //明确告知result就是HttpResponse类型
  const { code, data } = result as HttpResponse
  if (code === 200) {
    console.log(data)
    state1.page = data
  }
}
//获取文章评论数据
const getCommentsList = async () => {
  const result = await getComments(tid)
  //明确告知result就是HttpResponse类型
  const { code, data } = result as HttpResponse
  if (code === 200) {
    console.log(data)
    state1.comments = data
  }
}
</script>

<style lang="scss" scoped>
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background: #f8f8f8;
}
.fly-detail-info {
  span {
    margin-right: 5px;
  }
}
.jieda-body {
  margin: 25px 0 20px !important;
}
// 回帖-消灭0回复居中问题
.layui-elem-field legend {
  margin-left: 0;
}
</style>
