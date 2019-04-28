<template>
  <div class="nav-left">
    <div class="navigation">
      <router-link to="/demo" class="nav-sub-a">导航</router-link>
    </div>
    <ul class="nav nav-trunk">
      <li v-for="(item,index) in menuList" :key="index" v-bind:class="{active: item.extend}">
        <a class="nav-trunk-a" href="javascript:void(0);" @click="selectOption(item,index)">
          <div class="nav-link">
            <i v-bind:class="item.icon"></i>
            <span>{{item.translate}}</span>
            <span class="arrow">
              <i class="iconfont icon-xuanzeqixiayige" v-show="!item.extend"></i>
              <i class="iconfont icon-xuanzeqizhankai" v-show="item.extend"></i>
            </span>
          </div>
        </a>
        <ul class="nav nav-sub">
          <li v-for="(i,ind) in item.childrens" :key="ind">
            <router-link :to="i.url" class="nav-sub-a">{{i.translate}}</router-link>
          </li>
        </ul>
      </li>
    </ul>
    <div class="footer clearfix">
      <div class="left">© 2018 Copyright.</div>
      <div class="right">1.0.0</div>
    </div>
  </div>
</template>

<style lang="less">
.nav-left {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  color: #7793a7;
  background-color: #1c2b36;
  padding-top: 50px;
  overflow: hidden;
  z-index: 1;
  .navigation {
    height: 50px;
    line-height: 50px;
    margin-left: 15px;
  }
  .nav-trunk {
    list-style: none;
    padding: 0;
    margin: 0;
    > li {
      width: 200px;
      position: relative;
      a {
        display: block;
        width: 200px;
        height: 40px;
        box-sizing: border-box;
        padding: 10px 20px 10px 30px;
        .nav-link {
          padding: 0;
          i {
            position: absolute;
            left: 20px;
            top: 8px;
          }
          span {
            margin-left: 10px;
          }
        }
      }
      .nav-sub {
        height: 0;
        list-style: none;
        padding: 0;
        overflow: hidden;
        margin-left: -50px;
        transition: margin-left 0.2s ease-in-out;
        li {
          padding: 0;
          .nav-sub-a {
            padding: 10px 0 10px 50px;
          }
        }
      }
      span {
        font-weight: 700;
        color: #869fb1;
      }
      .arrow {
        font-weight: 500;
        position: absolute;
        right: 45px;
        top: 0;
      }
    }
    > li:hover {
      background-color: #131e26;
    }
    > li.active {
      background-color: #131e26;
      .nav-sub {
        height: auto;
        margin-left: 0;
      }
      .nav-trunk-a:hover {
        background-color: #16232d;
      }
      .nav-sub-a:hover {
        background-color: #16232d;
      }
    }
  }
  .footer {
    position: absolute;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding-left: 200px;
    bottom: 0;
    background-color: #edf1f2;
    color: #58666e;
    .left {
      height: 50px;
      line-height: 50px;
      float: left;
      margin-left: 30px;
    }
    .right {
      height: 50px;
      line-height: 50px;
      float: right;
      margin-right: 30px;
    }
  }
}
</style>

