/**
 * text文件base64格式下载
 * @param {string} fileName 下载文件名称
 * @param {string} content 下载内容
 * @param {string} type 下载格式
 * @version 1.0
 */
export const downLoadTextBase64 = function (fileName: string, content: string, type: string = 'data:text/plain;charset=utf-8,') {
  var element = document.createElement('a')
  element.setAttribute('href', type + encodeURIComponent(content))
  element.setAttribute('download', fileName)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
