
/**
 * [formate 时间戳格式化]
 * @param       { date } timestamp [时间戳]
 * @param       { String } correctTo [精确度] 年月日时分秒
 * @return      { String }           [格式化后的时间]
 */
function formate(timestamp,correctTo='day',separator='.'){
	let res = ''
 	var _date = new Date(Number(timestamp))
	var _year = _date.getFullYear()
  	var _month = numberFix(_date.getMonth() + 1)
  	var _day = numberFix(_date.getDate())
  	var _hour = numberFix(_date.getHours())
  	var _mint = numberFix(_date.getMinutes())
  	var _second = numberFix(_date.getSeconds())

  	switch(correctTo){
  		case 'year':
  			res = _year
  			break
  		case 'month':
  			res = _year + separator + _month
  			break;
  		case 'day':
  			res = _year + separator + _month + separator + _day
  			break;
  		case 'hour':
  			res = _year + separator + _month + separator + _day + '  ' + _hour
  			break;
  		case 'mint':
  			res = _year + separator + _month + separator + _day + '  ' + _hour + ':' + _mint
  			break;
  		case 'second':
  		default:
  			res = _year + separator + _month + separator + _day + '  ' + _hour + ':' + _mint + ':' + _second
  			break;
  	}
  	return res
}

function numberFix(num){
	if(num < 10){
		num = '0'+num
	}
	return num
}

/**
 * [semantization 语义化时间]
 * @param       {Number} timestamp [时间戳] 毫秒
 * @param       {Number} threshold [阀值] 毫秒
 * @return      {String}       [语义化后的时间]
 */
function semantization(timestamp,threshold=1000*60*60*24,suffix='前'){
	let time = '';
	let now = new Date().getTime()
	let diff = now - timestamp;
	if(diff > threshold){
		return formate(timestamp)
	}
	let d = parseInt(diff / (1000*60*60*24));
	let h = parseInt(diff / (1000*60*60));
	let m = parseInt(diff / (1000*60));
	let s = parseInt(diff / (1000));
	if(d >= 1){
		return d + '天' + suffix
	}

	if(h >= 1){
		return h + '小时' + suffix
	}

	if(m >= 1){
		return m + '分钟' + suffix
	}

	if(s >= 1){
		return s + '秒' + suffix
	}

}

/**
 * [getMoment 获取当前时间段]
 * @return      {String} [上午 下午]
 */
function getMoment(){
	let cur =  new Date().getHours();
	if(cur < 12){
		return '上午';
	}else{
		return '下午'
	}
}

// 获取年龄
function getAge(birthday){
    let b = new Date(birthday)
    let d = new Date();

    let diff = {
    	y:d.getFullYear() - b.getFullYear(),
    	m:d.getMonth() - b.getMonth(),
    	d:d.getDate() - b.getDate()
    }

    if(diff.d<0){
    	diff.m --
    }
    if(diff.m<0){
    	diff.y --
    }

    return diff.y;//返回周岁年龄
}

export default {
	semantization,
	formate,
	getMoment,
	getAge
}
