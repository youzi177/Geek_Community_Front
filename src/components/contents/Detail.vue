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
            <!-- 按钮级别权限 -->
            <div v-hasRole="'admin'">
              <div class="fly-admin-box">
                <!-- 操作级别权限 -->
                <span class="layui-btn layui-btn-xs jie-admin" v-hasPermission="['delete']"
                  >删除</span
                >

                <span
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="stick"
                  rank="1"
                  v-if="page.isTop === '0'"
                  >置顶</span
                >
                <span
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="stick"
                  rank="0"
                  style="background-color: #ccc"
                  v-else
                  >取消置顶</span
                >

                <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1"
                  >加精</span
                >
                <span
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="status"
                  rank="0"
                  style="background-color: #ccc"
                  >取消加精</span
                > -->
              </div>
              <span class="fly-list-nums">
                <a href="#comment"
                  ><i class="iconfont" title="回答">&#xe60c;</i> {{ page.answer }}</a
                >
                <i class="iconfont" title="人气">&#xe60b;</i> {{ page.reads }}
              </span>
            </div>
          </div>
          <!-- 收藏、作者信息 -->
          <div class="detail-about">
            <router-link
              :to="{ name: 'user', params: { uid: page.uid ? page.uid._id : '1' } }"
              class="fly-avatar"
            >
              <img :src="page.uid ? page.uid.pic : '/img/default.png'" alt="贤心"
            /></router-link>
            <!-- <a class="fly-avatar" href="../user/home.html">
              <img :src="page.uid ? page.uid.pic : '/img/default.png'" alt="贤心" />
            </a> -->
            <div class="fly-detail-user">
              <router-link
                :to="{ name: 'user', params: { uid: page.uid ? page.uid._id : '1' } }"
                class="fly-link"
              >
                <cite>{{ page.uid ? page.uid.name : 'fluff' }}</cite>
                <i class="iconfont icon-renzheng" title="认证信息：{{ rows.user.approve }}"></i>
                <i
                  class="layui-badge fly-badge-vip mr1"
                  v-if="page.uid && page.uid.isVip !== '0' ? page.uid.isVip : false"
                  >VIP{{ page.uid.isVip }}</i
                >
              </router-link>
              <!-- <a href="../user/home.html" class="fly-link">
                <cite>{{ page.uid ? page.uid.name : 'fluff' }}</cite>
                <i class="iconfont icon-renzheng" title="认证信息：{{ rows.user.approve }}"></i>
                <i
                  class="layui-badge fly-badge-vip mr1"
                  v-if="page.uid && page.uid.isVip !== '0' ? page.uid.isVip : false"
                  >VIP{{ page.uid.isVip }}</i
                >
              </a> -->
              <span>{{ formatDate(page.created) }}</span>
            </div>
            <div class="detail-hits">
              <span style="padding-right: 10px; color: #ff7200">悬赏：{{ page.fav }}积分</span>
            </div>
          </div>
          <div class="layui-btn-container fly-detail-admin pt-1">
            <router-link
              :to="{ name: 'edit', params: { tid: tid } }"
              @click="setPage(page)"
              class="layui-btn layui-btn-sm jie-admin"
              v-show="page.isEnd === '0' && page.uid._id === user?._id"
              >编辑</router-link
            >
            <a
              href=""
              class="layui-btn layui-btn-sm jieda-admin-colllect"
              :class="{ 'layui-btn-primary': page.isFav }"
              @click.prevent="setCollect"
              >{{ page.isFav ? '取消收藏' : '收藏' }}</a
            >
          </div>
          <div class="detail-body photos" v-html="replaceContent"></div>
        </div>
        <!-- 回帖相关内容 -->
        <div class="fly-panel detail-box" id="flyReply">
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center">
            <legend id="comment">回帖</legend>
          </fieldset>

          <ul class="jieda" id="jieda">
            <li class="jieda-daan" v-for="(item, index) in comments" :key="index">
              <div class="detail-about detail-about-reply">
                <router-link
                  :to="{ name: 'user', params: { uid: item.cuid ? item.cuid._id : '1' } }"
                  class="fly-avatar"
                >
                  <img :src="item.cuid ? item.cuid.pic : '/img/default.png'" />
                </router-link>
                <!-- <a class="fly-avatar" href="">
                  <img :src="item.cuid ? item.cuid.pic : '/img/default.png'" />
                </a> -->
                <div class="fly-detail-user">
                  <router-link
                    :to="{ name: 'user', params: { uid: item.cuid ? item.cuid._id : '1' } }"
                    class="fly-link"
                  >
                    <cite>{{ item.cuid ? item.cuid.name : 'fluff' }}</cite>
                    <!-- <i class="iconfont icon-renzheng" title="认证信息：XXX"></i> -->
                    <i
                      class="layui-badge fly-badge-vip"
                      v-if="item.cuid && item.cuid.isVip !== '0' ? item.cuid.isVip : false"
                      >VIP{{ item.cuid.isVip }}</i
                    >
                  </router-link>
                  <!-- <a href="JavaScript:;" class="fly-link">
                    <cite>{{ item.cuid ? item.cuid.name : 'fluff' }}</cite>
                    <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                    <i
                      class="layui-badge fly-badge-vip"
                      v-if="item.cuid && item.cuid.isVip !== '0' ? item.cuid.isVip : false"
                      >VIP{{ item.cuid.isVip }}</i
                    >
                  </a> -->

                  <span v-if="current === 0 && index === 0">(楼主)</span>
                  <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                --></div>

                <div class="detail-hits">
                  <span>{{ formatDate(item.created) }}</span>
                </div>

                <i class="iconfont icon-caina" title="最佳答案" v-show="item.isBest === '1'"></i>
              </div>
              <!-- 回帖内容 -->
              <div class="detail-body jieda-body photos" v-richtext="item.content"></div>
              <div class="jieda-reply">
                <span
                  class="jieda-zan"
                  :class="{ zanok: item.handed === '1' }"
                  type="zan"
                  @click="hands(item)"
                >
                  <i class="iconfont icon-zan"></i>
                  <em>{{ item.hands }}</em>
                </span>
                <span type="reply" @click="reply(item)">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span
                    type="edit"
                    @click="editComent(item)"
                    v-show="
                      page.isEnd === '0' && item.cuid._id === user?._id && user?.status === '0'
                    "
                    >编辑</span
                  >
                  <!-- <span type="del">删除</span> -->
                  <span
                    class="jieda-accept"
                    type="accept"
                    @click="setBest(item, index)"
                    v-show="
                      page.isEnd === '0' && page.uid._id === user?._id && user?.status === '0'
                    "
                    >采纳</span
                  >
                </div>
              </div>
            </li>

            <!-- 无数据时 -->
            <li class="fly-none" v-if="comments.length === 0">消灭零回复</li>
          </ul>
          <!-- 自定义分页组件 -->
          <pageination
            :has-select="true"
            :hasTotal="true"
            :total="total"
            :size="size"
            :current="current"
            :show-end="true"
            @change-current="handleChange"
            @changeLimit="handleLimit"
            v-show="comments.length > 0 && total > 0"
          ></pageination>
          <div class="layui-form layui-form-pane">
            <Form @submit="submit" v-slot="{ errors }">
              <Editor @changeContent="addCommentContent" :initContent="editInfo.content"></Editor>
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
import { computed, onMounted, reactive, toRefs, watch } from 'vue'
import Panel from '../Panel.vue'
import Ads from '../sidebar/Ads.vue'
import HotList from '../sidebar/HotList.vue'
import Links from '../sidebar/Links.vue'
import Editor from '@/components/modules/editor/Index.vue'
import pageination from '@/components/modules/pageination/Index.vue'
import Uselogin from '@/hooks/Uselogin'
import { Field, Form, type SubmissionContext } from 'vee-validate'
import { getDetail } from '@/api/content.ts'
import {
  addCollect,
  addComment,
  getComments,
  setCommentBest,
  setHands,
  updateComment,
} from '@/api/comments.ts'
import type { Article, Comments, HttpResponse } from '@/common/interface.ts'
import { formatDate } from '@/utils/formatDate.ts'
import { escapeHtml } from '@/utils/escapeHtml.ts'
import { popup } from '../modules/pop/index.tsx'
import { useAppStore, useAuthStore, useUserStore } from '@/stores/index.ts'
import { myalert, myconfirm } from '../modules/alert/index.tsx'
import { scrollToElem } from '@/utils/common.ts'
import { getInfo } from '@/api/user.ts'
const AuthStore = useAuthStore()
const UserStore = useUserStore()
const AppStore = useAppStore()
//封装函数
const { state, _getCode, setid } = Uselogin()
const { code, svg } = toRefs(state)
const state1 = reactive({
  // content: '',
  total: 0,
  size: 10,
  current: 0,
  page: {} as Article, //文章信息
  comments: [] as Comments[], //评论列表
  editInfo: {
    content: '',
    code: '',
    sid: '',
    tid: '',
    cid: '', //评论用户的id
    item: {} as Comments,
  }, //评论内容
})
const { total, size, current, page, comments, editInfo } = toRefs(state1)
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
  getUserInfo() //why getUserInfo？登录的时候，token没过期的时候被禁言，这是尽可能最快的生效，保持用户状态为最新
})
// 监听tid变化
watch(
  () => tid,
  () => {
    setid()
    _getCode()
    getPostDetail()
    getCommentsList()
    getUserInfo()
  },
)
// 用户基本信息
const getUserInfo = async () => {
  // 有信息，登录的时候才去发请求，没登录的时候点击文章详情不请求
  if (UserStore.userInfo._id) {
    const result = await getInfo({
      uid: UserStore.userInfo._id,
    })
    const { code, data } = result as HttpResponse
    if (code === 200) {
      UserStore.userInfo = data
    }
  }
}
const submit = async (value: Record<string, unknown>, actions: SubmissionContext) => {
  const { setErrors } = actions
  //用户没有登录
  const isLogin = AuthStore.isLogin
  if (!isLogin) {
    popup('请先登录', 'shake')
    return
  }
  const user = UserStore.userInfo
  const cuid = {
    _id: user._id,
    pic: user.pic,
    name: user.name,
    isVip: user.isVip,
  }
  // 用户是否禁言,如果登录的时候没有禁言，登录之后中间这个时间被禁言，status从缓存取，有Bug
  // 需要重新请求更新一下userinfo->getUserInfo()
  if (user.status !== '0') {
    popup('用户已经被禁言，请联系管理员', 'shake')
    return
  }
  state1.editInfo.code = state.code
  state1.editInfo.sid = AuthStore.sid
  state1.editInfo.tid = tid

  //更新评论
  if (typeof state1.editInfo.cid !== 'undefined' && state1.editInfo.cid !== '') {
    // 解构，排除 item
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { item, ...submitData } = state1.editInfo
    // 判断用户是否修改了内容
    if (state1.editInfo.content === state1.editInfo.item.content) {
      popup('确定编辑了内容~~~', 'shake')
      return
    }

    const result = await updateComment(submitData)
    const { code, msg } = result as HttpResponse
    if (code === 200) {
      const temp = state1.editInfo.item
      temp.content = state1.editInfo.content
      popup('更新评论成功', '')
      state1.comments.splice(state1.comments.indexOf(state1.editInfo.item), 1, temp) //编辑的评论添加到评论列表
      // 清空内容
      state.code = ''
      state1.editInfo.content = ''
      state1.editInfo.cid = ''
      actions.resetForm() //清除错误信息
      //刷新图片验证码
      _getCode()
      return
    } else if (code === 401) {
      setErrors({
        code: msg,
      })
      return
    }
  }
  // 添加评论
  const result = await addComment(state1.editInfo)
  const { code, msg, data } = result as HttpResponse
  if (code === 200) {
    popup('发表评论成功', '')
    data.cuid = cuid
    state1.comments.push(data) //添加新的评论到评论列表
    // 清空内容
    state.code = ''
    state1.editInfo.content = ''
    actions.resetForm() //清除错误信息
    //刷新图片验证码
    _getCode()
  } else if (code === 401) {
    setErrors({
      code: msg,
    })
  } else {
    myalert(msg as string)
  }
}
// 添加评论内容
const addCommentContent = (val: string) => {
  state1.editInfo.content = val
}
// 文章详情的转义
const replaceContent = computed(() => {
  if (typeof page.value.content === 'undefined' || page.value.content.trim() === '') {
    return ''
  }
  return escapeHtml(page.value.content)
})
//判断当前登录用户
const user = computed(() => {
  return UserStore.userInfo
})
//翻页事件
const handleChange = (val: number) => {
  console.log('handleChange')

  current.value = val
  getCommentsList()
}
const handleLimit = (limit: number, newCurrent?: number) => {
  size.value = limit
  if (newCurrent !== undefined) {
    current.value = newCurrent
  }
  getCommentsList()
}
// 编辑
const editComent = (item: Comments) => {
  console.log('🚀 ~ editComent ~ item:', item)
  scrollToElem('.layui_input-block', 500, -65) //滚动
  state1.editInfo.content = item.content
  document.getElementById('edit')?.focus()
  state1.editInfo.cid = item._id
  state1.editInfo.item = item
}

