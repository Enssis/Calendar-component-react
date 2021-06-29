import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Calendar from './calendar/Calendar'
import 'semantic-ui-css/semantic.min.css'
import moment from 'moment'

function Main() {
   const [eventList, setEventList] = useState([])
   const settings = {
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
      allowModification: true
   }

   const handleSetEvents = events => {
      setEventList(events)
      console.log(eventList)
   }

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
               description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien justo, mattis quis ante vel, aliquam finibus felis. Nullam mauris nunc, auctor suscipit gravida nec, bibendum sed nisi. Etiam porttitor venenatis consectetur. Ut varius ullamcorper est, et euismod dui porttitor. '
            },
            {
               title: 'Second Test Event',
               color: '#0ed3ed',
               start: moment({ hour: 5, minute: 15 }),
               end: moment({ hour: 5, minute: 15 }).add(6, 'h'),
               icon: 'address book',
               key: '45435',
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
               place: 'Hotel de police',
               description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien justo, mattis quis ante vel, aliquam finibus felis. Nullam mauris nunc, auctor suscipit gravida nec, bibendum sed nisi. Etiam porttitor venenatis consectetur. Ut varius ullamcorper est, et euismod dui porttitor. '
            },
            {
               title: 'Sixth Test Event',
               color: '#00c21d',
               start: moment({ hour: 12, minute: 0 }),
               end: moment({ hour: 12, minute: 15 }).add(2, 'h'),
               icon: 'birthday cake',
               key: '646863',
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
               place: 'Hotel de police',
               description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien justo, mattis quis ante vel, aliquam finibus felis. Nullam mauris nunc, auctor suscipit gravida nec, bibendum sed nisi. Etiam porttitor venenatis consectetur. Ut varius ullamcorper est, et euismod dui porttitor. '
            }
         )
      )
   }, [])

   /* useEffect(() => {
      console.log(eventList)
   }, [eventList])
*/
   return <Calendar eventList={eventList} setEvents={handleSetEvents} settings={settings} />
}

ReactDOM.render(<Main />, document.querySelector('#root'))
