import type { codeType, codeReturn } from './type'
/**
 * 绘制验证码
 * @param {codeType} {content: 验证码正文,length: 验证码长度,width: 图片宽度,height: 图片高度,margin: 验证码文字,background: 验证码背景,color: 验证码文字,font: 验证码字体}
 * @return {codeReturn} {base64:图片base64,text:验证码正文}
 */
export function drawCode(options: codeType): codeReturn {
  const { content = '', length = 4, width = 200, height = 40, margin = 10, background = '#fff', color = '#000', font = '25px Microsoft YaHei' } = options
  // 校验码的组成库，我们去掉了大小写的字母Oo，因为有0了。
  let nums = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ],
    text = ''
  // 创建 canvas 画布,并设置宽高
  let canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  // 获取画布2D上下文
  let context = canvas.getContext('2d')!
  // 画布填充色
  context.fillStyle = background
  // 清空画布
  context.fillRect(0, 0, canvas.width, canvas.height)
  // 设置字体颜色
  context.fillStyle = color
  // 设置字体
  context.font = font
  let rand = [],
    x = [],
    y = []
  // 绘制校验码到画布上
  const l = content?.length || length
  const xL = width / l
  for (let i = 0; i < l; i++) {
    // rand.push(rand[i])
    rand.push(content ? content[i] : nums[Math.floor(Math.random() * nums.length)])
    x[i] = i * (xL - margin) + margin
    y[i] = Math.random() * 20 + height / 2
    context.fillText(rand[i], x[i], y[i])
  }

  // 画2条随机线,可以根据需要增减，画随机线主要是为了提高识别难度，防范机器识别
  for (let i = 0; i < 2; i++) {
    drawline(canvas, context)
  }

  // 画20个随机点，随机点的意义同随即线
  for (let i = 0; i < 20; i++) {
    drawDot(canvas, context)
  }

  // canvas 生成 image
  let base64 = convertCanvasToImage(canvas)

  // 校验码的值，将字符串转换为大写，用户填写的校验码不区分大小写
  text = rand.join('').toUpperCase()
  return { base64: base64, text: text }
}

// 画随机线函数
function drawline(canvas: any, context: any) {
  // 随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
  context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height))
  // 随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
  context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height))
  // 线条的款
  context.lineWidth = 0.5
  // 线条的描边属性：颜色透明度
  context.strokeStyle = 'rgba(50,50,50,0.3)'
  // 在画布上画线
  context.stroke()
}

// 画随机点函数
function drawDot(canvas: any, context: any) {
  let px = Math.floor(Math.random() * canvas.width),
    py = Math.floor(Math.random() * canvas.height)
  context.moveTo(px, py)
  context.lineTo(px + 1, py + 1)
  context.lineWidth = 0.1
  context.stroke()
}

// 绘制图片,返回 base64 图片
function convertCanvasToImage(canvas: any) {
  try {
    return canvas.toDataURL('image/png')
  } catch (e) {
    console.error('该浏览器版本不支持：canvas.toDataURL("image/png")')
  }
}