// 采纳
const setBest = (item: Comments, index: number) => {
  console.log('🚀 ~ setBest ~ index:', index)
  console.log('🚀 ~ setBest ~ item:', item)
  myconfirm(
    '确定采纳为最佳答案吗？',
    async () => {
      //发送采纳最佳答案的请求
      console.log(item)
      const result = await setCommentBest({
        cid: item._id,
        tid: tid,
      })
      const { code } = result as HttpResponse
      if (code === 200) {
        popup('采纳成功!', '')
        item.isBest = '1'
        state1.page.isEnd = '1'
      }
    },
    () => {},
  )
}
//点赞
const hands = async (item: Comments) => {
  //用户没有登录
  const isLogin = AuthStore.isLogin
  if (!isLogin) {
    popup('请先登录', 'shake')
    return
  }
  const result = await setHands({ cid: item._id })
  const { code, msg } = result as HttpResponse
  if (code === 200) {
    popup('点赞成功', '')
    item.handed = '1'
    item.hands += 1
  } else {
    popup(msg as string, 'shake')
  }
}
const reply = (item: Comments) => {
  console.log(item.cuid.name)

  // console.log(item)
  // 插入@符号到content
  //滚动到页面的输入框
  //focus输入框
  // 更换@ 用户但是内容不变
  const reg = /^@[\S]+/g
  if (state1.editInfo.content) {
    // 不为空的话就正则匹配一下
    if (reg.test(state1.editInfo.content)) {
      // 有内容有@符号了
      state1.editInfo.content = state1.editInfo.content.replace(reg, '@' + item.cuid.name + ' ')
    } else {
      state1.editInfo.content = `@${item.cuid.name} ${state1.editInfo.content}`
    }
  } else {
    // 评论框为空
    state1.editInfo.content = '@' + item.cuid.name + ' '
  }

  scrollToElem('.layui_input-block', 500, -65) //滚动
  document.getElementById('edit')?.focus()
}
// 传递参数
const setPage = (page: Article) => {
  AppStore.setPage(page)
}
// 设置收藏
const setCollect = async () => {
  // 判断用户是否已经登录
  const isLogin = AuthStore.isLogin
  if (isLogin) {
    const collect = {
      tid,
      title: page.value.title,
      isFav: page.value.isFav ? true : false,
    }
    const result = await addCollect(collect)
    const { code } = result as HttpResponse
    if (code === 200) {
      page.value.isFav = !page.value.isFav
      popup(page.value.isFav ? '收藏成功' : '取消收藏成功', '')
    }
  } else {
    popup('请先登录后再收藏')
  }
}
//获取文章详情
const getPostDetail = async () => {
  const result = await getDetail(tid)
  //明确告知result就是HttpResponse类型
  const { code, data } = result as HttpResponse
  if (code === 200) {
    // console.log(data)
    state1.page = data
  }
}
//获取文章评论数据
const getCommentsList = async () => {
  const result = await getComments({
    tid: tid,
    page: state1.current,
    limit: state1.size,
  })
  //明确告知result就是HttpResponse类型
  const { code, data, total } = result as HttpResponse
  if (code === 200) {
    // console.log(data)
    state1.comments = data
    state1.total = total
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
.fly-admin-box {
  margin-left: 0px;
  margin-top: 15px;
}
</style>
