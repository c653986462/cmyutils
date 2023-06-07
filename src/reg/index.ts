export const reg = {
  // 整数或两位以内小数
  float: /^[0-9]+.{0,1}[0-9]{0,2}$/,
  // 数字
  number: /^[0-9]*$/,
  // email
  email: /^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$/,
  // 电话
  phone: /^d{3}-d{8}|d{4}-d{7}$/,
}

/**
 * 身份证号校验
 * @param {string} id - 要校验的身份证号
 */
export function varifyIdCard(id?: string) {
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 ',
  }

  let pass = true

  const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

  // 验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
  if (!id) return false
  if (!reg.test(id)) {
    pass = false
  } else {
    // @ts-ignore
    if (!city[id.substr(0, 2)]) {
      pass = false
    } else if (id.length === 18) {
      // 18位身份证需要验证最后一位校验位
      const code = id
        .toUpperCase()
        .replace(/[ ]/g, '')
        .replace(/[　]/g, '')
        .replace(/<\/?.+?>/g, '')
        .replace(/[\r\n]/g, '')
        .split('')
      // 加权因子
      const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      // 校验位
      const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
      let sum = 0
      let ai = 0
      let wi = 0
      for (let i = 0; i < 17; i += 1) {
        ai = parseInt(code[i], 10)
        wi = factor[i]
        sum += ai * wi
      }
      if (parity[sum % 11].toString() !== code[17].toString()) {
        pass = false
      }
    }
  }

  return pass
}

/**
 * 信用代码校验
 * @param {string} id - 要校验的信用代码
 */

export function verifySocialCard(value?: string) {
  const patrn = /^[0-9A-Z]+$/
  //18位校验及大写校验
  if (!value || value.length !== 18 || !patrn.test(value)) {
    return false
  } else {
    let Ancode //统一社会信用代码的每一个值
    let Ancodevalue //统一社会信用代码每一个值的权重
    let total = 0
    const weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28] //加权因子
    const str = '0123456789ABCDEFGHJKLMNPQRTUWXY'
    //不用I、O、S、V、Z
    for (let i = 0; i < value.length - 1; i++) {
      Ancode = value.substring(i, i + 1)
      Ancodevalue = str.indexOf(Ancode)
      total = total + Ancodevalue * weightedfactors[i]
      //权重与加权因子相乘之和
    }
    let logiccheckcode = 31 - (total % 31)
    if (logiccheckcode === 31) {
      logiccheckcode = 0
    }
    const Str = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y'
    const Array_Str = Str.split(',')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    logiccheckcode = Array_Str[logiccheckcode]
    const checkcode = value.substring(17, 18)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line eqeqeq
    return logiccheckcode == checkcode
  }
}
