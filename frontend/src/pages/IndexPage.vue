<template>
  <q-page class="flex flex-center">
    <MyPage/>
  </q-page>
</template>

<script >
import { defineComponent } from 'vue'
import MyPage from 'src/components/myPage.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { MyPage }
})
</script>
