import api from './fetch'
import { API_ROOT } from './constants'

export const all = data => api.fetch(`${API_ROOT}/helix/users`, { data })
