import React, { useContext, useEffect, useState } from 'react'
import { Grid, Label, Menu, Header } from 'semantic-ui-react'
import { DAY, WEEK, OPEN_MODAL, CREATE, ZOOM_MINUS, ZOOM_PLUS, MONTH, MONTH_NAMES, SET_DISPLAYED_DATE, SET_MODE } from '../../constants'
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'
import { PaddingLessGridColumn, SizedSegment } from '../agenda.style'
import moment from 'moment'

const DateDisplay = props => {
   const { listDays } = props
   const { zoom, mode, displayedDate } = useContext(StateContext)
   const appDispatch = useContext(DispatchContext)

   const [showZoom, setShowZoom] = useState(false)

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

   //show the zoom when it change
   useEffect(() => {
      setShowZoom(true)
      const delay = setTimeout(() => setShowZoom(false), 1000)
      return () => clearTimeout(delay)
   }, [zoom])

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

   return (
      <Grid.Row columns={listDays.length}>
         {listDays.map((day, key) => (
            <PaddingLessGridColumn paddingright={1} key={key} textAlign={mode !== DAY ? 'center' : 'left'}>
               <SizedSegment nohover={mode !== WEEK ? 1 : 0} backcolor="#fff" onClick={() => handleDayClick(getDate(key, displayedDate))}>
                  {mode === DAY ? (
                     <Menu icon secondary>
                        <Menu.Item header>{displayDate(day, key)}</Menu.Item>
                        <Menu.Menu position="right">
                           {showZoom ? (
                              <Menu.Item header>
                                 <Label>{`${Math.floor(zoom * 100)}%`}</Label>
                              </Menu.Item>
                           ) : null}
                           <Menu.Item as="a" icon="add" onClick={() => appDispatch({ type: OPEN_MODAL, mode: CREATE, event: getDate(key, displayedDate) })} />
                           <Menu.Item as="a" icon="plus circle" onClick={() => appDispatch({ type: ZOOM_PLUS })} />
                           <Menu.Item as="a" icon="minus circle" onClick={() => appDispatch({ type: ZOOM_MINUS })} />
                        </Menu.Menu>
                     </Menu>
                  ) : (
                     <Header as="h5">{displayDate(day, key)}</Header>
                  )}
               </SizedSegment>
            </PaddingLessGridColumn>
         ))}
      </Grid.Row>
   )
}

export default DateDisplay
