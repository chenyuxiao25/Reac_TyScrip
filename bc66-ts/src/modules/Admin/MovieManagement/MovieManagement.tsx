import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Breadcrumb, Button, Pagination, Popconfirm, Rate, Table, Tag, Typography } from "antd"
import { movieApi } from "../../../api/movie.api"
import { MovieItem } from "../../../interfaces/movie.interface"

 import { ClockCircleOutlined, SyncOutlined } from '@ant-design/icons'
import dayjs from "dayjs"
import { useState } from "react"
import { useListMovies } from "../../../hook/useListMovie"
import { useOpneModal } from "../../../hook/useOpenModal"
import AddOrEditMovieModal, { FormValue } from "./AddOrEditMovieModal"


const MovieManagement = () => {


    const [currenPage, setCurrentPage] = useState(1);
    // const [isOpenModal, setisOpenModal] = useState(false)
const [dataEdit,setDataEdit] = useState<MovieItem | undefined >(undefined)

    const{closeModal,isOpen,openModal} =useOpneModal()
    const queryClient = useQueryClient();
    


    // const {data, isFetching,error } = useQuery({
    //     queryKey: ["list-movie",{currenPage}],
    //     queryFn: () => movieApi.getListMovie({ page: currenPage }),   
        
    //     gcTime: 1000 * 60 * 5,
    //     staleTime: 100 * 60 * 3,
    // })
    
    
    const {data ,isFetching,error}= useListMovies(currenPage,{enabled:true})
    ///add movie
    
    const {mutate:handleAddMovieApi,isPending:isCreating} = useMutation({
        mutationFn: (payload:FormData) => movieApi.addMovie(payload),
        onSuccess: (data) => { 
            console.log("🚀 ~ MovieManagement ~ data:", data)
            
            
         },
        onError: (errors) => { 
            console.log("🚀 ~ MovieManagement ~ o:",errors )
            
            
         }
    
    })

    //delete Movie
    
    const { mutate: handleDeleteMovieApi, isPending :isDeleting} = useMutation({
        mutationFn: (idMovie: string) => movieApi.deleteMovie(idMovie),
        onSuccess: () => { 
            queryClient.refetchQueries({
                queryKey: ["list-movie", { currenPage }],
                type:"active"
            })
        },
          onError: (errors) => { 
            console.log("🚀 ~ MovieManagement ~ o:",errors )
            
            
         }
    
    })
        


    const columns = [
        
        {

            title: "Movie name",
            key: "movie-name",
            dataIndex: "tenPhim",
            width:200,
        },
        {
            title: "Image",
            key: "image",
            // dataIndex: "hinhAnh",
            render: (record:MovieItem) => { 
          
                return <img src={ record.hinhAnh} alt="record.biDanh" className="w-[100px] h-[120] rounded-sm object-cover" />
             }

        },
        {
            title: "Description",
            key: "description",
            // dataIndex: "moTa",
            render: (record: MovieItem) => { 
             
                return <Typography.Paragraph ellipsis={{
                    rows:2,
                }} className=" w-[200px]">{record.moTa}</Typography.Paragraph>
             }
        },
        {
            title: " Show time",
            key: "show-time",
            dataIndex: "ngayKhoiChieu",
            render: (date: string) => { 
             
                  return <Typography>{dayjs(new Date(date)).format('DD/MM/YYYY hh:mm a')}</Typography>;
             }
        },
        {
            title: "Rate",
            key: "rate",
            dataIndex: "danhGia",
            render: (rate: number) => { 
                
                return <Rate disabled allowHalf  defaultValue={(rate||0)/2} count={5}/>
             }
        },
        {
            title: "Hot",
            key: "hot",
            dataIndex: "hot",
            render: (isHot: boolean) => {  
                
                return isHot ?<Tag color="red">💥 Hot</Tag>:<Tag>Normal</Tag>
            }
        },
        {
            title: "Showing",
            key: "dangChieu",
            dataIndex: "dangChieu",
              render: (isShowing: boolean) => { 
                return   isShowing ?<Tag icon={<SyncOutlined spin/> } color="processing">Showing</Tag>:<Tag color="black">N/A</Tag>
             }
        },
        {
            title: "Coming soon",
            key: "sapChieu",
            dataIndex: "sapChieu",

            render: (isComing: boolean) => { 
                return isComing ?<Tag icon={<ClockCircleOutlined spin />} color='success'>isComing</Tag>:<Tag>N/A</Tag>
           }
        },
 {
            title: "Action",
            key: "action",   
            render: (record:MovieItem) => (
                <div className=" flex">
                    <Button
                    
                        
                        type="primary" className=" mr-2" onClick={() => {
                            setDataEdit(record)
                            openModal()
                        }}>Edit</Button>
                    
                    <Popconfirm
                   
                     title="Delete the task"
                  description="Are you sure to delete this task?"
                onConfirm={() => {handleDeleteMovieApi(record.maPhim.toString())}}
                 onCancel={() => {  }}
               okText="Yes"
                        cancelText="No"
                        placement="bottom"
                    >


                        <Button disabled={ isDeleting} type="primary" danger >Delete</Button>
                    </Popconfirm>
                </div>
            )
        }
    ]

    const dataSource = data?.items;
    const total = data?.totalCount || 0;

 
    const handleSubmit = (formValues: FormValue) => { 
        console.log({formValues})
        let formData = new FormData()
 formData.append('tenPhim', formValues.tenPhim);
    formData.append('trailer', formValues.trailer);
    formData.append('danhGia', formValues.danhGia);
    formData.append('moTa', formValues.moTa);
    formData.append('hinhAnh', formValues.hinhAnh);
    formData.append('hot', formValues.hot.toString());
    formData.append('dangChieu', formValues.trangThai ? 'true' : 'false');
    formData.append('sapChieu', formValues.trangThai ? 'false' : 'true');
    formData.append('ngayKhoiChieu',dayjs(new Date(formValues.ngayKhoiChieu)).format('DD/MM/YYYY'));
    formData.append('maNhom', 'GP01');

// dataEdit ? handleEditmovieApi (formdata) :handleAddMovieApi(formData)
         handleAddMovieApi(formData)
        
        
    }
    if (!isFetching && error) {
        return <div>Something went wrong</div>
    }
  return (
  <div>
      <div className=" flex items-center  justify-between mb-5">
                  <Breadcrumb
        items={[
          {
            title: 'Dashboard',
          },
          {
              title: 'Movie Management',
              href:'',
          },
      
      
        ]}
                  />
                  <Button size="large" type="primary" onClick={() => { openModal() }}>Add movie</Button>
          </div>

          <h3 className="font-medium  text-2xl mb-3 ">List movie</h3>
          <Table rowKey="maPhim" columns={columns} dataSource={dataSource} pagination={false} loading={false} />
          

               <div className=" flex justify-end mb-3 mt-10">
              <Pagination
                  total={total}
                  defaultCurrent={1}
                  onChange={(page: number, pSize: number) => { 
                      
                      setCurrentPage(page);
                  }}
                         
              showSizeChanger={false}
              />
          </div>
          <AddOrEditMovieModal dataEdit={ dataEdit} isPending={isCreating} isOpen={isOpen} OnCloseModal={closeModal} onSubmit={ handleSubmit} />
         
      
  </div>


  
  )
}

export default MovieManagement


