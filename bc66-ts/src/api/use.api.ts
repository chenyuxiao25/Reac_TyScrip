import { GROUP_CODE, PAZE_SIZE } from "../constants";
import { ApiResponse } from "../interfaces";
import { CurrentUser, DataListUser, UseLoginRequest } from "../interfaces/user.interface";
import fetcher from "./fetcher";

export const userApi = {
    login: async(data:UseLoginRequest) => { 
        
        try {
            const response = await fetcher.post<ApiResponse<CurrentUser>>("/QuanLyNguoiDung/DangNhap", data);      
            return  response.data.content
        } catch (error: any) {
            throw Error (error.response.data.content)
            
        }
    },
    getListUser: async (payload:{page:number,pageSize ?: number}) => { 
        
        try {

            const params = {
                MaNhom: GROUP_CODE,
                SoTrang: payload.page,
                soPhanTuTrenTrang:payload.pageSize||PAZE_SIZE,

            }
            const response = await fetcher.get<ApiResponse<DataListUser>>(`QuanLyNguoiDung/TimKiemNguoiDungPhanTrang`,{params})
            return response.data.content
        } catch (error:any) {
            throw Error (error.response.data.content)
        }
     }
}