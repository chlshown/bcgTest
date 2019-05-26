/**
 * Created by chenlei on 2017/10/12.
 */
import serverCode from '../config/serverCode'
import logger from './logger'

const handleActionResponse = (obj) => {
  // action 快捷成功
  if (!obj) {
    return {
      success: true,
      msg: '',
      data: {},
      code: serverCode.SUCCESS_CODE
    }
  } else {
    if (obj.success || obj.success === undefined) {
      return {
        success: true,
        msg: obj.msg || '',
        data: obj.data || {},
        code: obj.code || serverCode.SUCCESS_CODE
      }
    } else {
      let preMsg = ''
      if (obj.origin) {
        if (obj.origin === 'http') {
          preMsg = 'HTTP ERROR:'
        } else if (obj.origin === 'server') {
          preMsg = 'SERVER ERROR:'
        }
      } else {
        preMsg = 'ACTION ERROR:'
      }
      logger.error(obj.msg)
      return {
        success: false,
        msg: preMsg + obj.msg || '',
        data: obj.data || {},
        code: obj.code || serverCode.NORMAL_ERR
      }
    }
  }
}

const handleActionError = (code, msg) => {
  let preMsg = ''
  if (code === serverCode.WEB_JS_ERR) {
    preMsg = 'Js Error:'
    logger.error(msg)
    return {
      success: false,
      msg: '操作失败',
      data: {},
      code: code || serverCode.NORMAL_ERR
    }
  } else {
    preMsg = 'Action Error:'
    logger.error(msg)
    return {
      success: false,
      msg: preMsg + msg || '操作失败',
      data: {},
      code: code || serverCode.NORMAL_ERR
    }
  }
}

export {
  handleActionResponse,
  handleActionError
}
