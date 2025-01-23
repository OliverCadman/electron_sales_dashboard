import React, { useState, useEffect } from 'react'
import { daysOfWeek } from './utils/daysOfWeek'
import { monthsOfYear } from './utils/monthsOfYear'

interface Date {
  dayString: string
  dayOfMonth: number
  month: string
  year: number
}

interface Time {
  hour: string
  minute: string
  second: string
}

type DateTime = {
  date: Date
  time: Time
}

const Timer: React.FC = () => {
  const [dateTime, setDateTime] = useState<DateTime>()

  const getCurrentDateTime = () => {
    const padTimeUnit = (timeUnit: string) => {
      return timeUnit.padStart(2, '0')
    }
    const date = new Date()
    const dayString = daysOfWeek[date.getDay()]
    const dayOfMonth = date.getDate()
    const month = monthsOfYear[date.getMonth()]
    const year = date.getFullYear()

    const hour = padTimeUnit(date.getHours().toString())
    const minute = padTimeUnit(date.getMinutes().toString())
    const second = padTimeUnit(date.getSeconds().toString())

    return {
      date: {
        dayString,
        dayOfMonth,
        month,
        year
      },
      time: {
        hour,
        minute,
        second
      }
    }
  }
  useEffect(() => {
    const ONE_SECOND = 1000
    const interval = setInterval(() => {
      const dateTime = getCurrentDateTime()

      setDateTime((prevDateTime) => {
        return {
          ...prevDateTime,
          date: dateTime.date,
          time: dateTime.time
        }
      })
    }, ONE_SECOND)

    return () => clearInterval(interval)
  }, [])
  return (
    <div className="timer__container flex font-primary bold dark">
      <div className="timer__elem date">
        <p>
          <span>{dateTime?.date.dayString} </span>
          <span>{dateTime?.date.dayOfMonth} </span>
          <span>{dateTime?.date.month}, </span>
          <span>{dateTime?.date.year}</span>
        </p>
      </div>
      <div className="timer__elem time">
        <span>{dateTime?.time.hour}:</span>
        <span>{dateTime?.time.minute}:</span>
        <span>{dateTime?.time.second}</span>
      </div>
    </div>
  )
}

export default Timer
