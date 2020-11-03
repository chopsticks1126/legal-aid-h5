var babel = require('babel-core')
var fs = require('fs')
var path = require('path')


function transform(from,to){
    fs.readFile(from, 'utf8',(err, data) => {
        if (err) throw err
        // console.log(data)
        var res = babel.transform(data, {
            presets: ['env', 'stage-2'],
            plugins: ['transform-runtime']
        })
        // console.log(Object.keys(res))
        // console.log(res.code)
        fs.writeFile(to, res.code,'utf8', (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        })

    })
}

// 遍历
function copy(src,dst){
    fs.readdir(src,function(err,paths){
        if(err){
            throw err;
        }
        paths.forEach(function(path){
            var _src=src+'/'+path;
            var _dst=dst+'/'+path;
            var readable;
            var writable;
            fs.stat(_src,function(err,st){
                if(err){
                    throw err;
                }
                
                if(st.isFile()){
                    readable=fs.createReadStream(_src);//创建读取流
                    writable=fs.createWriteStream(_dst);//创建写入流
                    readable.pipe(writable);
                }else if(st.isDirectory()){
                    exists(_src,_dst,copy);
                }
            });
        });
    });
}

// 检测有效性
function exists(src,dst,callback){
    //测试某个路径下文件是否存在
    fs.exists(dst,function(exists){
        if(exists){//不存在
            callback(src,dst);
        }else{//存在
            fs.mkdir(dst,function(){//创建目录
                callback(src,dst)
            })
        }
    })
}

function transfer(from,to){
	exists(from,to,copy)
}


export default function transferStatic(){
	transfer(path.resolve(__dirname,'../src/static'),path.resolve(__dirname,'../dist/resource'))
}