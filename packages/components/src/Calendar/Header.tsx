import React, { useContext } from "react";
import { Dayjs } from "dayjs";
import LocaleContext from "./LocaleContext";
import allLocales from "./locale";

interface HeaderProps {
  curMonth: Dayjs;
  prevMonthHandler: () => void;
  nextMonthHandler: () => void;
  todayHandler: () => void;
}

export default function Header(props: HeaderProps) {
  const { curMonth, prevMonthHandler, nextMonthHandler, todayHandler } = props;

  const localeContext = useContext(LocaleContext);
  const CalendarLocale = allLocales[localeContext.locale];

  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div className="calendar-header-icon" onClick={prevMonthHandler}>
          &lt;
        </div>
        <div className="calendar-header-value">{curMonth.format(CalendarLocale.formatMonth)}</div>
        <div className="calendar-header-icon" onClick={nextMonthHandler}>
          &gt;
        </div>
        <button className="calendar-header-btn" onClick={todayHandler}>
          {CalendarLocale.today}
        </button>
      </div>
    </div>
  );
}
