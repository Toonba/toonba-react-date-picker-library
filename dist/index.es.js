import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const config = {
  minDate: new Date('01.01.2020'),
  maxDate: new Date('12.31.2025'),
  lightTheme: {
    borderRadius: '7px',
    // handle border-radius for focused input, calendar Wrapper, select input, current day
    calendarWidth: '500px',
    // handle width of calandarWrapper
    backgroundColor: 'white',
    // handle background color for callandar Wrapper, select and input
    primaryColor: 'rgba(145, 175, 37, 0.3)',
    primaryColorHover: 'rgba(145, 175, 37, 0.6)',
    secondaryColor: 'rgba(192, 192, 192, 0.3)',
    secondaryColorHover: 'rgba(192, 192, 192, 0.7)',
    textColor: 'black',
    inputBackground: 'white',
    inputWidth: '200px'
  },
  darkTheme: {
    borderRadius: '7px',
    calendarWidth: '500px',
    backgroundColor: ' #121212',
    primaryColor: 'rgba(187, 134, 252, 0.5)',
    primaryColorHover: 'rgba(187, 134, 252, 0.9)',
    secondaryColor: 'rgba(192, 192, 192, 0.6)',
    secondaryColorHover: 'rgba(255, 255, 255, 0.9)',
    textColor: 'white',
    inputBackground: 'rgba(192, 192, 192, 0.6)',
    inputWidth: '200px'
  }
};

// Animation
const slideInRight = keyframes`
  0% { transform: translateX(50%) }
  100% { transform: translateX(0) }
`;
const slideInLeft = keyframes`
  0% { transform: translateX(-50%) }
  100% { transform: translateX(0) }
`;
//Calendar styles
const CalendarWrapper = styled.div`
  border: 1px solid ${props => props.customStyle.primaryColor};
  border-radius: ${props => props.customStyle.borderRadius};
  width: ${props => props.customStyle.calendarWidth};
  margin: 10px auto;
  overflow: hidden;
  background-color: ${props => props.customStyle.backgroundColor};
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 350px;
  z-index: 10;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;

  p {
    width: 90%;
    flex: 1 0 0;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.customStyle.textColor};

    select {
      margin: 0 10px;
      background-color: ${props => props.customStyle.backgroundColor};
      border-radius: ${props => props.customStyle.borderRadius};
      padding: 2px 5px;
      border: 1px solid ${props => props.customStyle.primaryColor};
      outline: ${props => props.customStyle.primaryColor};
      font-size: 1.1em;
      font-weight: bold;
      color: ${props => props.customStyle.textColor};
    }
  }

  i {
    cursor: pointer;
    font-size: 1.3rem;
    color: ${props => props.customStyle.primaryColor};
  }

  i:hover {
    color: ${props => props.customStyle.primaryColorHover};
  }

  .fa-calendar-day {
    font-size: 1.1em;
    margin: 0;
    width: 50%;
    font-weight: bold;
    color: ${props => props.customStyle.textColor};
    opacity: 0.7;
  }
  .fa-calendar-day:hover {
    color: ${props => props.customStyle.primaryColorHover};
    opacity: 1;
  }

  .disabled {
    color: lightgrey;
    opacity: 0.3;
  }
`;
const Body = styled.div`
  margin: 5px auto;
  width: 87%;
  color: ${props => props.customStyle.textColor};
`;
const SevenColGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: ${props => props.customStyle.textColor};

  ${({
  heading
}) => heading && css`
      font-weight: bold;
      border-radius: 7px;
      background-color: ${props => props.customStyle.primaryColor};
      p {
        margin: 0em;
        padding: 0.7em;
      }
    `};

  .sunday {
    color: red;
  }

  .day {
    cursor: pointer;
    opacity: 0.7;
    margin: 0em;
    padding: 1em;
    font-weight: bold;
  }

  .today,
  .selected,
  .day:hover {
    font-weight: bold;
    opacity: 1;
    margin: 0.7em;
    padding: 0.3em;
    border-radius: 7px;
  }

  .not-a-day:hover {
    opacity: 0;
    cursor: initial;
  }

  .today {
    background-color: ${props => props.customStyle.secondaryColor};
  }

  .selected,
  .day:hover {
    background-color: ${props => props.customStyle.primaryColor};
  }

  ${({
  isAnimating
}) => isAnimating && css`
      animation: ${({
  direction
}) => direction === 'right' ? slideInRight : slideInLeft} 0.3s ease-in-out;
    `}
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 30px;
  margin: 10px 0 20px 0;

  button {
    border: none;
    padding: 1em 2em;
    font-size: 1em;
    font-weight: bold;
    border-radius: ${props => props.customStyle.borderRadius};
    cursor: pointer;
  }

  .confirm {
    background-color: ${props => props.customStyle.primaryColor};
  }

  .confirm:hover {
    background-color: ${props => props.customStyle.primaryColorHover};
  }

  .cancel {
    background-color: ${props => props.customStyle.secondaryColor};
  }
  .cancel:hover {
    background-color: ${props => props.customStyle.secondaryColorHover};
  }
