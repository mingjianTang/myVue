import moment from 'moment'
import enumMapData from '../../api/services/allEnumerationValueService'

const myFilters = {
  formatDate: (value) => {
    if (!value) return ''
    return moment(value).format('YYYY-MM-DD HH:ss:mm')
  },
  pendingType: (value) => {
    return enumMapData.pendingType[value]
  },
  pendingStatus: (value) => {
    return enumMapData.pendingStatus[value]
  },
  proxyListStatus: (value) => {
    return enumMapData.proxyListStatus[value]
  },
  accountType: (value) => {
    return enumMapData.accountType[value]
  },
  commissionType: (value) => {
    return enumMapData.commissionType[value]
  },
  strategy: (value) => {
    return enumMapData.strategy[value]
  }
}

export default myFilters
