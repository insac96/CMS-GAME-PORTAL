<template>
  <div>
    <UForm ref="form" :state="state" :validate="validate" @submit="submit">
      <UFormGroup label="Trò chơi" name="game">
        <UInput :model-value="game.name" readonly />
      </UFormGroup>

      <UFormGroup label="Kênh nạp" name="gate">
        <SelectGate v-model="state.gate" v-model:gate="gateSelect" />
      </UFormGroup>

      <UFormGroup label="Khuyến mại" v-if="gateBonus && gateBonus.number > 0">
        <UInput :model-value="`+${gateBonus.number}% ${gateBonus.time}`" readonly />
      </UFormGroup>

      <div v-if="gateSelect && gateSelect.type != 1">
        <UFormGroup label="Nhập số tiền " name="money">
          <UInput v-model="state.money" type="number" placeholder="Nhỏ nhất 20.000" />
        </UFormGroup>
      </div>

      <div v-if="gateSelect && gateSelect.type == 1">
        <UFormGroup label="Chọn nhà mạng" name="card_net">
          <USelectMenu v-model="state.card.net" :options="card.net" value-attribute="value" size="lg" />
        </UFormGroup>

        <UFormGroup label="Chọn mệnh giá" name="card_money">
          <USelectMenu v-model="state.money" :options="card.money" value-attribute="value" size="lg" />
        </UFormGroup>

        <UFormGroup label="Nhập số seri" name="card_seri">
          <UInput v-model="state.card.seri" />
        </UFormGroup>

        <UFormGroup label="Nhập mã thẻ cào" name="card_pin">
          <UInput v-model="state.card.pin" />
        </UFormGroup>
      </div>

      <!-- <div v-if="!!totalCoin">
        <UFormGroup label="Tổng Xu nhận" name="money">
          <UInput :model-value="`${useMoney().toMoney(totalCoin)} Xu`" readonly />
        </UFormGroup>
      </div> -->

      <UiFlex justify="between" class="mt-4">
        <UButton color="gray" @click="modal.history = true">Lịch sử</UButton>
        <UButton type="submit" :loading="loading">Xác nhận</UButton>
      </UiFlex>
    </UForm>

    <UModal v-model="modal.payment" prevent-close>
      <UCard>
        <template #header>
          <UiFlex justify="between">
            <DataLogo />
            <UButton color="gray" icon="i-bx-x" square variant="ghost" :padded="false" @click="modal.payment = false"></UButton>
          </UiFlex>
        </template>

        <ServicePaymentView :fetch-id="payment" class="p-4"/>
      </UCard>
    </UModal>
    

    <UModal v-model="modal.history" :ui="{ width: 'lg:max-w-4xl md:max-w-2xl sm:max-w-xl' }">
      <ServicePaymentHistory @close="modal.history = false" />
    </UModal>
  </div>
</template>

<script setup>
const { dayjs, displayFull } = useDayJs()
const props = defineProps(['game'])

const form = ref()
const loading = ref(false)
const payment = ref(undefined)

// Modal
const modal = ref({
  payment: false,
  history: false
})

watch(() => modal.value.payment, (val) => {
  if(!!val) return
  payment.value = undefined
  state.value.card = {
    pin: null,
    seri: null,
    net: null
  }
  state.value.money = null
})

// State
const state = ref({
  game: props.game._id,
  gate: null,
  card: {
    pin: null,
    seri: null,
    net: null
  },
  money: null
})

watch(() => state.value.gate, () => {
  form.value.clear()
  state.value.card = {
    pin: null,
    seri: null,
    net: null
  }
  state.value.money = null
})


// Gate
const gateSelect = ref(undefined)

const gateBonus = computed(() => {
  if(!gateSelect.value) return null
  if(!gateSelect.value['bonus']) return null

  const bonus = gateSelect.value['bonus']
  const defaultBonus = parseInt(bonus.default || 0)
  const limitBonus = parseInt(bonus.limit?.number || 0)
  const limitExpired = bonus.limit?.expired || null
  let number, time

  if(limitBonus < 1 || (limitBonus > 0 && !limitExpired)) {
    number = defaultBonus
    time = ''
  }
  else {
    const now = dayjs(Date.now()).unix()
    const expired = dayjs(limitExpired).unix()
    if(now <= expired) {
      number = limitBonus
      time = `đến ${displayFull(limitExpired)}`
    }
    else {
      number = defaultBonus
      time = ''
    }
  }

  return { number, time }
})

// Total Coin
const totalCoin = computed(() => {
  if(!gateBonus.value) return null
  if(!state.value.money) return null
  if(state.value.money < 20000) return null

  const coin = state.value.money
  const coinBonus = Math.floor((parseInt(state.value.money) * parseInt(gateBonus.value.number)) / 100)

  return coin + coinBonus
})

// Card
const card = {
  net:  [
    { label: 'Viettel', value: 'VTT' },
    { label: 'Mobifone', value: 'VMS' },
    { label: 'Vinaphone', value: 'VNP' },
  ],
  money: [
    // { label: '10.000', value: 10000 },
    { label: '20.000', value: 20000 },
    { label: '30.000', value: 30000 },
    { label: '50.000', value: 50000 },
    { label: '100.000', value: 100000 },
    { label: '200.000', value: 200000 },
    { label: '300.000', value: 300000 },
    { label: '500.000', value: 500000 },
    { label: '1.000.000', value: 1000000 },
  ]
}

// Validate
const validate = (st) => {
  const errors = []
  if (!st.gate) errors.push({ path: 'gate', message: 'Vui lòng chọn kênh nạp' })
  if (!!gateSelect.value) {
    if(gateSelect.value['type'] == 1){
      if (!st.money) errors.push({ path: 'card_money', message: 'Vui lòng nhập đầy đủ' })
      if (!st.card.net) errors.push({ path: 'card_net', message: 'Vui lòng nhập đầy đủ' })
      if (!st.card.seri) errors.push({ path: 'card_seri', message: 'Vui lòng nhập đầy đủ' })
      if (!st.card.pin) errors.push({ path: 'card_pin', message: 'Vui lòng nhập đầy đủ' })
    }
    if(gateSelect.value['type'] != 1){
      if (!st.money) errors.push({ path: 'money', message: 'Vui lòng nhập đầy đủ' })
    }
  }
  return errors
}

// Submit
const submit = async () => {
  try {
    loading.value = true
    const pay = await useAPI('payment/create', JSON.parse(JSON.stringify(state.value)))

    payment.value = pay
    modal.value.payment = true
    loading.value = false
  }
  catch (e) {
    loading.value = false
  }
}
</script>