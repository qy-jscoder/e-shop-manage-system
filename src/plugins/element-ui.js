import Vue from 'vue'
//按需导入组件
import {
    Button, Form, FormItem, Input, Message,
    Container, Header, Aside, Main, Menu, MenuItem,
    MenuItemGroup, Submenu,Breadcrumb,BreadcrumbItem
} from 'element-ui';

//使用组件
Vue.use(Button).use(Form).use(FormItem)
    .use(Input).use(Container).use(Header)
    .use(Aside).use(Main).use(Menu)
    .use(MenuItem).use(Submenu).use(MenuItemGroup)
    .use(Breadcrumb).use(BreadcrumbItem)

//elementui的message要挂载到原型中
Vue.prototype.$message = Message
