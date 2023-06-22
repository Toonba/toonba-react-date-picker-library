# Date Picker Component for React

A flexible and customizable date picker component for React applications.

<img width="400" alt="dark_mode_date_picker" src="https://github.com/Toonba/React_Date_Picker/assets/106684816/050fa93c-c271-461b-a8a4-fa0d823b38d9">
<img width="400" alt="light_mode_date_picker" src="https://github.com/Toonba/React_Date_Picker/assets/106684816/92ae6698-e0bc-4705-9c2c-df2fb9c33b16">

# Installation

Install the package using npm:

```
npm install react-date-picker-toonba
```

# Usage

Import the DatePicker component and built in configuration and use it in your React application:

```js
import React from 'react'
import { DatePicker, config } from 'react-date-picker-toonba'

function App() {
  return (
    <div>
      <h1>Select a Date</h1>
      <DatePicker minDate={config.minDate} maxDate={config.maxDate} customStyle={config.lightTheme} />
    </div>
  )
}
```

# Props

The DatePicker component accepts the following props:

<ul>
  <li>minDate: Minimum selectable date.</li>
  <li>maxDate: Maximum selectable date.</li>
  <li>customeStyle: object containing custome Style</li>
</ul>

In the config file you will find minDate en maxDate + 2 custome Style (dark and light mode), you can create your own custome style it must look like the one in config

```js
const config = {
  minDate: new Date('01.01.2020'),
  maxDate: new Date('12.31.2025'),
  lightTheme: {
    borderRadius: '7px', // handle border-radius for focused input, calendar Wrapper, select input, current day
    calendarWidth: '500px', // handle width of calandarWrapper
    backgroundColor: 'white', // handle background color for callandar Wrapper, select and input
    primaryColor: 'rgba(145, 175, 37, 0.3)',
    primaryColorHover: 'rgba(145, 175, 37, 0.6)',
    secondaryColor: 'rgba(192, 192, 192, 0.3)',
    secondaryColorHover: 'rgba(192, 192, 192, 0.7)',
    textColor: 'black',
    inputBackground: 'white'
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
}
```

Contributing
Contributions, bug reports, and feature requests are welcome! Feel free to open an issue or submit a pull request on the GitHub repository.

License
This project is licensed under the MIT License. See the LICENSE file for details.
