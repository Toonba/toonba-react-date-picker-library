import React, { useState, useRef, useEffect } from 'react'
import { Calendar } from '../Calendar/Calendar.jsx'
import styled from 'styled-components'

// DatePicker Style

const PickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DatePickerInput = styled.input`
  width: ${(props) => props.customStyle.inputWidth};
  padding: 5px;
  background-color: ${(props) => props.customStyle.inputBackground};
  text-align: center;
  position: relative;
  border: 1px solid black;
  border-radius: 5px;
  margin: 0px auto;
  color: ${(props) => props.customStyle.textColor};
  position: relative;

  :focus {
    outline: solid 1px ${(props) => props.customStyle.primaryColor};
    border: solid 1px ${(props) => props.customStyle.primaryColor};
  }

  .hide {
    display: none;
  }
`

/**
 *
 * @param {Date} maxDate maximum date it will be possible to reach with datePicker, you can change it in config.js
 * @param {Date} minDate minimum date it will be possible to reach with datePicker, you can change it in config.js
 * @param {Object} style regroup few parameter that can be easily changed to adjust component, you can change it in config.js
 * @param {function} getData callback function to pass to the component to be able to access the selected. /!\argument of this function will be an object Date
 * @param {String} inputReset this parameter allow you to passe '' so that you can handle a reset once a form is validated.
 * @returns {Component} datePicker
 */

export function DatePicker({ maxDate, minDate, customStyle, getData, inputReset }) {
  //Check to ensure user didn't made mistake with min and max Date
  if (minDate > maxDate) {
    alert('Problème minDate > maxDate')
  }

  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const datePickerContainerRef = useRef(null)

  // function handling when calendar should be hidden
  const openClose = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (e) => {
    if (datePickerContainerRef.current && !datePickerContainerRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  const formatDate = (date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()

    const formattedMonth = month < 10 ? `0${month}` : month
    const formattedDay = day < 10 ? `0${day}` : day

    return `${formattedMonth}/${formattedDay}/${year}`
  }

  const handleDateSelection = (selectedValue) => {
    setInputValue(formatDate(selectedValue))
    setSelectedDate(selectedValue)
    getData(selectedValue)
  }

  const handleCloseCalendar = () => {
    if (inputValue === '') {
      alert('please select a date')
    } else {
      setIsOpen(false)
    }
  }

  const handleCancelButton = () => {
    setInputValue('')
    setSelectedDate('')
    setIsOpen(false)
  }

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleCheckDate = (event) => {
    if (event.target.value !== '') {
      if (isNaN(new Date(event.target.value))) {
        alert('Invalid Format Date please use MM/DD/YYYY')
        setInputValue('')
      } else if (new Date(event.target.value).getTime() < minDate.getTime() || new Date(event.target.value).getTime() > maxDate.getTime()) {
        alert('Date out of allowed Range')
        setInputValue('')
      } else {
        setSelectedDate(new Date(event.target.value))
        getData(new Date(event.target.value))
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (inputReset === '') {
      setInputValue('')
      setSelectedDate('')
    }
  }, [inputReset])

  return (
    <>
      <PickerWrapper ref={datePickerContainerRef} className="datePicker-container" customStyle={customStyle}>
        <DatePickerInput type="text" onClick={openClose} placeholder="MM/DD/YYYY" onChange={handleChange} onBlur={handleCheckDate} value={inputValue} customStyle={customStyle}></DatePickerInput>
        {isOpen === true ? <Calendar maxDate={maxDate} minDate={minDate} onSelection={handleDateSelection} onClose={handleCloseCalendar} onCancel={handleCancelButton} customStyle={customStyle} isSelected={selectedDate} /> : null}
      </PickerWrapper>
    </>
  )
}
