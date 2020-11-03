import request from '@/util/http'

//获取信息
export function getDataInfo(formData) {
    return request({
        url: "/oneNet/"+formData,
        method: 'get',
    })
}
//获取法律援助申请信息
export function geListInfo() {
    return request({
        url: "/oneNet?size=100&sort=createTime,desc",
        // headers:{'id':'1323178269427765248'},
        headers:{'id':10001},
        method: 'get',
    })
}
//提交信息
export function submitFirstApplication(parameter) {
    let param ={'resources':parameter,'draft':1}
    return request({
        url: "/oneNet/normaluser/first",
        headers:{'content-type':'application/json','id':10001},
        method: 'post',
        dataType: 'json',
        data:JSON.stringify(param),
    })
}
//上传图片
export function uploadFile(parameter) {
    debugger
    let formData = new FormData();
    formData.append('file',parameter.file.file);
    formData.append('useType',parameter.useType);
    formData.append('referenceId',1);//具体到某个人的id
    formData.append('name',"");
    return request({
        url: "/oneNet/files",
        headers:{'content-type':'multipart/form-data','id':10001},
        method: 'post',
        data:formData
    })
}
//图片回显
export function getFile(formData) {
    return request({
        url: "/oneNet/files?useType="+formData.useType+"&referenceId="+formData.referenceId,
        method: 'get',
        // params:formData
    })
}

// export function getInfos() {
//     return request({
//         url: "/export/std-evt-dpt-aj-jbxx-vo/getCommonPage",
//         method: 'get',
//         headers:{'Content-Type': "application/json;charset=utf-8"},
//         // params:formData
//     })
// }
//提交申请
export function submitApplicationFiles(parameter) {
    return request({
        url: "/oneNet/normaluser/submit",
        headers:{'content-type':'application/json','id':10001},
        method: 'post',
        data:parameter
    })
}

export function checklawer(parameter) {
    let formData = new FormData();
    // formData.append('data',parameter);
    return request({
        url: "/api/userapplication/checklawer",
        // headers:{'Content-Type':'multipart/form-data'},
        post: 'post',
        data:formData,
    })
}
