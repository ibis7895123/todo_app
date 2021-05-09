enum dayOfWeekList {
  '日',
  '月',
  '火',
  '水',
  '木',
  '金',
  '土',
}

export const getFormattedDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayOfWeek = dayOfWeekList[date.getDay()]

  const formattedDate = `${year}年 ${month}月 ${day}日 (${dayOfWeek})`

  return formattedDate
}

export const getTextFieldValueDate = (date: Date | null) => {
  if (!date) return ''

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // 必ず2桁になるように0埋め
  const padding_month = ('00' + month).slice(-2)
  const padding_day = ('00' + day).slice(-2)

  const formattedDate = `${year}-${padding_month}-${padding_day}`

  console.log(formattedDate)

  return formattedDate
}

export const isToday = (date: Date | null) => {
  if (!date) return false

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const today = new Date()

  if (
    year === today.getFullYear() &&
    month === today.getMonth() + 1 &&
    day === today.getDate()
  ) {
    return true
  }

  return false
}

export const isExpired = (date: Date | null) => {
  if (!date) return false

  // 今日の予定は期限切れにしない
  if (isToday(date)) return false

  // 期限切れの場合
  if (date.getTime() < new Date().getTime()) return true

  return false
}
