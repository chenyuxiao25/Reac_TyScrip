import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayouts/Authlayout'

import { AdminLayout } from '../layouts/AdminLayout'
import { AccountSetting } from '../modules/Admin/AccountSetting'
import { CenemaManagement } from '../modules/Admin/CenemaManagement'
import { MovieManagement } from '../modules/Admin/MovieManagement'
import { UserManagement } from '../modules/Admin/UserManagement'
import { LoginPage } from '../modules/auth/Login'
import { RegesterPage } from '../modules/auth/Regester'
import { useAppSelector } from '../redux/hook'
import { PATH } from './path'

const RejectedRouter = () => { 
    const { currentUser } = useAppSelector((state) => state.user)
    
    if (currentUser === null) {
        return <Outlet/>
    }
    return currentUser.maLoaiNguoiDung === "QuanTri" ?<Navigate to ={PATH.ADMIN}/>:<Navigate to={PATH.HOME } />
 }


const ProtectedRouter = () => { 
    const { currentUser } = useAppSelector((state) => state.user)
    
    if (currentUser === null) {
        return  <Navigate to ={PATH.LOGIN}/>
    }
    return currentUser.maLoaiNguoiDung === "QuanTri"?<Outlet/>:<Navigate to = {PATH.HOME}/>
  }
const useRouterElement = () => {

    const routes = useRoutes([
        {
            path: "auth",
            element: <RejectedRouter />,
            children: [
                
                {
                    path: PATH.LOGIN,
                    element: <AuthLayout>
                        <LoginPage/>
                    </AuthLayout>
                },

                {
                    path: PATH.REGESTER,
                    element: <AuthLayout>
                        <RegesterPage/>
                    </AuthLayout>
                }
            ]
        }, 
        

        {

            path: PATH.ADMIN,
            element: <ProtectedRouter />,
            children: [
                {
                    index: true,
                    element :<Navigate to ={PATH.ADMIN_USER}/>
            },
                {
                    path: PATH.ADMIN_USER,
                    element: (<AdminLayout>
                        <UserManagement/>
                    </AdminLayout>)
                },
                {
                    path: PATH.ADMIN_MOVIE,
                    element: (
                        <AdminLayout>
                          <MovieManagement/>
                        </AdminLayout>
                    )
                },
                {
                    path: PATH.ADMIN_CINEMA,
                    element: (
                        <AdminLayout>
                          <CenemaManagement/>
                        </AdminLayout>
                    )
                },
                {
                    path: PATH.ADMIN_ACCOUNT_SETTINGS,
                    element: (
                        <AdminLayout>
                          <AccountSetting/>
                        </AdminLayout>
                    )
                }

            ]
        }
])


    return (
        routes
      
  )
}

export default useRouterElement