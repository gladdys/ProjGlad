<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="EmP text-green-10" style="background: radial-gradient(circle, #c2ffd9 0%, #05ee7a 100%); font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          HRIS ko lang!
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      style="background:green"
    >
      <q-list>
        <q-img src="~assets\HMLOGO_WHITE.png">
          <div class="absolute-bottom text-center text-white">
            HR MANAGEMENT TOOL
          </div>
        </q-img>
          <!-- <img src="~assets\HMILOGO_WHITE.png" width="200" height="200"> -->

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Employee Data',
    caption: 'quasar.dev',
    icon: 'manage_accounts',
    link: 'https://quasar.dev'
  },
  {
    title: 'Work Logs',
    caption: 'github.com/',
    icon: 'access_time',
    link: 'https://github.com/quasarframework'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
