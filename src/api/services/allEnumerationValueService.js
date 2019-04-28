const enumMapData = {
  pendingType: {
    '1': '代理申请审核',
    '2': '月结单审核',
    '3': '佣金审核'
  },
  pendingStatus: {
    '0': '未审核',
    '1': '审核中',
    '2': '审核通过',
    '4': '审核退回'
  },
  proxyListStatus: {
    '0': '所有',
    '1': '正常',
    '2': '已注销',
    '3': '黑名单'
  },
  accountType: {
    '1': '有佣',
    '2': '无佣',
    '3': '有佣佔成',
    '4': '无佣佔成'
  },
  commissionType: {
    '1': '常规返佣',
    '2': '特殊返佣1',
    '3': '特殊返佣2'
  },
  strategy: {
    '1': '默认',
    '2': '权重'
  }
}

export default enumMapData
