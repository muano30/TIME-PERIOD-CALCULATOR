import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";


function TimePeriodCalculator() {
  const [dates, setDates] = useState({
    firstDate: "",
    lastDate: "",   
  })
  const handleInput = (e) => {
    setDates({...dates, [e.target.name]: e.target.value })

  }

  const [dateInfo, setDateInfo] = useState([]);

var firstDate =dates.firstDate !== "" ? new Date(dates.firstDate) : new Date()
var lastDate =dates.lastDate !== "" ? new Date(dates.lastDate) : new Date()
  
const diffYearMonthDay = () => {

if (firstDate > lastDate) {
  alert ('First date must be before Last date');
  return ;
}

if (lastDate < firstDate) {
  lastDate.setDate(lastDate.getDate() + 1);
}

var diff = lastDate.getTime() - firstDate.getTime();

console.log("muano", diff)

var msec = diff;

var hh = Math.floor(msec / 1000 / 60 / 60) % 24;
msec -= hh * 1000 * 60 * 60;
var mm = Math.floor(msec / 1000 / 60 ) % 1440;
msec -= mm * 1000 * 60;
var ss = Math.floor(msec / 1000) % 86400;
msec -= ss * 1000;

var startYear = firstDate.getFullYear();
var startMonth = firstDate.getMonth();
var startDay = firstDate.getDate();


var endYear = lastDate.getFullYear();
var endMonth = lastDate.getMonth();
var endDay = lastDate.getDate();

// We calculate February based on end year as it might be a leep year which might influence the number of days.
var february = (endYear % 4 == 0 && endYear % 100 != 0) || endYear % 400 == 0 ? 29 : 28;
var daysOfMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var firstDateNotPassedInEndYear = (endMonth < startMonth) || endMonth == startMonth && endDay < startDay;
var years = endYear - startYear - (firstDateNotPassedInEndYear ? 1 : 0);

var months = (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12;

// (12 + ...) % 12 makes sure index is always between 0 and 11
var days = startDay <= endDay ? endDay - startDay : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay;


return {
  years: years,
  months: months,
  days: days,
  hh: hh,
  mm: mm,
  ss: ss
};
}

  const handleCalculate = (e) => {
    e.preventDefault();
    // if(dates.firstDate === ""|| dates.lastDate === ""){
      // return
    // }
    setDateInfo([diffYearMonthDay(dates)])
    setDates({
      firstDate: "",
      lastDate: "",    
    })
  }

  return (
    <div className="App">
      <h1>TIME/PERIOD CALCULATOR</h1>
      <form onSubmit={handleCalculate}>

        <div className='date1'>
          <label>First Date: </label>
          <input type="datetime-local" name="firstDate" value={dates.firstDate} onChange={handleInput}></input>
          {/* <input type="time" name="firsTime" value={dates.firstTime} onChange={handleInput}></input> */}

        </div>

        <div className='date2'>
          <label>Last Date: </label>
          <input type="datetime-local" name="lastDate" value={dates.lastDate} onChange={handleInput}></input>
          {/* <input type="time" name="lastTime" value={dates.lastTime} onChange={handleInput}></input> */}
        </div>
        <button type="submit">Calculate Duration</button>
      </form>
 
        {dateInfo.map((item, key)=>{
          return(
            <ul key={key}>
              <li>Years: {item.years}</li>
              <li>Months: {item.months}</li>
              <li>Days: {item.days}</li>
              <li>hh: {item.hh}</li>
              <li>mm: {item.mm}</li>
              <li>ss: {item.ss}</li>
            </ul>
          )
        })}
    </div>
  );
}

export default TimePeriodCalculator;
