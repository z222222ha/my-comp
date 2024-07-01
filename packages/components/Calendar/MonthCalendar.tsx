import { useContext } from "react";
import { Dayjs } from "dayjs";
import cs from "classnames";

import { CalendarProps } from ".";
// import CalendarLocale from "./locale/zh-CN";
// import CalendarLocale from "./locale/en-US";
import LocaleContext from "./LocaleContext";
import allLocales from "./locale";

interface MonthCalendarProps extends CalendarProps {
  selectHandler: (date: Dayjs) => void;
  curMonth: Dayjs;
}

interface DaysInfo {
  date: Dayjs;
  currentMonth: boolean;
}

function getAllDays(today: Dayjs) {
  const totalDays = today.daysInMonth();
  const startDate = today.startOf("month").format("YYYY-MM-DD");
  const endDate = today.endOf("month").format("YYYY-MM-DD");

  const startDay = today.startOf("month").day();
  const endDay = today.endOf("month").day();

  const daysInfo: Array<DaysInfo> = new Array(6 * 7);

  console.log("本月天数：", totalDays);
  console.log("本月第一天：", startDate, startDay);
  console.log("本月最后一天：", endDate, endDay);

  // 补全上个月
  const fillDay = startDay === 0 ? 6 : startDay - 1;
  for (let i = 0; i < fillDay; i++) {
    daysInfo[i] = {
      date: today.startOf("month").subtract(fillDay - i, "day"),
      // .format("DD"),
      currentMonth: false,
    };
  }

  // 本月 + 下个月
  for (let i = fillDay; i < daysInfo.length; i++) {
    const calcDate = today.startOf("month").add(i - fillDay, "day");
    daysInfo[i] = {
      date: calcDate,
      currentMonth: today.isSame(calcDate, "month"),
    };
  }

  console.log(daysInfo);
  return daysInfo;
}

export default function MonthCalendar(props: MonthCalendarProps) {
  // const weekList = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  const weekList = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  console.log(props.value);

  const { renderCell, renderCellContent, value, selectHandler, curMonth } = props;
  const localeContext = useContext(LocaleContext);

  console.log(localeContext);
  const CalendarLocale = allLocales[localeContext.locale];

  // 将 days 渲染成 6*7
  function renderDays(days: Array<DaysInfo>) {
    const rows = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const item = days[i * 7 + j];
        row[j] = (
          <div
            key={item.date.format("DD")}
            className={"calendar-month-body-day " + (item.currentMonth ? "calendar-month-body-day-current" : "")}
            onClick={() => {
              selectHandler(item.date);
            }}
          >
            {renderCell ? (
              renderCell(item.date)
            ) : (
              <div className="calendar-month-body-day-cell">
                {/* <div className="calendar-month-body-day-cell-value">{item.date.format("DD")}</div> */}
                <div className={cs("calendar-month-body-day-cell-value", value.isSame(item.date, "day") ? "calendar-month-body-day-cell-value-selected" : "")}>{item.date.format("DD")}</div>
                <div className="calendar-month-body-day-cell-content">{renderCellContent?.(item.date)}</div>
              </div>
            )}
          </div>
        );
      }
      rows.push(row);
    }
    console.log(rows);
    return rows.map((row, index) => {
      return (
        <div key={index} className="calendar-month-body-row">
          {row}
        </div>
      );
    });
  }

  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map((week) => {
          return (
            <div key={week} className="calendar-month-week-list-item">
              {/* {week} */}
              {CalendarLocale.week[week]}
            </div>
          );
        })}
      </div>
      <div>{renderDays(getAllDays(curMonth))}</div>
    </div>
  );
}