`;

/**
 *
 * @param {Date} maxDate maximum date it will be possible to reach with datePicker, you can change it in config.js
 * @param {Date} minDate minimum date it will be possible to reach with datePicker, you can change it in config.js
 * @param {Object} style regroup few parameter that can be easily changed to adjust component, you can change it in config.js
 * @param {function} onClose function allowing to close calendar and get selected value in parent component
 * @returns {Component} Calendar used in datepicker
 */

function Calendar({
  maxDate,
  minDate,
  onSelection,
  customStyle,
  onClose,
  onCancel,
  isSelected
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('');
  const [selectedDate, setSelectedDate] = useState(isSelected);
  const yearRange = [];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  //function handling how the calandar should look to get the 1 day of month correpsonding to the actual first day
  const getNumberOfDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const range = (start, end) => {
    const length = Math.abs((end - start) / 1);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInWeek = dayNames.length;
    const startOffset = (firstDayOfMonth - 1 + daysInWeek) % daysInWeek;
    const offsetArray = Array.from({
      length: startOffset
    }).fill('');
    const numberArray = Array.from({
      length
    }).map((_, index) => start + index);
    return [...offsetArray, ...numberArray];
  };

  // function handling animation of calendar when month or year is changing
  const handleSlide = direction => {
    if (!isAnimating) {
      setIsAnimating(true);
      setDirection(direction);
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  };
  const handleChangeYear = event => {
    if (parseInt(currentYear) > parseInt(event.target.value)) {
      handleSlide('left');
    } else if (parseInt(currentYear) < parseInt(event.target.value)) {
      handleSlide('right');
    }
    setCurrentYear(parseInt(event.target.value));
  };
  const handleChangeMonth = event => {
    if (parseInt(currentMonth) > parseInt(event.target.value)) {
      handleSlide('left');
    } else if (parseInt(currentMonth) < parseInt(event.target.value)) {
      handleSlide('right');
    }
    setCurrentMonth(parseInt(event.target.value));
  };
  for (let i = minDate.getFullYear(); i <= maxDate.getFullYear(); i++) {
    yearRange.push(i);
  }
  const beforeMinDate = minDate.getTime() > new Date(currentYear, currentMonth, minDate.getDate() - 1).getTime();
  const afterMaxDate = maxDate.getTime() < new Date(currentYear, currentMonth, maxDate.getDate() + 1).getTime();

  //Function handling an action made by user
  const nextMonth = () => {
    handleSlide('right');
    if (parseInt(currentMonth) < 11) {
      setCurrentMonth(prev => prev + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    }
  };
  const previousMonth = () => {
    handleSlide('left');
    if (currentMonth > 0) {
      setCurrentMonth(prev => prev - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    }
  };
  const backToday = () => {
    if (new Date(currentYear, currentMonth, 1).getFullYear() > new Date().getFullYear()) {
      handleSlide('left');
    } else if (new Date(currentYear, currentMonth, 1).getFullYear() === new Date().getFullYear()) {
      if (new Date(currentYear, currentMonth, 1).getMonth() > new Date().getMonth()) {
        handleSlide('left');
      } else if (new Date(currentYear, currentMonth, 1).getMonth() === new Date().getMonth()) ; else {
        handleSlide('right');
      }
    } else {
      handleSlide('right');
    }
    setCurrentMonth(new Date().getMonth());
    setCurrentYear(new Date().getFullYear());
  };
  const handleSelection = event => {
    if (event.target.classList.contains('day') && !event.target.classList.contains('not-a-day')) {
      const selectedDay = parseInt(event.target.getAttribute('data-day'));
      const dateSelected = new Date(currentYear, currentMonth, selectedDay);
      setSelectedDate(dateSelected);
      onSelection(dateSelected);
    }
  };
  useEffect(() => {
    if (selectedDate instanceof Date) {
      setCurrentYear(selectedDate.getFullYear());
      setCurrentMonth(selectedDate.getMonth());
    }
  }, [selectedDate]);
  useEffect(() => {
    if (isSelected === '') {
      setSelectedDate('');
    }
  }, [isSelected]);
  return /*#__PURE__*/React.createElement(CalendarWrapper, {
    customStyle: customStyle
  }, /*#__PURE__*/React.createElement(Header, {
    customStyle: customStyle
  }, beforeMinDate ? /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-chevron-left disabled"
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-chevron-left",
    onClick: previousMonth
  }), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-calendar-day",
    onClick: backToday
  }), /*#__PURE__*/React.createElement("select", {
    name: "month",
    value: currentMonth,
    onChange: handleChangeMonth
  }, monthNames.map((monthName, index) => /*#__PURE__*/React.createElement("option", {
    value: index,
    key: `${index}-${monthName}`
  }, monthName))), /*#__PURE__*/React.createElement("select", {
    name: "year",
    value: currentYear,
    onChange: handleChangeYear
  }, yearRange.map((year, index) => /*#__PURE__*/React.createElement("option", {
    value: year,
    key: `${index}-${year}`
  }, year)))), afterMaxDate ? /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-chevron-right disabled"
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-chevron-right",
    onClick: nextMonth
  })), /*#__PURE__*/React.createElement(Body, {
    customStyle: customStyle
  }, /*#__PURE__*/React.createElement(SevenColGrid, {
    heading: true,
    customStyle: customStyle
  }, dayNames.map((day, index) => /*#__PURE__*/React.createElement("p", {
    key: `${index}-${day}`,
    className: day === 'Sun' ? 'sunday' : ' '
  }, day))), /*#__PURE__*/React.createElement(SevenColGrid, {
    onClick: handleSelection,
    customStyle: customStyle,
    isAnimating: isAnimating,
    direction: direction
  }, range(1, getNumberOfDaysInMonth(currentYear, currentMonth) + 1).map((day, index) => /*#__PURE__*/React.createElement("p", {
    key: `${day}-${index}`,
    className: `day ${currentYear === new Date().getFullYear() ? currentMonth === new Date().getMonth() ? day === new Date().getDate() ? 'today' : ' ' : ' ' : ' '} ${new Date(currentYear, currentMonth, day).getDay() === 0 ? 'sunday' : ' '} ${selectedDate === '' ? '' : currentYear === selectedDate.getFullYear() ? currentMonth === selectedDate.getMonth() ? day === selectedDate.getDate() ? 'selected' : ' ' : ' ' : ' '} ${day === '' ? 'not-a-day' : ''}`,
    "data-day": day
  }, day)))), /*#__PURE__*/React.createElement(ButtonContainer, {
    customStyle: customStyle
  }, /*#__PURE__*/React.createElement("button", {
    className: "cancel",
    onClick: onCancel
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "confirm",
    onClick: onClose
  }, "Confirm")));
}

// DatePicker Style

const PickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DatePickerInput = styled.input`
  width: ${props => props.customStyle.inputWidth};
  padding: 5px;
  background-color: ${props => props.customStyle.inputBackground};
  text-align: center;
  position: relative;
  border: 1px solid black;
  border-radius: 5px;
  margin: 0px auto;
  color: ${props => props.customStyle.textColor};
  position: relative;

  :focus {
    outline: solid 1px ${props => props.customStyle.primaryColor};
    border: solid 1px ${props => props.customStyle.primaryColor};
  }

  .hide {
    display: none;
  }
