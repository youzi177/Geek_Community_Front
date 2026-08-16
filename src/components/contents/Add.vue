<template>
  <div class="layui-container fly-marginTop" :class="{ 'd-hide': isHide }">
    <div class="fly-panel" pad20 style="padding-top: 5px">
      <!--<div class="fly-none">没有权限</div>-->
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">发表新帖<!-- 编辑帖子 --></li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0">
            <div class="layui-tab-item layui-show">
              <Form @submit="submit" v-slot="{ errors }">
                <div class="layui-row layui-col-space15 layui-form-item">
                  <div class="layui-col-md3">
                    <label class="layui-form-label">所在专栏</label>
                    <div
                      class="layui-input-block"
                      @click="
                        () => {
                          isSelect = !isSelect
                        }
                      "
                    >
                      <!--isSelect是否显示下拉框  -->
                      <div
                        class="layui-unselect layui-form-select"
                        :class="{ 'layui-form-selected': isSelect }"
                      >
                        <div class="layui-select-title">
                          <Field
                            type="text"
                            name="catalog"
                            rules="is_not:请选择"
                            as="input"
                            placeholder="请选择"
                            readonly
                            v-model="selectedText"
                            class="layui-input layui-unselect"
                          />
                          <i class="layui-edge"></i>
                        </div>
                        <dl class="layui-anim layui-anim-upbit">
                          <dd
                            v-for="(item, index) in catalogs"
                            :key="index"
                            :class="{ 'layui-this': index === cataIndex }"
                            @click="chooseCatalog(item, index)"
                          >
                            {{ item.text }}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div class="layui-row">
                      <span style="color: #c00">{{ errors.catalog }}</span>
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

                    <div
                      class="layui-input-block"
                      @click="
                        () => {
                          isSelect_fav = !isSelect_fav
                        }
                      "
                    >
                      <div
                        class="layui-unselect layui-form-select"
                        :class="{ 'layui-form-selected': isSelect_fav }"
                      >
                        <div class="layui-select-title">
                          <input
                            type="text"
                            placeholder="请选择"
                            readonly
                            v-model="favList[favIndex]"
                            class="layui-input layui-unselect"
                          />
                          <i class="layui-edge"></i>
                        </div>
                        <dl class="layui-anim layui-anim-upbit">
                          <dd
                            v-for="(item, index) in favList"
                            :key="index"
                            :class="{ 'layui-this': index === favIndex }"
                            @click="chooseFav(item, index)"
                          >
                            {{ item }}
                          </dd>
                        </dl>
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
import { addPost } from '@/api/content'
import type { HttpResponse } from '@/common/interface'
const appStore = useAppStore()
//封装函数
const { state, _getCode, setid } = Uselogin()
const { code, svg } = toRefs(state)
const state1 = reactive({
  isSelect: false,
  isSelect_fav: false,
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
const { isSelect, isSelect_fav, cataIndex, favIndex, catalogs, favList, title } = toRefs(state1)
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
const chooseCatalog = (item: object, index: number) => {
  state1.cataIndex = index
}
const chooseFav = (item: number, index: number) => {
  state1.favIndex = index
}
//发帖
const submit = async () => {
  // 检测文章内容是否为空
  if (state1.content.trim() === '') {
    myalert('文章内容不得为空')
    return
  }
  const result = await addPost({
    title: state1.title,
    catalog: state1.catalogs[state1.cataIndex]?.value || '',
    content: state1.content,
    fav: state1.favList[state1.favIndex]!, //断定不为undefined
    code: state.code,
    sid: useAuthStore().sid,
  })
  //明确告知result就是HttpResponse类型
  const { code, data } = result as HttpResponse
}
//挂载时执行
onMounted(() => {
  setid()
  _getCode()
  const saveData = localStorage.getItem('addData')
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
      () => {
        localStorage.setItem('addData', '')
      },
    )
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
    localStorage.setItem('addData', JSON.stringify(saveData))
  }

  // console.log('🚀 ~ add ~ content:', content)
}
</script>

<style></style>
