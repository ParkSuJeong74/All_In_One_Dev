import {useParams} from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react";
import "./index.css"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {API_URL} from "../config/constants.js"
import {Button, message} from "antd"

dayjs.extend(relativeTime);
function ProductPage(){
    const {id} = useParams();
    const [product, setProduct] = useState(null);

    const getProduct = () => {
        axios.get(`${API_URL}/products/${id}`)
        .then(function (result){
            setProduct(result.data.product)
            console.log(result);
        })
        .catch(function (error){
            console.error(error);
        })
    }

    useEffect(function(){  
        getProduct();
    }, []);
    console.log(product);

    if(product === null){
        return <h1>상품 정보를 받고 있습니다...</h1>
    }

    const onClickPurchase = (req, res) => {
        axios.post(`${API_URL}/purchase/${id}`)
        .then(() => {
            message.info("구매 완료!")
            getProduct();
        })
        .catch((error) => {
            console.error("에러 발생", error)
            res.status(500).send("에러 발생!!!")
        })
    }

    return (
        <div>
            <div id="image-box">
                <img src={`${API_URL}/${product.imageUrl}`}/>
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png"/>
                <span>{product.seller}</span>
            </div>
            <div id="contents-box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}원</div>
                <div id="createAt">{dayjs(product.createdAt).format("YYYY년 MM월 DD일")}</div>
                <Button 
                id="purchase-button" 
                size="large" 
                type="primary" 
                danger onClick={onClickPurchase}
                disabled={product.soldout === 1}>구매하기</Button>
            </div>
            <div id="description">{product.description}</div>
        </div>
    )
}

export default ProductPage;