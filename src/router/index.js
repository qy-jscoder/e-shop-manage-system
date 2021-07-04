import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
//路由懒加载
const Login = () => import('components/Login/Login.vue')
const Home = () => import('views/home/Home.vue')
const Welcome=()=>import('views/home/Welcome.vue')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect:'/welcome',
    //此时的页面是home组件，但是在主体部分要有内容，如果直接写在home组件中会十分臃肿，
    //所以，可以设置子路由
    children:[{
      path:'/welcome',
      component:Welcome
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//添加导航守卫，为页面跳转设置条件
router.beforeEach((to, from, next) => {
  //无论此时处于什么界面，只要是准备向登录跳转，那么都可以
  if (to.path === '/login') return next()

  //获取保存在session中的token值
  const tokenStr = sessionStorage.getItem('token')

  //如果在非登录界面之间跳转，且token值被清空，那么就自动跳转到登录界面
  if (!tokenStr) return next('/login')
  //next必加，否则不会实现跳转
  next()
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router
