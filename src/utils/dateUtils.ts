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
  const month = date.getMonth()
  const day = date.getDate()
  const dayOfWeek = dayOfWeekList[date.getDay()]

  const formattedDate = `${year}年 ${month}月 ${day}日 (${dayOfWeek})`

  return formattedDate
}

export const getTextFieldValueDate = (date: Date | null) => {
  if (!date) return ''

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}

export const isToday = (date: Date | null) => {
  if (!date) return false

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  const today = new Date()

  if (
    year === today.getFullYear() &&
    month === today.getMonth() &&
    day === today.getDate()
  ) {
    return true
  }

  return false
}
