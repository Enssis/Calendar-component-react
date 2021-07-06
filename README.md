# Agenda React Component

![Capture d’écran du 2021-07-05 13-22-25](https://user-images.githubusercontent.com/49796491/124464132-1872b100-dd94-11eb-93dc-ab2130b23615.png)

## Description

An Agenda component for your React application. Display a list of events and offer the possibility to create new or modify these events.

Offer the possibility to customise options and colors of the component.
For the moment all texts are in French but the possibility to change the langage is in devellopement

## Installation

Use `npm install agenda-rc` to install the package
You need to download [input-moment.min.css](https://github.com/wayofthefuture/react-input-moment/tree/master/css) and add it as a css link in your html page

## Utilisation

```javaScript

import Agenda from 'agenda-rc'

//Needed for the css to work because of semantic ui (can be imported once in the top container)
import 'semantic-ui-css/semantic.min.css'

const settings = {
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
         value: 'Agenda',
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
      //array of default color (in hexaDecimal) for events(optional)
      eventColors: ['#000', '#f00', '#0f0', '#00f'],
      //minimal time range (multiple of 5 and one hour can be easily divided in equals part of this time range) must be : 5, 10, 15, 20, 30 or 60
      timeRange: 15,
      //list of tags
      tagsList: {
      //can be empty, tags can be created when events are created / modified
      //else is on the format
         key: { //the key of the tag (must be unique)
            name: '', //the name displayed
            color: '' //the color, must be one element of : red, orange, yellow, olive, green, teal, blue, violet, purple, pink, brown, grey, black
         }
      }
   }

  //list of events to be displayed
  const eventList = [
    //exemple of event:
    {
               title: '', // title of the event
               color: '', //color of the event
               start: moment, //start moment (from moment)
               end: moment, //end moment
               icon: '', //name of the icon from semantic ui to be associated (optional)
               key: '', //the unique key correspoding to the event
               place: '', //name of the place where the eventit take place
               tags: [], // list of the keys of the tags associated to this event
               description: '' // the description of the event
            }
  ]

  //list of handlers to permit changes from the agenda
  //handle the change of differents value (take the new value for parameters)
  const handlers = {
      handleEvent: function, //for the eventList
      handleColors: function, // for the colorsList
      handleTimeRange: function, // for the timeRange
      handleTagList: function // for the tagList
   }

   //theme of the app (optional)
   const theme = {
      pageBackground: '', //color of the background of the page
      //color of the background of the page (need to be one of : red, orange, yellow, olive, green, teal, blue, violet, purple, pink, brown, grey, black, white)
      headerBackground: '',
      mainBackground: '', //color of the background of the agenda
      travelerColor: '', //color of the background of the date traveler (need to be one of : red, orange, yellow, olive, green, teal, blue, violet, purple, pink, brown, grey, black, default)
      dayDateColor: '', //Color of the background of the date display
      caseBackground: '', //Color of the background of the cases
      createBackground: '' // Color of the background of the create / modif popup
   }

   .
   .
   .


   ReactDOM.render(<Calendar eventList={eventList} theme={theme} settings={settings} handlers={handlers} />, document.querySelector('#root'))

```
