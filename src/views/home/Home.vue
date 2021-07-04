<template>
  <div id="home">
    <el-container class="home-container">
      <!--头部区域-->
      <el-header>
        <div>
          <img src="../../assets/heima.png" alt="" />
          <span>电商后台管理系统</span>
        </div>
        <el-button type="primary" @click="logOut" class="btn" size="small  "
          >退出</el-button
        >
      </el-header>
      <el-container>
        <!--侧边导航菜单-->
        <el-aside :width="menuWidth">
          <div class="toggle_button" @click="toggleClick">|||</div>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            unique-opened 
            :collapse="isCollapse"
            :collapse-transition="isTransition"
            router
          >
            <el-submenu
              :index="item.id + ''"
              v-for="item in menuList"
              :key="item.id"
            >
              <template slot="title">
                <i :class="icons[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item             
                :index="'/'+itemChildren.path"
                v-for="itemChildren in item.children"
                :key="itemChildren.id"
              >
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>{{ itemChildren.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!--主要内容区域-->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      menuList: [],
      icons: {
        '125':'iconfont icon-user',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao'
      },
      isCollapse:false,
      isTransition:false,
      menuWidth:"200px"
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    //删除存储在sessionStorage中的登录数据
    logOut() {
      sessionStorage.clear()
      this.$router.push('/login')
    },

    //获取菜单列表数据
    async getMenuList() {
      const res = await this.$http.get('/menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log(this.menuList)
    },
    toggleClick(){
      this.isCollapse=!this.isCollapse
      this.menuWidth=this.isCollapse?"64px":"200px"
    }
  },
}
</script>
<style lang="scss" scoped>
#home {
  height: 100vh;
}
.home-container {
  height: 100%;
  .el-header {
    background: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    color: #fff;
    div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }
  & > .el-container {
    .el-aside {
      background: #333744;
      .toggle_button{
        text-align: center;
        color: white;
        background-color: #4A5064;
        font-size: 10px;
        line-height: 24px;
        letter-spacing:0.2em ;
      }
      .el-menu{
        border-right: none;
        .el-submenu{
          .iconfont{
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>