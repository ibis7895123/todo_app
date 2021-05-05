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
