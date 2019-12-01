import api from './fetch'
import { API_ROOT } from './constants'

export const all = data => api.fetch(`${API_ROOT}/helix/games`, { data })

export const top = () => api.fetch(`${API_ROOT}/helix/games/top`)
