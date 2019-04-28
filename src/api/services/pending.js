import base from '../base'
import axios from '../../request/http.js'

const pending = {
  pendingList (params) {
    return axios.get(`${base.easyMock}/PendingApprove/View`, {
      params: params
    })
  }
}

export default pending
