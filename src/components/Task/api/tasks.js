import axios from 'axios'
import apiUrl from '../../../apiConfig'

export const getTasks = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/tasks',
    headers: {
      'Authorization': `Bearer ${this.props.user.token}`
    }
  })
}
