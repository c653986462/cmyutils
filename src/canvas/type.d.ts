export interface codeType {
  // 验证码正文（没有正文则按照length生成对应位数随机正文）
  content?: string
  // 验证码长度（默认4位，无正文情况下按照长度生成随机正文）
  length?: number
  // 生成图片宽度（默认200）
  width?: number
  // 生成图片高度（默认40）
  height?: number
  // 生成验证码文字间距（默认10）
  margin?: number
  // 生成验证码背景颜色（默认#fff）
  background?: string
  // 生成验证码文字颜色（默认#000）
  color?: string
  // 生成验证码字体（默认25px Microsoft YaHei）
  font?: string
}

export interface codeReturn {
  // 图片base64
  base64: string
  // 验证码正文（不区分大小写）
  text: string
}
