import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

import 'lib-flexible/flexible'

Vue.config.productionTip = false

import { Tab, Tabs,Icon,Toast,list,Lazyload ,image,button     } from 'vant'

   Vue
   .use(Tab)
   .use(Tabs)
   .use(Icon)
   .use(Toast)
   .use(list)
   .use(image )
   .use(button )

   Vue.use(Lazyload, {
    lazyComponent: true,
  });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
