import {Form, Divider, Input, InputNumber, Button, Upload, message} from "antd";
import "./index.css"
import {useState} from "react"
import {API_URL} from "../config/constants.js"
import axios from "axios"
import {useHistory} from "react-router-dom"

function UploadPage(){
    const [imageUrl, setImagUrl] = useState(null);
    const history= useHistory();

    const onSubmit = (values) => {
        axios.post(`${API_URL}/products`, {
            seller : values.seller,
            name : values.name,
            price : parseInt(values.price),
            description : values.description,
            imageUrl : imageUrl
        }).then((result) => {
            console.log(result)
            history.replace('/')
            message.success(`업로드가 완료되었습니다.`)
        }).catch((error) => {
            console.error(error);
            message.error(`에러가 발생했습니다. ${error}`)
        })      
    }
    const onChangeImage = (info) => {
        if(info.file.status === "uploading"){
            return;
        }
        if(info.file.status === "done"){
            const response = info.file.response;
            const imageUrl = response.imageUrl;
            setImagUrl(imageUrl)
        }
    }
    return (
        <div id="upload-container">
            <Form name="상품업로드" onFinish={onSubmit}>
                <Form.Item label={<div className="upload-label">상품 사진</div>}
                    name="upload">
                    <Upload 
                        name="image" 
                        action={`${API_URL}/image`}
                        listType="picture"
                        showUploadList={false}
                        onChange={onChangeImage}>
                        {
                            imageUrl ? (<img id="upload-image" src={`${API_URL}/${imageUrl}`}/>) : 
                            (
                                <div id="upload-img-placeholder">
                                <img src="/images/icons/camera.png"/>
                                <span>이미지를 업로드 해주세요.</span>
                                </div>
                            )
                        }
                    </Upload>
                </Form.Item>
                <Divider/>
                <Form.Item label={<div className="upload-label">판매자 명</div>}
                    name="seller" 
                    rules={[{required: true, message:"판매자 이름을 입력해주세요."}]}>
                    <Input className="upload-name" 
                        size="large" placeholder="이름을 입력해주세요."/>
                </Form.Item>
                <Divider/>
                <Form.Item label={<div className="upload-label">상품 이름</div>}
                    name="name" 
                    rules={[{required: true, message:"상품 이름을 입력해주세요."}]}>
                    <Input 
                        className="upload-name" 
                        size="large" placeholder="상품 이름을 입력해주세요."/>
                </Form.Item>
                <Divider/>
                <Form.Item label={<div className="upload-label">가격 </div>}
                    name="price" 
                    rules={[{required: true, message:"상품 가격을 입력해주세요."}]}>
                    <InputNumber
                        defaultValue={0}
                        className="upload-price"
                        size="large" placeholder="상품 가격을 입력해주세요."/>
                </Form.Item>
                <Divider/>
                <Form.Item 
                    label={<div className="upload-label">상품 설명</div>}
                    name="description" 
                    rules={[{required: true, message:"상품 설명을 입력해주세요."}]}>
                        <Input.TextArea
                            id="product-description" 
                            size="large" 
                            showCount maxLength={300}
                            placeholder="상품 설명을 입력해주세요."/>
                </Form.Item>
                <Form.Item>
                    <Button id="submit-button" size="large" htmlType="submit">
                        등록하기
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UploadPage;