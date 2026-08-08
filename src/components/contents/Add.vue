<template>
  <div class="layui-container fly-marginTop">
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
                          <input
                            type="text"
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
                  </div>
                  <div class="layui-col-md9">
                    <label for="L_title" class="layui-form-label">标题</label>
                    <div class="layui-input-block">
                      <input
                        type="text"
                        id="L_title"
                        name="title"
                        required
                        lay-verify="required"
                        autocomplete="off"
                        class="layui-input"
                      />
                      <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                    </div>
                  </div>
                </div>
                <Editor></Editor>
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
})
const { isSelect, isSelect_fav, cataIndex, favIndex, catalogs, favList } = toRefs(state1)
//下拉菜单文字
const selectedText = computed({
  get: () => catalogs.value[cataIndex.value]?.text ?? '',
  set: (val: string) => {
    const item = catalogs.value[cataIndex.value]
    if (item) item.text = val
  },
})
const chooseCatalog = (item: object, index: number) => {
  state1.cataIndex = index
}
const chooseFav = (item: number, index: number) => {
  state1.favIndex = index
}
//发帖
const submit = async () => {}
//挂载时执行
onMounted(() => {
  setid()
  _getCode()
})
</script>

<style></style>
