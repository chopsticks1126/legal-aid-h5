import request from '@/util/http'
import APIDATA from './data'

//上传图片
export function UploadImg(file) {
    let formData = new FormData();
    formData.append('img',file);
    return request({
        url: APIDATA.upload_img,
        headers:{'Content-Type':'multipart/form-data'},
        method: 'post',
        data:formData,
    })
}

//上传文件
export function UploadFile(file) {
    let formData = new FormData();
    formData.append('file',file);
    return request({
        url: APIDATA.upload_file,
        headers:{'Content-Type':'multipart/form-data'},
        method: 'post',
        data:formData
    })
}

