export const config = {
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
}
