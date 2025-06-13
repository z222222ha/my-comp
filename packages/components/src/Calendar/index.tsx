import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
// import './index.scss'
import Styles from './index.module.scss'
import cs from 'classnames'

import MonthCalendar from './MonthCalendar'
import Header from './Header'
import LocaleContext from './LocaleContext'

export interface CalendarProps {
  // 当前日期
  value: Dayjs
  // 样式
  className?: string | string[]
  // 样式
  style?: React.CSSProperties
  // 选择日期回调函数
  onChange?: (value: Dayjs) => void
  // 自定义整个日期单元格，包括日期数字
  renderCell?: (value: Dayjs) => React.ReactNode
  // 自定义除日期数字外的单元格
  renderCellContent?: (value: Dayjs) => React.ReactNode
  // 多语言
  locale?: string
}

export default function Calendar(props: CalendarProps) {
  const { style, className, locale, value, onChange } = props

  const classnames = cs(className, Styles['calendar'])

  const [curValue, setCurValue] = useState(value)

  const [curMonth, setCurMonth] = useState(value)

  function changeDate(date: Dayjs) {
    setCurValue(date)
    setCurMonth(date)
    onChange?.(date)
  }

  function selectHandler(date: Dayjs) {
    console.log(date.format('YYYY-MM-DD'))
    changeDate(date)
  }

  function prevMonthHandler() {
    console.log('<')
    setCurMonth(curMonth.subtract(1, 'month'))
  }

  function nextMonthHandler() {
    console.log('>')
    setCurMonth(curMonth.add(1, 'month'))
  }

  function todayHandler() {
    const now = dayjs(Date.now())
    console.log('today:', now)
    changeDate(now)
  }

  return (
    <LocaleContext.Provider value={{ locale: locale || navigator.language }}>
      <div
        className={classnames}
        style={style}
      >
        <Header
          curMonth={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHandler={todayHandler}
        />
        <MonthCalendar
          {...props}
          selectHandler={selectHandler}
          value={curValue}
          curMonth={curMonth}
        />
      </div>
    </LocaleContext.Provider>
  )
}
