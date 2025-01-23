export const isStartOfNewWeek = () => {
  const date = new Date()
  console.log(date.getDay().toString().padStart(2, '0'))
  console.log(date.getMonth() + 1)
  console.log(date.getFullYear())

  console.log('29'.padStart(2, '0'))
}

export class DateUtil {
  date: Date
  constructor() {
    this.date = new Date()
  }

  private pad2(dateItem: string, max: number, char: string) {
    return dateItem.padStart(max, char)
  }

  createPreviousMondaysDate() {
    const dayOfWeek = this.date.getDay()
    const daysToPreviousMonday = (dayOfWeek - 1 + 7) % 7

    const prevMondayDate = new Date(this.date)
    prevMondayDate.setDate(this.date.getDate() - daysToPreviousMonday)

    return this.parsePresentDate(prevMondayDate)
  }

  parsePresentDate(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${year}-${this.pad2(month.toString(), 2, '0')}-${this.pad2(day.toString(), 2, '0')}`
  }

  isStartOfNewWorkingWeek() {
    const monday = 1 // Days are zero-index based.
    return this.date.getDay() === monday
  }
}
