import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const formatDate = (date: string) => {
  // 超过7天，显示日期
  if (dayjs(date).isBefore(dayjs().subtract(7, 'day'))) {
    return dayjs(date).format('YYYY-MM-DD')
  } else {
    // 1小时前、xx小时前、X天前
    return dayjs(date).locale('zh-cn').from(dayjs())
  }
}
