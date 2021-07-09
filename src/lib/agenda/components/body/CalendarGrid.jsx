import React, { useContext, useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { PaddingLessGridColumn } from '../../agenda.style'
import moment from 'moment'
import { DAY, MONTH, WEEK } from '../../constants'

//components
import DayCase from './DayCase'
import HourCase from './HourCase'
import DateDisplay from './DateDisplay'

//Context
import StateContext from '../../StateContext'

/*
   Component creating the grid of day depending on the mode
   mode Day : 1 column with the displayed date
   mode Week : 7 columns with all days of the week of the displayed date
   mode Month : 7 columns and some rows with all days of the month of the displayed date
*/

const CalendarGrid = () => {
   const { mode, displayedDate, languageFile } = useContext(StateContext)
   const { Days_names } = languageFile

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

   useEffect(() => {
      //make a list with all days displayed of a month
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
      //make a list with all the days of the week or only one day if it's in mode day
      if (mode !== DAY) {
         const newList = Days_names.concat(Days_names[0])
         newList.shift()
         setListDays(newList)
      } else {
         setListDays([Days_names[displayedDate.day()]])
      }
      //make a list with all days displayed off a week
      const resDisplayed = []
      for (let dayNbr = 0; dayNbr < 7; dayNbr++) {
         resDisplayed.push(getDate(dayNbr, displayedDate))
      }
      setDayDateList(resDisplayed)
   }, [displayedDate, mode])

   //Component which represent which type of case need to be rendered
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
   const BodyRow = props => {
      return <></>
   }
   return (
      <Grid centered style={{ marginLeft: '2px' }}>
         <DateDisplay listDays={listDays} />
         {mode !== MONTH ? (
            <Grid.Row columns={listDays.length}>
               {
                  //loop to create each column corresponding to the day displayed
                  Array(listDays.length)
                     .fill()
                     .map((_, key) => {
                        const dateList = mode === WEEK ? dayDateList : [displayedDate]
                        const date = mode === DAY ? dateList[0] : dateList[key]
                        return (
                           <PaddingLessGridColumn paddingright={1} key={key}>
                              {casetype(date)}
                           </PaddingLessGridColumn>
                        )
                     })
               }
            </Grid.Row>
         ) : (
            <>
               {Array(monthDateList.length / 7)
                  .fill()
                  .map((_, key) => (
                     <Grid.Row key={key} columns={listDays.length}>
                        {
                           //loop to create each column corresponding to the day displayed
                           Array(listDays.length)
                              .fill()
                              .map((_, keyB) => {
                                 const date = mode === DAY ? monthDateList[0] : monthDateList[key * 7 + keyB]
                                 return (
                                    <PaddingLessGridColumn paddingright={1} key={keyB}>
                                       {casetype(date)}
                                    </PaddingLessGridColumn>
                                 )
                              })
                        }
                     </Grid.Row>
                  ))}
            </>
         )}
      </Grid>
   )
}

export default CalendarGrid
