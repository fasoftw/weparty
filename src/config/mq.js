import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints: {
        xs:576,
        Z0: 685,  // Entre 576-648 (faço a troca de 2 para 1)
        s: 768,  // Entre 648 - 972 (faco troca 1 para 2 e 3 - 2)
        Z2: 1030,  // era 972
        md: 1040,  // era 992
        lg: 1200,
        Z3: 1369,
        xl: Infinity
    },
    defaultBreakpoint: 'lg'


  })