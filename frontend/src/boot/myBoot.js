import { boot } from 'quasar/wrappers'
import axios from 'axios'
import wings from 'wings4'
const wings4 = wings('http://localhost:3030/')
// import { wings } from "wings4";
// const app=wings('http://localhost:3030/')

export default boot(async ({ app }) => {
  app.config.globalProperties.$api = axios.create({
    baseURL: 'http://localhost:3030/'
  })
  app.config.globalProperties.$entryService = wings4.wingsService('employees')
})