<script>
export default {
  data () {
    return {
      menuList: [
        {
          name: 'MenuManage',
          url: 'app',
          icon: 'iconfont icon-zhuye light-blue-400',
          translate: '菜单管理',
          sortIndex: 1,
          extend: false,
          childrens: [
            {
              name: 'Menu',
              url: 'app.menu',
              icon: 'icon-list',
              translate: '菜单',
              sortIndex: 1
            }
          ]
        },
        {
          name: 'UserManage',
          url: 'app',
          icon: 'iconfont icon-VIP_paiban red',
          translate: '用户权限管理',
          sortIndex: 2,
          extend: false,
          childrens: [
            {
              name: 'User',
              url: 'app.user',
              icon: 'icon-user 1',
              translate: '用户管理',
              sortIndex: 1
            },
            {
              name: 'Role',
              url: 'app.role',
              icon: 'icon-users',
              translate: '角色管理',
              sortIndex: 2
            }
          ]
        },
        {
          name: 'systemConfig',
          url: 'app.sysConfig',
          icon: 'iconfont icon-icon_shezhi cyan-A700',
          translate: '系统设置',
          sortIndex: 3,
          extend: false,
          childrens: [
            {
              name: 'sysParamConfig',
              url: 'app.sysConfig',
              icon: 'fa fa-archive text-warning',
              translate: '参数设置',
              sortIndex: 1
            }
          ]
        },
        {
          name: 'ServiceManage',
          url: 'app',
          icon: 'iconfont icon-fuwuguanli green-700',
          translate: '服务管理',
          sortIndex: 4,
          extend: false,
          childrens: [
            {
              name: 'EntityFieldEncrypt',
              url: 'app.entityFieldEncrypt',
              icon: 'fa fa-sticky-note ',
              translate: '加密管理',
              sortIndex: 1
            },
            {
              name: 'Service',
              url: 'app.service',
              icon: 'fa fa-server text-success-dker',
              translate: '服务',
              sortIndex: 2
            }
          ]
        },
        {
          name: 'PendingItemManage',
          url: 'app',
          icon: 'iconfont icon-lingdang1 blue-grey-300',
          translate: '待办事项',
          sortIndex: 5,
          extend: false,
          childrens: [
            {
              name: 'pendingitem',
              url: '/pendingitem',
              icon: 'fa fa-bell-o ',
              translate: '代办事项列表',
              sortIndex: 1
            }
          ]
        },
        {
          name: 'AgentManage',
          url: 'app',
          icon: 'iconfont icon-renwuzhongxin blue-600',
          translate: '代理管理',
          sortIndex: 6,
          extend: false,
          childrens: [
            {
              name: 'invitation',
              url: 'invitation',
              icon: 'glyphicon glyphicon-bell text-danger-lt',
              translate: '邀请列表',
              sortIndex: 1
            },
            {
              name: 'proxyList',
              url: 'proxyList',
              icon: 'fa fa-bars ',
              translate: '代理列表',
              sortIndex: 2
            },
            {
              name: 'customerList',
              url: 'app.customerList',
              icon: 'glyphicon glyphicon-user  text-success-dk',
              translate: '客户列表',
              sortIndex: 3
            },
            {
              name: 'agentAchievement',
              url: 'app.achievementList',
              icon: 'glyphicon glyphicon-star-empty text-info-dk',
              translate: '代理业绩',
              sortIndex: 4
            }
          ]
        },
        {
          name: 'monthManage',
          url: 'app',
          icon: 'iconfont icon-yingyeshouru orange-800',
          translate: '月结单管理',
          sortIndex: 7,
          extend: false,
          childrens: [
            {
              name: 'monthList',
              url: 'app.settleList',
              icon: 'glyphicon glyphicon-indent-right text-primary-dk',
              translate: '月结单列表',
              sortIndex: 1
            }
          ]
        },
        {
          name: 'settleManage',
          url: 'app',
          icon: 'iconfont icon-dianshang yellow-500',
          translate: '佣金结算管理',
          sortIndex: 8,
          extend: false,
          childrens: [
            {
              name: 'settleList',
              url: 'app.settleList',
              icon: 'glyphicon glyphicon-indent-right text-primary-dk',
              translate: '佣金结算列表',
              sortIndex: 1
            }
          ]
        },
        {
          name: 'CommissionRuleManage',
          url: 'app',
          icon: 'iconfont icon-edit_sucai teal-50',
          translate: '返佣规则管理',
          sortIndex: 9,
          extend: false,
          childrens: [
            {
              name: 'setCommissionRule',
              url: 'app.commission',
              icon: 'glyphicon glyphicon-cog text-warning-dk',
              translate: '设置返佣规则',
              sortIndex: 1
            },
            {
              name: 'agentCommissiobRule',
              url: 'app.agentCommissionRule',
              icon: 'glyphicon glyphicon-tree-deciduous text-success-dk',
              translate: '代理返佣规则',
              sortIndex: 2
            }
          ]
        },
        {
          name: 'QuotationNews',
          url: 'app',
          icon: 'iconfont icon-custom-activity cyan-A100',
          translate: '行情快讯',
          sortIndex: 10,
          extend: false,
          childrens: [
            {
              name: 'marketnews',
              url: 'marketnews',
              icon: 'glyphicon glyphicon-cog text-warning-dk',
              translate: '市场快讯',
              sortIndex: 1
            }
          ]
        },
        {
          name: 'Group',
          url: 'app',
          icon: 'iconfont icon-custom-equipment light-green-A700',
          translate: '支付通道',
          sortIndex: 11,
          extend: false,
          childrens: [
            {
              name: 'groupList',
              url: 'groupList',
              icon: 'glyphicon glyphicon-cog text-warning-dk',
              translate: '分组列表',
              sortIndex: 1
            }
          ]
        }
      ]
    }
  },
  created () {},
  methods: {
    selectOption (item, index) {
      if (item.extend) {
        item.extend = false
      } else {
        this.menuList.forEach(function (i) {
          i.extend = false
        })
        item.extend = true
      }
    }
  }
}
</script>
