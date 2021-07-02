import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Calendar from './calendar/Calendar'
import 'semantic-ui-css/semantic.min.css'
import moment from 'moment'
import { useImmer } from 'use-immer'

function Main() {
   const [eventList, setEventList] = useState([])

   const handleSetColors = colors => {
      setSettings(draft => {
         draft.eventColors = colors
      })
   }

   const handleSetTimeRange = timeRange => {
      setSettings(draft => {
         draft.timeRange = timeRange
      })
   }

   const handleSetEvents = events => {
      setEventList(events)
   }

   const initialSettings = {
      //settings window alowed options
      settingsModif: {
         //allow general setting modif
         allowed: true,
         //allow color change in settings(true by default)
         allowColor: true,
         //allow change of timeRange
         allowTimeRange: true
      },
      //settings link to the eventList
      table: {
         //number of months before given
         before: 1,
         //number of months after given
         after: 11,
         //number total of months
         total: 12
      },
      //title otpions
      title: {
         //is the title an image and no a text
         isImage: false,
         //text of the title or link to the image
         value: 'Calendrier',
         //does it have logo
         hasLogo: false,
         //logo path
         logoPath: 'https://react.semantic-ui.com/images/wireframe/image.png'
      },
      //creation and modification options
      //allow creation of event
      allowCreation: true,
      //allow modification of events
      allowModification: true,
      //array of default color for events(optional)
      //eventColors: ['#000', '#f00', '#0f0', '#00f'],
      //minimal time range (multiple of 5)
      timeRange: 15,
      //list of tags
      tagsList: {
         dq43q7d: {
            name: 'travail',
            color: 'red'
         },
         khfyYNCKSB: {
            name: 'famille',
            color: 'blue'
         },
         jnRvoumgadinn: {
            name: 'amis',
            color: 'yellow'
         }
      }
   }

   const [settings, setSettings] = useImmer(initialSettings)

   useEffect(() => {
      setEventList(state =>
         state.concat(
            {
               title: 'Too early',
               color: '#0ed3ed',
               start: moment({ hour: 5, minute: 15 }).add(-2, 'M'),
               end: moment({ hour: 9, minute: 15 }).add(-2, 'M'),
               icon: 'address book',
               key: '5641231',
               place: 'Hotel de police',
               tags: [],
               description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien justo, mattis quis ante vel, aliquam finibus felis. Nullam mauris nunc, auctor suscipit gravida nec, bibendum sed nisi. Etiam porttitor venenatis consectetur. Ut varius ullamcorper est, et euismod dui porttitor. '
            },
            {
               title: 'Second Test Event',
               color: '#0ed3ed',
               start: moment({ hour: 5, minute: 15 }),
               end: moment({ hour: 5, minute: 15 }).add(6, 'h'),
               icon: 'address book',
               key: '45435',
               tags: ['dq43q7d'],
               place: 'Hotel de police',
               description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien justo, mattis quis ante vel, aliquam finibus felis. Nullam mauris nunc, auctor suscipit gravida nec, bibendum sed nisi. Etiam porttitor venenatis consectetur. Ut varius ullamcorper est, et euismod dui porttitor. '
            },
            {
               title: 'Test Event',
               color: '#00c21d',
               start: moment({ hour: 10, minute: 15 }),
               end: moment({ hour: 10, minute: 15 }).add(2, 'h'),
               icon: 'birthday cake',
               key: '45464',
               tags: ['dq43q7d'],
               place: 'Hotel de police',
               description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien justo, mattis quis ante vel, aliquam finibus felis. Nullam mauris nunc, auctor suscipit gravida nec, bibendum sed nisi. Etiam porttitor venenatis consectetur. Ut varius ullamcorper est, et euismod dui porttitor. '
            },
            {
               title: 'Third Test Event',
               color: '#0ed3ed',
               start: moment({ hour: 5, minute: 30 }),
               end: moment({ hour: 5, minute: 15 }).add(6, 'h'),
               icon: 'address book',
               key: '4521',
               tags: ['jnRvoumgadinn'],
               place: 'Hotel de police',
               description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien justo, mattis quis ante vel, aliquam finibus felis. Nullam mauris nunc, auctor suscipit gravida nec, bibendum sed nisi. Etiam porttitor venenatis consectetur. Ut varius ullamcorper est, et euismod dui porttitor. '
            },
            {
               title: 'Fourth Test Event',
               color: '#ffd438',
               start: moment({ hour: 10, minute: 30 }),
               end: moment({ hour: 10, minute: 15 }).add(2, 'h'),
               icon: 'birthday cake',
               key: '64654',
               tags: ['dq43q7d', 'jnRvoumgadinn'],
               place: 'Hotel de police',
               description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien justo, mattis quis ante vel, aliquam finibus felis. Nullam mauris nunc, auctor suscipit gravida nec, bibendum sed nisi. Etiam porttitor venenatis consectetur. Ut varius ullamcorper est, et euismod dui porttitor. '
            },
            {
               title: 'Sixth Test Event',
               color: '#00c21d',
               start: moment({ hour: 12, minute: 10 }),
               end: moment({ hour: 12, minute: 15 }).add(2, 'h'),
               icon: 'birthday cake',
               key: '646863',
               tags: [],
               place: 'Hotel de police',
               description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien justo, mattis quis ante vel, aliquam finibus felis. Nullam mauris nunc, auctor suscipit gravida nec, bibendum sed nisi. Etiam porttitor venenatis consectetur. Ut varius ullamcorper est, et euismod dui porttitor. '
            },
            {
               title: 'Fifth Test Event',
               color: '#0ed3ed',
               start: moment({ hour: 18, minute: 45 }).add(-4, 'd'),
               end: moment({ hour: 18, minute: 0 }).add(-4, 'd').add(5, 'h'),
               icon: 'address book',
               key: '45641',
               tags: ['jnRvoumgadinn'],
               place: 'Hotel de police',
               description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien justo, mattis quis ante vel, aliquam finibus felis. Nullam mauris nunc, auctor suscipit gravida nec, bibendum sed nisi. Etiam porttitor venenatis consectetur. Ut varius ullamcorper est, et euismod dui porttitor. '
            },
            {
               title: 'multiple day event',
               color: '#0ed3ed',
               start: moment({ hour: 18, minute: 45 }).add(2, 'd'),
               end: moment({ hour: 18, minute: 0 }).add(4, 'd').add(5, 'h'),
               icon: 'coffee',
               key: '45238',
               tags: [],
               place: 'Hotel de police',
               description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien justo, mattis quis ante vel, aliquam finibus felis. Nullam mauris nunc, auctor suscipit gravida nec, bibendum sed nisi. Etiam porttitor venenatis consectetur. Ut varius ullamcorper est, et euismod dui porttitor. '
            },
            {
               title: 'second multiple day event',
               color: '#ffd438',
               start: moment({ hour: 3, minute: 45 }).add(3, 'd'),
               end: moment({ hour: 5, minute: 0 }).add(5, 'd').add(5, 'h'),
               icon: 'coffee',
               key: '5623663',
               tags: ['khfyYNCKSB'],
               place: 'Hotel de police',
               description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien justo, mattis quis ante vel, aliquam finibus felis. Nullam mauris nunc, auctor suscipit gravida nec, bibendum sed nisi. Etiam porttitor venenatis consectetur. Ut varius ullamcorper est, et euismod dui porttitor. '
            }
         )
      )
   }, [])

   const handlers = {
      handleEvent: handleSetEvents,
      handleColors: handleSetColors,
      handleTimeRange: handleSetTimeRange
   }

   return <Calendar eventList={eventList} settings={settings} handlers={handlers} />
}

ReactDOM.render(<Main />, document.querySelector('#root'))
