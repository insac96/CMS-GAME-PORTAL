<template>
  <UForm :state="state" :validate="validate" @submit="submit">
    <UFormGroup label="Tài khoản" name="username" :hint="`${state.username ? state.username.length : 0}/15`">
      <UInput icon="i-bxs-user" v-model="state.username" />
    </UFormGroup>

    <UFormGroup label="Mật khẩu" name="password" :hint="`${state.password ? state.password.length : 0}/15`">
      <UInput icon="i-bxs-lock" v-model="state.password" type="password" />
    </UFormGroup>

    <UFormGroup label="Nhập lại mật khẩu" name="confirm">
      <UInput icon="i-bxs-lock" v-model="state.confirm" type="password" />
    </UFormGroup>

    <UiFlex justify="between">
      <UiText size="sm" color="gray" class="cursor-pointer" @click="emits('signin')">Đăng nhập ngay?</UiText>
      <UButton type="submit" :loading="loading">Đăng Ký</UButton>
    </UiFlex>
  </UForm>
</template>

<script setup>
const emits = defineEmits(['done', 'signin'])

const authStore = useAuthStore()
const loading = ref(false)
const state = ref({
  username: undefined,
  confirm: undefined,
  password: undefined
})

const validate = (state) => {
  const errors = []
  if (!state.username) errors.push({ path: 'username', message: 'Vui lòng nhập đầy đủ' })
  else if (state.username.length < 6 || state.username.length > 15) errors.push({ path: 'username', message: 'Độ dài 6-15 ký tự' })
  else if (!!state.username.match(/\s/g)) errors.push({ path: 'username', message: 'Phát hiện khoảng cách' })
  else if (!(/^[a-z0-9]*$/g).test(state.username)) errors.push({ path: 'username', message: 'Phát hiện ký tự đặc biệt và viết hoa' })
  else if (!!state.username.includes('admin')
    || !!state.username.includes('smod')
    || !!state.username.includes('robot')
  ) errors.push({ path: 'username', message: 'Danh xưng không hợp lệ' })

  if (!state.password) errors.push({ path: 'password', message: 'Vui lòng nhập đầy đủ' })
  else if (state.password.length < 6 || state.password.length > 15) errors.push({ path: 'password', message: 'Độ dài 6-15 ký tự' })
  else if (!!state.password.match(/\s/g)) errors.push({ path: 'password', message: 'Phát hiện khoảng cách' })

  if (!state.confirm) errors.push({ path: 'confirm', message: 'Vui lòng nhập đầy đủ' })
  else if (!!state.password && (state.confirm != state.password)) errors.push({ path: 'confirm', message: 'Chưa trùng khớp' })

  return errors
}

const submit = async () => {
  try {
    if(!!loading.value) return
    loading.value = true
    
    await useAPI('auth/sign/up', JSON.parse(JSON.stringify(state.value)))
    await authStore.getAuth()

    loading.value = false
    emits('done')
  }
  catch (e) {
    loading.value = false
  }
}
</script>