import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

// export function formatUTC(utcString: string, format: string = 'YYYY/MM/DD HH:mm:ss') {
//   const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
//   return resultTime
// }

export function formatUTC(utcString: string, hoursToAdd?: number) {
  // 将 UTC 时间转换为本地时间
  const localTime = dayjs.utc(utcString).utcOffset(8)
  // 增加指定的小时数
  return localTime.format('YYYY/MM/DD HH:mm:ss')
}
