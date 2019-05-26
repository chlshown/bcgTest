/**
 * Created by chenlei on 2019/05/25.
 */
import chalk from 'chalk'

const printBlue = msg => {
  console.log(chalk.blue(`前端日志：${msg}`))
}

const printYellow = msg => {
  console.log(chalk.yellow(`前端日志：${msg}`))
}

const printRed = (msg) => {
  console.error(chalk.red(`前端日志：${msg}`))
}

const logger = {
  info: function (msg) {
    printBlue(msg)
  },
  warning: function (msg) {
    printYellow(msg)
  },
  error: function (msg) {
    printRed(msg)
  }
}

export default logger
