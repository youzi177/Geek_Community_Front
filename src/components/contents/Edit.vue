<template>
  <div class="layui-container fly-marginTop" :class="{ 'd-hide': isHide }">
    <div class="fly-panel" pad20 style="padding-top: 5px">
      <!--<div class="fly-none">没有权限</div>-->
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">编辑帖子<!-- 编辑帖子 --></li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0">
            <div class="layui-tab-item layui-show">
              <Form @submit="submit" v-slot="{ errors }">
                <div class="layui-row layui-col-space15 layui-form-item">
                  <div class="layui-col-md3">
                    <label class="layui-form-label">所在专栏</label>
                    <div class="layui-input-block">
                      <!--isSelect是否显示下拉框  -->
                      <div class="layui-unselect layui-form-select">
                        <div class="layui-select-title">
                          <Field
                            type="text"
                            name="catalog"
                            as="input"
                            placeholder="请选择"
                            readonly
                            v-model="selectedText"
                            class="layui-input layui-unselect layui-disabled"
                          />
                          <i class="layui-edge"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="layui-col-md9">
                    <label for="L_title" class="layui-form-label">标题</label>
                    <div class="layui-input-block">
                      <Field
                        type="text"
                        id="title"
                        as="input"
                        name="title"
                        class="layui-input"
                        rules="required"
                        v-model="title"
                      />
                      <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                    </div>
                    <div class="layui-row">
                      <span style="color: #c00">{{ errors.title }}</span>
                    </div>
                  </div>
                </div>
                <Editor @changeContent="add" :initContent="state1.content"></Editor>
                <div class="layui-form-item">
                  <div class="layui-inline">
                    <label class="layui-form-label">悬赏飞吻</label>

                    <div class="layui-input-block">
                      <div class="layui-unselect layui-form-select">
                        <div class="layui-select-title">
                          <input
                            type="text"
                            placeholder="请选择"
                            readonly
                            v-model="favList[favIndex]"
                            class="layui-input layui-unselect layui-disabled"
                          />
                          <i class="layui-edge"></i>
                        </div>
                        <!-- <dl class="layui-anim layui-anim-upbit">
                          <dd
                            v-for="(item, index) in favList"
                            :key="index"
                            :class="{ 'layui-this': index === favIndex }"
                            @click="chooseFav(item, index)"
                          >
                            {{ item }}
                          </dd>
                        </dl> -->
                      </div>
                    </div>
                    <div class="layui-form-mid layui-word-aux">发表后无法更改飞吻</div>
                  </div>
                </div>
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
                  <button class="layui-btn" type="submit">立即发布</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, toRefs } from 'vue'
import Editor from '@/components/modules/editor/Index.vue'
import { Field, Form } from 'vee-validate'
import Uselogin from '@/hooks/Uselogin'
import { useAppStore, useAuthStore } from '@/stores'
import { myalert, myconfirm } from '../modules/alert'
import { getDetail, UpdatePost } from '@/api/content'
import type { HttpResponse } from '@/common/interface'
import router from '@/router'
import { popup } from '../modules/pop'

const appStore = useAppStore()
//封装函数
const { state, _getCode, setid } = Uselogin()
const { code, svg } = toRefs(state)
interface Props {
  tid: string //路由传参
}
//3.5写法
const { tid } = defineProps<Props>()

const state1 = reactive({
  cataIndex: 0,
  favIndex: 0,
  catalogs: [
    {
      text: '请选择',
      value: '',
    },
    {
      text: '提问',
      value: 'ask',
    },
    {
      text: '分享',
      value: 'share',
    },
    {
      text: '讨论',
      value: 'discuss',
    },
    {
      text: '建议',
      value: 'advise',
    },
  ],
  favList: [20, 30, 50, 60, 80],
  content: '',
  title: '',
})
const { cataIndex, favIndex, catalogs, favList, title } = toRefs(state1)
//下拉菜单文字
const selectedText = computed({
  get: () => catalogs.value[cataIndex.value]?.text ?? '',
  set: (val: string) => {
    const item = catalogs.value[cataIndex.value]
    if (item) item.text = val
  },
})

//解决预览时候偶尔双滚动条的问题
const isHide = computed(() => appStore.isHide)
// const chooseCatalog = (item: object, index: number) => {
//   state1.cataIndex = index
// }
// const chooseFav = (item: number, index: number) => {
//   state1.favIndex = index
// }
//更新文章
const submit = async () => {
  // 检测文章内容是否为空
  if (state1.content.trim() === '') {
    myalert('文章内容不得为空')
    return
  }
  const result = await UpdatePost({
    tid: tid,
    title: state1.title,
    content: state1.content,
    code: state.code,
    sid: useAuthStore().sid,
  })
  //明确告知result就是HttpResponse类型
  const { code, msg } = result as HttpResponse
  if (code === 200) {
    popup('编辑成功', '')
    localStorage.setItem('editData', '')
    setTimeout(() => {
      router.push({ name: 'detail', params: { tid: tid } })
    }, 2000)
  } else {
    popup(msg as string, '')
    // myalert(msg as string)
  }
}
//挂载时执行
onMounted(() => {
  console.log(tid)
  // console.log(typeof appStore.currentPage._id !== 'undefined')
  setid()
  _getCode()
  if (typeof appStore.currentPage._id !== 'undefined') {
    state1.content = appStore.currentPage.content
    state1.title = appStore.currentPage.title
    state1.favIndex = favList.value.indexOf(parseInt(appStore.currentPage.fav))
    state1.cataIndex = catalogs.value.findIndex(
      (item) => item.value === appStore.currentPage.catalog,
    )
    // 缓存内容
    localStorage.setItem('editData', JSON.stringify(appStore.currentPage))
  } else {
    console.log('页面上无page内容')

    // 页面上无page内容，可能是用户进行了刷新，则取本地缓存
    const saveData = localStorage.getItem('editData')
    if (saveData && saveData != '') {
      myconfirm(
        '是否加载未编辑的内容',
        () => {
          const obj = JSON.parse(saveData)
          state1.content = obj.content
          state1.title = obj.title
          state1.cataIndex = obj.cataIndex
          state1.favIndex = obj.favIndex
        },
        async () => {
          //获取文章详情
          const result = await getDetail(tid)
          //明确告知result就是HttpResponse类型
          const { code, data } = result as HttpResponse
          if (code === 200) {
            // console.log(data)
            // state1.page = data
            state1.content = data.content
            state1.title = data.title
            state1.favIndex = favList.value.indexOf(parseInt(data.fav))
            state1.cataIndex = catalogs.value.findIndex((item) => item.value === data.catalog)
          }
          // add函数，组件初始化的时候会localStorage.setItem('editData', JSON.stringify(saveData))
          // localStorage.removeItem('editData')
        },
      )
    }
  }
})
// 添加文字
const add = (content: string) => {
  state1.content = content
  const saveData = {
    title: state1.title,
    cataIndex: state1.cataIndex,
    content: state1.content,
    favIndex: state1.favIndex,
  }
  if (state1.title.trim() !== '' && state1.content.trim() !== '') {
    localStorage.setItem('editData', JSON.stringify(saveData))
  }

  // console.log('🚀 ~ add ~ content:', content)
}
</script>

<style></style>
