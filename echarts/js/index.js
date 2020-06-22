// 展示时间
let t = setTimeout(time, 1000)
function time () {
  clearTimeout(t)
  let d = new Date()
  let y = d.getFullYear()
  let m = d.getMonth() + 1
  let day = d.getDate()
  let h = d.getHours()
  let min = d.getMinutes()
  let s = d.getSeconds()
  document.getElementById("showTime").innerHTML = "当前时间:" + y + "年" + m + "月" + day + "日" + h + "时" + + min +"分" + s + "秒"
  t = setTimeout(time, 1000)
}
