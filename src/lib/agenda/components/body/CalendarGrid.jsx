import React, { useContext, useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { PaddingLessGridColumn } from '../../agenda.style'
import moment from 'moment'
import { DAY, DAYS_NAME, MONTH, WEEK } from '../../constants'

//components
import DayCase from './DayCase'
import HourCase from './HourCase'

//Context
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'
import DateDisplay from './DateDisplay'

/*
   Component creating the grid of day depending on the mode
   mode Day : 1 column with the displayed date
   mode Week : 7 columns with all days of the week of the displayed date
   mode Month : 7 columns and some rows with all days of the month of the displayed date
*/

const CalendarGrid = () => {
   const { mode, displayedDate } = useContext(StateContext)

   const [listDays, setListDays] = useState([0])
   const [monthDateList, setmonthDateList] = useState([])
   const [dayDateList, setDayDateList] = useState([])

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
         <DateDisplay listDays={listDays} />
         <Body />
      </Grid>
   )
}

export default CalendarGrid
