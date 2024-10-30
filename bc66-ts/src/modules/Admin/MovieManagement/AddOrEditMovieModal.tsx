import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, DatePicker, Form, GetProps, Input, Modal, Radio, Row, Typography, Upload } from 'antd'
import dayjs from "dayjs"
import { FC, useEffect } from 'react'
import { Controller, useForm } from "react-hook-form"
import { MovieItem } from '../../../interfaces/movie.interface'
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

export interface FormValue {
    tenPhim: string,
    trailer: string,
    moTa: string,
    trangThai: boolean,
    hot: boolean,
    danhGia: string,
    ngayKhoiChieu: any,
    hinhAnh: any,
    maNhom:any,
}


interface AddOrEditMovieModalProps {

  isOpen: boolean,
  OnCloseModal: () => void,
  isPending: boolean,
  onSubmit: (formValue: FormValue) => void,
  dataEdit?:MovieItem
}
const AddOrEditMovieModal:FC<AddOrEditMovieModalProps> = ({isOpen,OnCloseModal,isPending,onSubmit,dataEdit}) => {


      const {handleSubmit ,control,setValue,watch,reset} = useForm<FormValue>({
        defaultValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            trangThai: false,
            hot: false,
            danhGia: "",
            ngayKhoiChieu: "",
            hinhAnh:undefined,
            
        }
      })
  const watchHinhAnh = watch("hinhAnh")

    const statusMovie = watch("trangThai")

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};
  useEffect(() => { 
      if (dataEdit) {
        
          
          setValue("tenPhim",dataEdit.tenPhim)
          setValue("trailer",dataEdit.tenPhim)
          setValue("moTa",dataEdit.moTa)
          setValue("trangThai",dataEdit.dangChieu)
          setValue("hot",dataEdit.hot)
          setValue("danhGia",dataEdit.danhGia.toString())
          setValue("ngayKhoiChieu",dayjs(new Date(dataEdit.ngayKhoiChieu)))
    // console.log("🚀 ~ useEffect ~ dataEdit:", dataEdit)
    
    }
   },[dataEdit])

    
    useEffect(() => { 
        if (!isOpen) {
            reset()
        }

    },[isOpen])
  return (
    <Modal open={isOpen}
      title={<Typography className="text-2xl font-medium" >{ dataEdit ?"Edit Movie":"Add Movie"}</Typography>}
              onCancel={OnCloseModal}
              footer={false}
           width={700}>
             

         
          <Form className="m-w-[450]" onFinish={handleSubmit(onSubmit)
          }>
              
                  <Row gutter={[48,24]}>
                
                  <Col span={24}>
                      <label className="text-xs ">
                          <span className="text-red-600">*</span>
                              Movie name</label>
                          <Controller
                              name="tenPhim"
                              control={control}
                              render={({ field }) => <Input  {...field} size="large" placeholder="Movie name"className="mt-1" />}
                          />
                 </Col>
                  
                 
                  <Col span={24}>
                      <label className="text-sm ">
                          <span className="text-red-600">*</span>
                              Trailer</label>
                          <Controller
                              name="trailer"
                              control={control}
                              render={({ field }) => <Input  {...field} size="large" placeholder="Trailer"className="mt-1" />}
                          />

            
                      </Col>
                      
                  <Col span={24}>
                      <label className="text-sm ">
                          <span className="text-red-600">*</span>
                            Description  </label>
                          <Controller
                              name="moTa"
                              control={control}
                              render={({ field}) => 
                                  <Input.TextArea {...field} rows={ 4} size="large" placeholder="Description"className="mt-1" />
                            
                            }
                          />
                         
                      </Col>
                      


                  <Col span={24}>
                      <label className="text-xs  block">
                              <span className="text-red-600">*</span>
                              Status
                          </label>

                           <Controller 
                              name="trailer"
                              control={control}
                              render={({ field }) => (
                              <Radio.Group    {...field} className="mt-1" defaultValue={1}>
                              <Radio value={true}>Showing</Radio>
                              <Radio value={false}>Coming soon</Radio>
                          </Radio.Group>
                       
                              )}
                               />
         

                      
                       
                         
                      </Col>


                      
                      <Col span={24} >
                          <Controller
                              name="hot"
                             control={control}
                          
                          render={({ field }) =>
                              <Checkbox checked={field.value} {...field} > Fim hot</Checkbox>} 
                          />
                          
                          </Col> 
                    
                      

                      <Col span={12}>
                          <label className="text-sm">
                              <span className="text-red-600">*</span>
                        Rate
                          </label>

                          <Controller
                              name="danhGia"
                              control={control}
                              render={({ field }) => 
                                  <Input{...field} placeholder=" Rate" size="large" className="mt-1" type="numnber" max={10} />
                              
                              }
                             

                           />
                      

                      </Col>

                <Col span={12}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Release date
            </label>
            <Controller
              name="ngayKhoiChieu"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  size="large"
                  className="mt-1 w-full"
                  placeholder="DD/MM/YYYY"
                  format={"DD/MM/YYYY"}
                  disabledDate={!statusMovie ? disabledDate : undefined}
                />
              )}
            />
          </Col>
                              

                       
                         
                     

                      <Col span={25}>
                         <Controller
                              name="hinhAnh"
                              control={control}
                              render={({ field : {onChange,...field}}) => (
                                  <Upload
                                      {...field}
                                      multiple={false}
                                  
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader relative w-fit"
                          showUploadList={false}
                        beforeUpload={() => false}
                          onChange={(info) => { 
                        console.log("🚀 ~ MovieManagement ~ info:", info)
                                          //   setValue("hinhAnh",info.file)
                                          onChange(info.file)
                                      
                                   }}


                                      
                                  > 
                        
                        <button style={{ border: 0, background: 'none' }}
                                          type="button">
                                          
                                          {watchHinhAnh || dataEdit ?
                                              (
                                                  <div>
                                                   
                                                      <img className="w-[60px] h-[80px] object-cover
                                                //   "src={  dataEdit?.hinhAnh ||  URL.createObjectURL(new Blob([watchHinhAnh]))} />
                                                
                                                      <div className="absolute top-1 right-1 cursor-pointer"
                                                          onClick={(event) => {
                                                              event.stopPropagation()
                                                              setValue("hinhAnh", undefined)
                                                          }}>
                                                          <DeleteOutlined/>
                                                      </div>
                                                      </div>
                                            
                                              ) :
                                              
                                              (
                                                  <>
                                                       <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                                  </>
                                             
                                              )
                                          
                                          }
                       
                         </button>
                         </Upload>
  )}
                           />
                          </Col>
                                  
                                  
                     
                      <Col span={24} className="  flex  justify-end">
                          <Button
                         
                        type="default" size="large"> Cancel</Button>
                          <Button 
                              loading={isPending}
                              
                              disabled={isPending}
                              htmlType="submit"
                              type="primary"
                              className="ml-3"
                              size="large"> Add Movie
                          </Button>
                      </Col> 
                      
                   
                           
                      

                      
              </Row>
              


        </Form>
          

          </Modal>
  )
}

export default AddOrEditMovieModal