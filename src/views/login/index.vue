<template>
  <div class="login-wrap">
    <!-- <div class="logo-img">
      <img src="@/assets/imgs/default-avatar.png" alt="" />
    </div> -->
    <div class="login">
      <div class="main-left_img">
        <img src="@/assets/imgs/login-bg.png" alt="" />
      </div>
      <div class="login-model">
        <div class="content">
          <el-form ref="formRef" :model="loginForm" :rules="formRules">
            <el-form-item label="" prop="phone">
              <el-input v-model="loginForm.phone" type="number" placeholder="请输入手机号">
                <template #prefix>
                  <el-icon><iphone /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item v-if="activeTab === 'password'" prop="password">
              <el-input v-model="loginForm.password" type="password" placeholder="请输入密码">
                <template #prefix>
                  <el-icon><lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="footer-btn">
              <el-button type="primary" :loading="loginLoading" @click="loginFun">
                登 录
              </el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 底部 -->
        <footer>
          <p>xxx网络科技 备案号：京ICP备xxx-1</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { ElForm, ElFormItem, ElInput, ElIcon } from 'element-plus'
import { setToken } from '@/utils/auth'
import elv from '@/utils/elValidation'
import { useUserStore } from '@/pinia-store'
import router from '@/router'

const userStore = useUserStore()
const loginLoading = ref(false)
const activeTab = ref('password')
const formRef = ref<any>(null)
const form = reactive({
  loginForm: {
    phone: '',
    code: '',
    password: ''
  }
})
const loginForm = form.loginForm
const formRules = reactive({
  phone: [{ required: true, validator: elv.isPhone(), trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

// 回车事件
onMounted(() => {
  onKeyStroke('Enter', () => {
    if (loginLoading.value) return
    loginFun()
  })
})

// 触发登录
const loginFun = () => {
  // 表单校验
  formRef.value.validate((valid) => {
    if (valid) {
      // 验证通过
      loginLoading.value = true
      // login(form.loginForm)
      //   .then((res: any) => {
      //     setToken(res.token)
      //     loginLoading.value = false
      //     store.commit('user/updateUserInfo', {
      //       userId: res.userId,
      //       userName: res.name
      //     })
      //     router.push('/home')
      //   })
      //   .catch(() => {
      //     loginLoading.value = false
      //   })
      setTimeout(()=>{
        setToken('abcdefghijklmnopqrstuvwxyz')
        userStore.$patch({
          userId: '007',
          userName: '周杰伦',
          phone: '13000000000',
          company: '随便什么有限公司'
        })
        router.push('/home')
        loginLoading.value = false
      }, 1200)
    } else {
      return false
    }
  })
}

</script>
<style lang="scss" scoped>
.el-form {
  :deep(.el-input__inner) {
    height: 60px;
    line-height: 60px;
  }

  .el-button {
    padding: 15px 20px;
  }
}

.login-wrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f5f6fa;
}

.main-left_img {
  flex-shrink: 0;
  width: 665px;
  height: 568px;

  img {
    width: 100%;
  }
}

.login {
  height: 100%;
  min-height: 545px;
  min-width: 1000px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  box-sizing: border-box;
}

.logo-img {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 15px 70px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(63, 78, 96, 0.08);
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .line {
    height: 30px;
    width: 1px;
    background: #e3e3e3;
    margin: 0 24px;
  }

  .wjy-logo,
  .tyb-logo {
    height: 35px;
  }

  img {
    height: 100%;
    width: 80px;
  }
}

.desc {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 11%;
  color: #fff;

  h2 {
    font-size: 60px;
    margin-top: 0;
    margin-bottom: 36px;
  }

  p {
    font-size: 36px;
  }
}

.login-model {
  width: 440px;
  margin-left: 190px;
  flex-shrink: 0;
}

.content {
  background: #fff;
  padding: 34px 16px;

  .tip {
    color: #828384;
    font-size: 12px;
    margin: 15px 0 30px 0;
    text-align: center;
  }
}

:deep(.el-form-item) {
  .el-input--prefix {
    .el-input__prefix {
      left: 14px;
      display: flex;
      align-items: center;
    }

    img {
      width: 17px;
      height: 22px;
    }

    .el-input__inner {
      padding-left: 45px;
    }
  }
}

:deep(.code-item) {
  border-radius: 4px;
  border: 1px solid #dcdfe6;

  .el-form-item__content {
    flex-wrap: nowrap;
  }

  .el-input__inner {
    border: 0;
    height: 58px;
    line-height: 58px;
  }

  .el-button {
    width: 160px;
    position: relative;
    padding: 14px 20px;
    font-weight: 500;

    &.disabled {
      color: #c0c4cc;
    }

    &:hover {
      opacity: 0.7;
    }

    &::before {
      content: '';
      width: 1px;
      height: 23px;
      background: #eaebef;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

footer {
  color: #999;
  text-align: center;
  margin-top: 80px;

  p {
    font-weight: 400;
    margin-bottom: 0;
  }
}

:deep(.el-tabs) {
  .el-tabs__item {
    color: #777782;
    font-size: 24px;

    &.is-active {
      color: $text-color;
    }
  }

  .el-tabs__nav-wrap::after {
    height: 1px;
  }

  .el-tabs__nav {
    padding: 20px 0;
  }

  .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
  }

  .el-tabs__content {
    padding: 0 45px;
  }
}

.footer-btn {
  // padding: 0 45px;
  margin-bottom: 30px;

  .el-button {
    width: 100%;
    margin-top: 30px;
    height: 45px;
  }
}
</style>