`;

/**
 *
 * @param {Date} maxDate maximum date it will be possible to reach with datePicker, you can change it in config.js
 * @param {Date} minDate minimum date it will be possible to reach with datePicker, you can change it in config.js
 * @param {Object} style regroup few parameter that can be easily changed to adjust component, you can change it in config.js
 * @param {function} getData callback function to pass to the component to be able to access the selected. /!\argument of this function will be an object Date
 * @param {String} inputReset this parameter allow you to passe '' so that you can handle a reset once a form is validated.
 * @returns {Component} datePicker
 */

function DatePicker({
  maxDate,
  minDate,
  customStyle,
  getData,
  inputReset
}) {
  //Check to ensure user didn't made mistake with min and max Date
  if (minDate > maxDate) {
    alert('Problème minDate > maxDate');
  }
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const datePickerContainerRef = useRef(null);

  // function handling when calendar should be hidden
  const openClose = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = e => {
    if (datePickerContainerRef.current && !datePickerContainerRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  const formatDate = date => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${formattedMonth}/${formattedDay}/${year}`;
  };
  const handleDateSelection = selectedValue => {
    setInputValue(formatDate(selectedValue));
    setSelectedDate(selectedValue);
    getData(selectedValue);
  };
  const handleCloseCalendar = () => {
    if (inputValue === '') {
      alert('please select a date');
    } else {
      setIsOpen(false);
      console.log(selectedDate);
    }
  };
  const handleCancelButton = () => {
    setInputValue('');
    setSelectedDate('');
    setIsOpen(false);
  };
  const handleChange = event => {
    setInputValue(event.target.value);
  };
  const handleCheckDate = event => {
    if (event.target.value !== '') {
      if (isNaN(new Date(event.target.value))) {
        alert('Invalid Format Date please use MM/DD/YYYY');
        setInputValue('');
      } else if (new Date(event.target.value).getTime() < minDate.getTime() || new Date(event.target.value).getTime() > maxDate.getTime()) {
        alert('Date out of allowed Range');
        setInputValue('');
      } else {
        setSelectedDate(new Date(event.target.value));
        getData(new Date(event.target.value));
      }
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (inputReset === '') {
      setInputValue('');
      setSelectedDate('');
    }
  }, [inputReset]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PickerWrapper, {
    ref: datePickerContainerRef,
    className: "datePicker-container",
    customStyle: customStyle
  }, /*#__PURE__*/React.createElement(DatePickerInput, {
    type: "text",
    onClick: openClose,
    placeholder: "MM/DD/YYYY",
    onChange: handleChange,
    onBlur: handleCheckDate,
    value: inputValue,
    customStyle: customStyle
  }), isOpen === true ? /*#__PURE__*/React.createElement(Calendar, {
    maxDate: maxDate,
    minDate: minDate,
    onSelection: handleDateSelection,
    onClose: handleCloseCalendar,
    onCancel: handleCancelButton,
    customStyle: customStyle,
    isSelected: selectedDate
  }) : null));
}

export { DatePicker, config };
