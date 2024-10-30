import { useQuery } from "@tanstack/react-query"
import { Breadcrumb, Button, Pagination, Table, Tag } from "antd"
import { useState } from "react"
import { userApi } from "../../../api/use.api"
import { PAZE_SIZE, USER_TYPES_MAPPIGN } from "../../../constants"
import { UserItem } from "../../../interfaces/user.interface"

const UserManagement = () => {

    const [currenPage, setCurrentPage] = useState(1)
    const [pageSize ,setPageSize ]   = useState(PAZE_SIZE)

    const {data, isLoading,error}=useQuery(
        {
            queryKey: ['list-user',{currenPage ,pageSize}],
            queryFn:() => userApi.getListUser({page:currenPage ,pageSize})
        }
    )

console.log("currenPage",currenPage)

    const columns =[ {
        title: "Username1",
        key: "user-name",
        dataIndex :"taiKhoan"
    },
        {
            title: "Full Name",
            key: "full-name",
            dataIndex:"hoTen"
        },
    
    
        {
            title: "Email",
            key: "email",
            dataIndex:"email"
        },
        {
            title: "Phone number",
            key: "phone-number",
            dataIndex:"soDt"
        },
        {
            title: "Type User",
            key: "type-user",
            dataIndex: "maLoaiNguoiDung",
            render: (_:any, { maLoaiNguoiDung}: { maLoaiNguoiDung: string } ) => { 
                
                
            return<Tag> {USER_TYPES_MAPPIGN[maLoaiNguoiDung] || ""}</Tag>
             }
         },
        {
            title: "Action",
            key: "action",   
            render: (xxx:UserItem) => (
                <div className=" flex">
                    <Button type="primary" className=" mr-2" onClick={() => alert(xxx.taiKhoan) }>Edit</Button>
                    <Button type="primary" danger onClick={() => alert(xxx.taiKhoan)}>Delete</Button>
                </div>
            )
        }
    ]
    const dataSource = data?.items || [];

    const total = data?.totalCount || 0;

  return (
      <div>
          
          <div className=" flex items-center  justify-between mb-5">
              <Breadcrumb
    items={[
      {
        title: 'Dashboard',
      },
      {
          title: 'User Management',
          href:'',
      },
     
     
    ]}
              />
              <Button size="large" type="primary">Add user</Button>
          </div>

          <h3 className="font-medium  text-2xl mb-3 ">List User</h3>
          <Table rowKey="taiKhoan" columns={columns} dataSource={dataSource} pagination={false} loading={isLoading} />
          
          <div className=" flex justify-end mb-3 mt-10">
              <Pagination
                  total={100}
                  defaultCurrent={currenPage}
                  onChange={(page: number, pSize: number) => {
                      setCurrentPage(page)
                    //   if (pSize !== pageSize) {
                    //       setPageSize(pSize)
                    //   }
                  }

                    
                  }
              showSizeChanger={false}
              />
          </div>
    </div>
  )
}

export default UserManagement