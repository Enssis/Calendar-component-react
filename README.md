# Agenda React Component

![Capture d’écran du 2021-07-09 09-39-02](https://user-images.githubusercontent.com/49796491/125041916-93d8a900-e099-11eb-99a3-42fb1b5d678c.png)

## Description

An Agenda component for your React application. Display a list of events and offer the possibility to create new or modify these events.

Offer the possibility to customise options and colors of the component.

## Installation

Use `npm install agenda-rc` to install the package
You need to download [input-moment.min.css](https://github.com/wayofthefuture/react-input-moment/tree/master/css) and add it as a css link in your html page

## Utilisation

### Props

| Props       | Description                                                                                                 | Type                  | Optional                |
| ----------- | ----------------------------------------------------------------------------------------------------------- | --------------------- | ----------------------- |
| eventList   | List of events which will be displayed in the agenda                                                        | Array                 | false                   |
| language    | Language of the text displayed                                                                              | String ("en" or "fr") | true (fr by default)    |
| theme       | Index of the color theme (see [material palette](https://www.materialpalette.com/colors) + white and black) | number                | true                    |
| settings    | List of settings of the app                                                                                 | Object                | true                    |
| handlers    | List of function to update value of different props (no need to update the props of the component)          | Object                | false                   |
| tagsList    | List of tags                                                                                                | Object                | false(but can be empty) |
| eventColors | Default List of colors for events                                                                           | List                  | true                    |
| timeRange   | Minimal time division (must be : 5, 10, 15, 20, 30 or 60)                                                   | Number                | true (default : 5)      |

#### Settings

Settings object props

| Name              | Description                                                              | Type    | Optional              |
| ----------------- | ------------------------------------------------------------------------ | ------- | --------------------- |
| settingsModif     | Defined wich options can be changed within the component                 | Object  | false                 |
| table             | Used to know during how much month before and after the events are given | Object  | false                 |
| title             | Informations about the title                                             | Object  | false                 |
| allowCreation     | Tell if we can create new events                                         | Boolean | true (default : true) |
| allowModification | Tell if we can modify existing event (delete included)                   | Boolean | true (default : true) |
| allowTags         | allow the creation of tags                                               | Object  | true (default : true) |

#### settingsModif

SettingsModif object props

| Name             | Description                                                         | Type    | Optional               |
| ---------------- | ------------------------------------------------------------------- | ------- | ---------------------- |
| allowed          | Allow the possibility to acces change the settings in the component | Boolean | false                  |
| allowColor       | Allow to change the event color range                               | Boolean | true (default : true ) |
| allowTimeRange   | Allow to change the time division                                   | Boolean | true (default : true ) |
| allowThemeChange | Allow to change the theme                                           | Boolean | true (default : true ) |

#### table

Table object props

| Name   | Description                                | Type   | Optional |
| ------ | ------------------------------------------ | ------ | -------- |
| before | Number of month rendered before today date | Number | false    |
| after  | Number of month rendered after today date  | Number | false    |
| total  | Number total of month rendered             | Number | false    |

#### title

Title object props

| Name     | Description                                                      | Type    | Optional |
| -------- | ---------------------------------------------------------------- | ------- | -------- |
| isImage  | Tell if you want to use an image instead of a text for the title | Boolean | false    |
| value    | Title or path to the image                                       | String  | false    |
| hasLogo  | Tell if ther is a logo to render before the title                | Boolean | false    |
| logoPath | Path to the logo                                                 | String  | false    |

#### Handlers

List of function to update value of different props (no need to update the props of the component)

| Name            | Description                                       | Type     | Optional |
| --------------- | ------------------------------------------------- | -------- | -------- |
| handleEvent     | Function to return the events modified or created | function | false    |
| handleColors    | Function to return the color range                | function | true     |
| handleTimeRange | Function to return the time division              | function | true     |
| handleTagList   | Function to return the tags                       | function | true     |
| handleTheme     | Function to return the theme                      | function | true     |

### Example

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
         allowTimeRange: true,
         //allow theme color change
         allowThemeChange: true
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
      //allow the creation of tags
      allowTags : true
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
      handleTagList: function, // for the tagList
      handleTheme: function // for the theme
   }

   //List of tags
   const tagsList = {
   //can be empty, tags can be created when events are created / modified
   //else is on the format
      key: { //the key of the tag (must be unique)
         name: '', //the name displayed
         color: '' //the color, must be one element of : red, orange, yellow, olive, green, teal, blue, violet, purple, pink, brown, grey, black
      }
   }

   //array of default color (in hexaDecimal) for events(optional)
   const eventColors = ['#000', '#f00', '#0f0', '#00f']

   //minimal time range (multiple of 5 and one hour can be easily divided in equals part of this time range) must be : 5, 10, 15, 20, 30 or 60
   const timeRange = 15

   .
   .
   .


   ReactDOM.render(<Calendar eventList={eventList} language="en" theme={1} settings={settings} handlers={handlers} tagsList={tagsList} eventColors={eventColors} timeRange={timeRange} />, document.querySelector('#root'))

```
