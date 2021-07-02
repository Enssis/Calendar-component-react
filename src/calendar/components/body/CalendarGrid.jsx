import React, { useContext, useEffect, useState } from 'react'
import { Grid, Header, Icon, Menu } from 'semantic-ui-react'
import { PaddingLessGridColumn, SizedSegment } from '../calendar.style'
import moment from 'moment'
import { CREATE, DAY, DAYS_NAME, MONTH, MONTH_NAMES, OPEN_MODAL, SET_DISPLAYED_DATE, SET_MODE, WEEK } from '../../constants'

//components
import DayCase from './DayCase'
import HourCase from './HourCase'

//Context
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'

/*
   Component creating the grid of day depending on the mode
   mode Day : 1 column with the displayed date
   mode Week : 7 columns with all days of the week of the displayed date
   mode Month : 7 columns and some rows with all days of the month of the displayed date
*/
const CalendarGrid = props => {
   const { mode, displayedDate } = useContext(StateContext)
   const appDispatch = useContext(DispatchContext)

   const [listDays, setListDays] = useState([0])
   const [monthDateList, setmonthDateList] = useState([])
   const [dayDateList, setDayDateList] = useState([])

   //return the day choosed by it's number on the week
   const getDate = (dayNbr, comparedDate) => {
      if (mode === DAY) {
         return comparedDate
      } else {
         const date = moment(comparedDate)
         date.add(-(((6 + comparedDate.day()) % 7) - dayNbr), 'day')
         return date
      }
   }

   //make a list with all the days of the week or only one day if it's in mode day
   useEffect(() => {
      if (mode !== DAY) {
         const newList = DAYS_NAME.concat(DAYS_NAME[0])
         newList.shift()
         setListDays(newList)
      } else {
         setListDays([DAYS_NAME[displayedDate.day()]])
      }
   }, [mode, displayedDate])

   //make a list with all days displayed of a month
   useEffect(() => {
      const res = []
      const firstOfMonth = moment({ month: displayedDate.month(), year: displayedDate.year(), day: 1 })
      let week = 0
      do {
         for (let dayNbr = 0; dayNbr < 7; dayNbr++) {
            res.push(getDate(dayNbr + week * 7, firstOfMonth))
         }
         week++
      } while (res[res.length - 1].month() === firstOfMonth.month() && week < 6)
      setmonthDateList(res)
   }, [displayedDate, mode])

   //make a list with all days displayed off a week
   useEffect(() => {
      const res = []
      for (let dayNbr = 0; dayNbr < 7; dayNbr++) {
         res.push(getDate(dayNbr, displayedDate))
      }
      setDayDateList(res)
   }, [displayedDate, mode])

   //return the date with the good format depending on the mode
   const displayDate = (day, key) => {
      const date = getDate(key, displayedDate)
      return day + (mode !== MONTH ? ` ${date.date() + ' ' + MONTH_NAMES[date.month()]}` : '')
   }

   const handleDayClick = date => {
      if (mode === WEEK) {
         appDispatch({ type: SET_DISPLAYED_DATE, date })
         appDispatch({ type: SET_MODE, data: DAY })
      }
   }

   //component which create the good number of cols and rows of cases
   const Body = () => {
      if (mode !== MONTH) {
         return (
            <Grid.Row columns={listDays.length}>
               <BodyRow row={0} dateArr={mode === WEEK ? dayDateList : [displayedDate]} />
            </Grid.Row>
         )
      } else {
         return (
            <>
               {Array(monthDateList.length / 7)
                  .fill()
                  .map((_, key) => (
                     <Grid.Row key={key} columns={listDays.length}>
                        <BodyRow row={key} dateArr={monthDateList} />
                     </Grid.Row>
                  ))}
            </>
         )
      }
   }

   //Component which represent which type of case need to be rendered
   const BodyRow = props => {
      const casetype = date => {
         switch (mode) {
            case MONTH:
               return <DayCase date={date} />
            case DAY:
               return <HourCase week={false} date={date} />
            case WEEK:
               return <HourCase week={true} date={date} />
            default:
               console.log('Error on the mode')
               break
         }
      }

      return (
         <>
            {
               //loop to create each column corresponding to the day displayed
               Array(listDays.length)
                  .fill()
                  .map((_, key) => {
                     const date = mode === DAY ? props.dateArr[0] : props.dateArr[props.row * 7 + key]
                     return (
                        <PaddingLessGridColumn paddingright={1} key={key}>
                           {casetype(date)}
                        </PaddingLessGridColumn>
                     )
                  })
            }
         </>
      )
   }

   return (
      <Grid centered container>
         <Grid.Row columns={listDays.length}>
            {listDays.map((day, key) => (
               <PaddingLessGridColumn paddingright={1} key={key} textAlign={mode !== DAY ? 'center' : 'left'}>
                  <SizedSegment nohover={mode !== WEEK} backcolor="#fff" onClick={() => handleDayClick(getDate(key, displayedDate))}>
                     {mode === DAY ? (
                        <Menu icon secondary>
                           <Menu.Item header>{displayDate(day, key)}</Menu.Item>
                           <Menu.Item as="a" icon="add" position="right" onClick={() => appDispatch({ type: OPEN_MODAL, mode: CREATE, event: getDate(key, displayedDate) })} />
                        </Menu>
                     ) : (
                        <Header as="h5">{displayDate(day, key)}</Header>
                     )}
                  </SizedSegment>
               </PaddingLessGridColumn>
            ))}
         </Grid.Row>
         <Body />
      </Grid>
   )
}

export default CalendarGrid
