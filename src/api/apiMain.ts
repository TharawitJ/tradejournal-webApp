import useUserStore from '../stores/userStore'
import axios from 'axios'

export const mainApi = axios.create({
  baseURL : 'http://localhost:3500/',
  headers : {
    'Content-Type' : 'application/json'
  }
})
mainApi.interceptors.request.use( config => {
  const token = useUserStore.getState().token
  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const apiRegister = async (body:any) => {
  return await mainApi.post('/register', body)
}

export const getUserProfile = () => mainApi.get('/user/profile')
export const updateUserProfile = (userId:any,body:any) => mainApi.patch(`/user/profile`, body)
export const deleteUserProfile = () => mainApi.delete(`/user/profile`)
export const getUserModel = () => mainApi.get(`/usermodel`)
export const createUserModel = (body: any) => mainApi.post(`/usermodel`, body)
export const deleteUserModel = (userId: number) => mainApi.delete(`/usermodel/${userId}`)
export const getUserFundHistory = (userId:number)=>mainApi.get(`/fundhistory/${userId}`)
export const getAllAsset = ()=>mainApi.get(`/asset/`)

export const apiGetAllJournal = () => mainApi.get(`/journal`)
export const apiCreateJournal = (body:any) => mainApi.post('/journal', body)
export const apiUpdateJournal = (id:string, body:any) => mainApi.patch(`/journal/${id}`, body)
export const apiDeleteJournal = (id:string) => mainApi.delete(`/journal/${id}`)

// export const getDashboard = ()=>mainApi.get(`/dashboard`)
export const getDashboardRR = () => mainApi.get('/dashboard/riskreward')
// result {
//   "AverageRR": 3.4109389934283847
// }
export const getDashboardWinRate = () => mainApi.get('/dashboard/winrate')
// result will be number you need to add % after number and show to UI as a percentage {
//   "winrate": 100
// }
export const getDashboardPnL = () => mainApi.get('/dashboard/pnl')
// winLose toggle from frontend profitPosition get calculate at frontend and update to backend if winLose === "WIN"||"LOSE".
  // "result": [
  //   {
  //     "duration": null,
  //     "slPercent": 0.009999999999999933,
  //     "tpPercent": 0.05000000000000006,
  //     "profitPosition": null,
  //     "winLose": null
  //   },{
  //     "duration": null,
  //     "slPercent": 0.8681346910437399,
  //     "tpPercent": 0.8918759902444234,
  //     "profitPosition": null,
  //     "winLose": null
  //   },]