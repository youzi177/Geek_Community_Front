<template>
  <div class="panel pd20 main">
    <div class="msg">Hi,Admin,你已经是我们的正式会员！</div>
    <div class="layui-row layui-col-space20">
      <!-- 会员信息和签到 -->
      <div class="layui-col-md6">
        <div class="panel border">
          <div class="title">我的会员信息</div>
          <div class="content fly-signin">
            <p>
              积分经验值：<cite>{{ userInfo.favs }} </cite>
            </p>
            <p>
              您当前为:<cite>{{ userInfo.isVip === '0' ? '非VIP' : 'VIP' + userInfo.isVip }}</cite>
            </p>
          </div>
        </div>
      </div>
      <div class="layui-col-md6">
        <Sign class="border"></Sign>
      </div>
      <!-- 快捷方式 -->
      <div class="layui-col-md12">
        <div class="panpel border">
          <div class="title">快捷方式</div>
          <div class="content">
            <ul class="layui-row layui-col-space10">
              <li class="layui-col-sm3 layui-col-xs4" v-for="(item, index) in lists" :key="index">
                <RouterLink :to="{ name: item.link }">
                  <div class="layui-icon shortcut" :class="item.icon"></div>
                  <span>{{ item.name }}</span>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import Sign from '../sidebar/Sign.vue'
import type { HttpResponse } from '@/common/interface.ts'
import { useUserStore } from '@/stores/user.ts'
import { getInfo } from '@/api/user.ts'
const UserStore = useUserStore()
const lists = ref([
  {
    name: '修改信息',
    icon: 'layui-icon-set',
    link: 'info',
  },
  {
    name: '修改头像',
    icon: 'layui-icon-face-smile',
    link: 'pic',
  },
  {
    name: '修改密码',
    icon: 'layui-icon-password',
    link: 'password',
  },
  {
    name: '账号绑定',
    icon: 'layui-icon-app',
    link: 'accounts',
  },
  {
    name: '发表新帖',
    icon: 'layui-icon-add-circle',
    link: '',
  },
  {
    name: '查看分享',
    icon: 'layui-icon-share',
    link: '',
  },
  {
    name: '我的贴子',
    icon: 'layui-icon-username',
    link: 'mypost',
  },
  {
    name: '我的收藏',
    icon: 'layui-icon-rate-solid',
    link: 'mycollection',
  },
  {
    name: '其他资料',
    icon: 'layui-icon-template-1',
    link: '',
  },
  {
    name: '关注公众号',
    icon: 'layui-icon-login-wechat',
    link: '',
  },
  {
    name: '文档',
    icon: 'layui-icon-read',
    link: '',
  },
  {
    name: '后台管理',
    icon: 'layui-icon-user',
    link: '',
  },
])
onMounted(() => {
  getUserInfo()
})
const userInfo = computed(() => {
  return UserStore.userInfo
})
const getUserInfo = async () => {
  const result = await getInfo({
    uid: UserStore.userInfo._id,
  })
  const { code, data } = result as HttpResponse
  if (code === 200) {
    // 这里虽然更新整个UserInfo，但是该方法，只在有数据更新的时候更新，没有更新的保持不变
    // 比如isSign在登录的时候有，则保存，但是这个接口没有返回isSign，则采用登录的时候isSign，不会消失或者改变
    UserStore.setUserInfo(data)
  }
}
</script>

<style lang="scss" scoped>
// x768的时候，把panel的margin值为0
@media screen and (max-width: 768px) {
  .panel {
    &.main {
      margin: 0 !important;
    }
  }
}
.panel {
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  color: #333;
  &.main {
    margin: 0 0 10px 225px;
  }
}
.msg {
  background-color: #f8f8f8;
  color: #666;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.border {
  border: 1px solid #e6e6e6;
}
.pd20 {
  padding: 20px;
}
.title {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px dotted #e9e9e9;
  font-size: 14px;
  padding: 0 15px;
}
.content {
  padding: 18px 15px;
  // height: 50px;
  line-height: 26px;
  font-size: 14px;
  color: #666;
}
li {
  text-align: center;
  padding: 5px;
}
.shortcut {
  background-color: #2f9688;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  font-size: 30px;
}
</style>
