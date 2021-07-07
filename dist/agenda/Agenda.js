"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.from-entries.js");

require("core-js/modules/es.array.sort.js");

var _react = _interopRequireWildcard(require("react"));

var _useImmer = require("use-immer");

var _reactScroll = require("react-scroll");

var _moment = _interopRequireDefault(require("moment"));

require("semantic-ui-css/semantic.min.css");

var _semanticUiReact = require("semantic-ui-react");

var _constants = require("./constants");

var _CalendarHeader = _interopRequireDefault(require("./components/header/CalendarHeader"));

var _MainBody = _interopRequireDefault(require("./components/body/MainBody"));

var _SettingsSidebar = _interopRequireDefault(require("./components/settings/SettingsSidebar"));

var _DispatchContext = _interopRequireDefault(require("./DispatchContext"));

var _StateContext = _interopRequireDefault(require("./StateContext"));

var _TagsSidebar = _interopRequireDefault(require("./components/settings/TagsSidebar"));

var _CreateModal = _interopRequireDefault(require("./components/settings/CreateModal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//components
//header
//body
//modal
//context for acces from all childrens
const date = (0, _moment.default)();

const Agenda = props => {
  const {
    settings,
    handlers,
    theme,
    language
  } = props;
  const [eventList, setEventList] = (0, _react.useState)(props.eventList);
  const [deletedEvent, setDeleteEvent] = (0, _react.useState)(0); //used in case of options errors

  const [error, setError] = (0, _react.useState)({
    isError: false,
    errorMsg: []
  }); //used to stop any action until the options are verified

  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const [addNewEvent, setAddNewEvent] = (0, _react.useState)(null); //Default settings in case settings are undefined

  const defaultSettings = {
    settingsModif: {
      allowed: false,
      allowColor: false,
      allowTimeRange: false
    },
    table: {
      before: 1,
      after: 11,
      total: 12
    },
    title: {
      isImage: false,
      value: 'Calendrier',
      hasLogo: false,
      logoPath: ''
    },
    allowCreation: true,
    allowModification: true,
    timeRange: 15,
    tagsList: {}
  };
  const defaultTheme = {
    pageBackground: '#fff',
    //what you want
    headerBackground: 'blue',
    //list of color (segments color)
    mainBackground: '#e3fcfc',
    //wyw
    travelerColor: 'default',
    //button color + 'default' or ''
    dayDateColor: '#fff',
    //wyw
    caseBackground: 'white',
    //wyw
    createBackground: '#fff' // wyw

  }; //initials states for the reducer

  const initialState = settings ? {
    mode: _constants.MONTH,
    date: date,
    displayedDate: date,
    event: {},
    modal: {
      open: false,
      mode: '',
      event: {}
    },
    settings: settings,
    debug: false,
    colors: settings.eventColors ? settings.eventColors : ['#0ed3ed', '#00c21d', '#ff87c3', '#ffd438', '#ff1c14', '#ff7919', '#0055ff', '#cc00ff'],
    nbrTimeRange: settings.timeRange / 5,
    settingsOpen: false,
    tagsOpen: false,
    activeTags: settings.tagsList,
    zoom: 0.6,
    eventList,
    theme: theme !== undefined ? theme : defaultTheme,
    languageFile: require("./language/fr.json")
  } : {
    mode: _constants.MONTH,
    date: date,
    displayedDate: date,
    event: {},
    modal: {
      open: false,
      mode: '',
      event: {}
    },
    settings: defaultSettings,
    debug: false,
    colors: defaultSettings.eventColors ? settings.eventColors : ['#0ed3ed', '#00c21d', '#ff87c3', '#ffd438', '#ff1c14', '#ff7919', '#0055ff', '#cc00ff'],
    nbrTimeRange: defaultSettings.timeRange / 5,
    settingsOpen: false,
    tagsOpen: false,
    activeTags: defaultSettings.tagsList,
    zoom: 1,
    eventList,
    theme: theme !== undefined ? theme : defaultTheme,
    languageFile: require("./language/fr.json")
  }; //Reducer function used to controle all the generals states

  const reducer = (draft, action) => {
    const {
      handleEvent,
      handleColors,
      handleTimeRange,
      handleTagList
    } = handlers;

    switch (action.type) {
      case _constants.SET_MODE:
        draft.mode = action.data;
        break;

      case _constants.UPDATE_DATE:
        const date = (0, _moment.default)();
        draft.date = date;
        break;

      case _constants.SET_DISPLAYED_DATE:
        draft.displayedDate = action.date;
        break;

      case _constants.ADD_DAYS:
        draft.displayedDate = (0, _moment.default)(draft.displayedDate).add(action.nbDays, 'days');
        break;

      case _constants.ADD_MONTHS:
        draft.displayedDate = (0, _moment.default)(draft.displayedDate).add(action.nbDays, 'month');
        break;

      case _constants.ADD_EVENT:
        if (eventList.filter(el => el.key === action.value.key).length === 0) {
          handleEvent(eventList.concat(action.value));
          setAddNewEvent(action.value);
        }

        break;

      case _constants.MODIF_EVENT:
        const event = action.value;
        const newEventList = [...eventList.filter(el => el.key !== event.key)].concat(event);
        handleEvent(newEventList);
        setAddNewEvent(event);
        break;

      case _constants.DELETE_EVENT:
        const filteredList = [...eventList.filter(el => el.key !== action.value.key)];
        handleEvent(filteredList);
        setEventList(filteredList);
        setDeleteEvent(action.value);
        break;

      case _constants.OPEN_MODAL:
        draft.modal = {
          open: true,
          mode: action.mode,
          event: action.event
        };
        break;

      case _constants.CLOSE_MODAL:
        draft.modal.open = false;
        break;

      case _constants.SET_EVENTS:
        draft.event = action.value;
        break;

      case _constants.SET_COLORS:
        handleColors(action.value);
        draft.colors = action.value;
        break;

      case _constants.SET_TIME_RANGE:
        handleTimeRange(action.value);
        draft.nbrTimeRange = action.value / 5;
        break;

      case _constants.SET_SETTINGS:
        draft.settings = action.value;
        break;

      case _constants.SET_TAGS:
        draft.settings.tagsList = action.value;
        handleTagList(action.value);
        handleEvent(eventList.map(el => {
          if (el.tags.length === 0) return el;
          const newEvent = Object.assign({}, el);
          newEvent.tags = newEvent.tags.filter(tag => action.value[tag] !== undefined);
          return newEvent;
        }));
        break;

      case _constants.OPEN_SETTINGS:
        draft.settingsOpen = true;
        break;

      case _constants.CLOSE_SETTINGS:
        draft.settingsOpen = false;
        break;

      case _constants.OPEN_TAGS:
        draft.tagsOpen = true;
        break;

      case _constants.CLOSE_TAGS:
        draft.tagsOpen = false;
        break;

      case _constants.ADD_ACTIVE_TAG:
        draft.activeTags[action.key] = action.value;
        break;

      case _constants.SET_ACTIVE_TAG:
        draft.activeTags = action.value;
        break;

      case _constants.ZOOM_MINUS:
        if (draft.zoom > 0.4) draft.zoom -= 0.2;
        break;

      case _constants.ZOOM_PLUS:
        if (draft.zoom < 2) draft.zoom += 0.2;
        break;

      case _constants.SET_EVENTLIST:
        draft.eventList = eventList;
        break;

      case _constants.SET_LANGUAGE_FILE:
        const languageList = ['fr', 'en'];
        if (languageList.indexOf(language) >= 0) draft.languageFile = require("./language/".concat(language, ".json"));else console.log('non disponible language');
        break;

      default:
        console.log('unrecognized type');
        break;
    }
  };

  const [state, dispatch] = (0, _useImmer.useImmerReducer)(reducer, initialState); //search all events who have their start between the start and the end of this event

  const findContainedEvent = (event, eventList) => {
    const {
      start,
      end
    } = event; //start and end considering the time division

    const startByPart = (0, _moment.default)(start).minutes(start.minutes() - start.minutes() % (5 * state.nbrTimeRange));
    const endByPart = (0, _moment.default)(end).minutes(end.minutes() + 5 * state.nbrTimeRange - end.minutes() % (5 * state.nbrTimeRange));
    return eventList.filter(element => {
      if (startByPart.diff(element.start) <= 0 && endByPart.diff(element.start) > 0 && element.key !== event.key) {
        return true;
      }

      return false;
    });
  }; //function to add an event to the list


  const addEvent = newEvent => {
    let active = false; //check if at least one of it's tag is active

    if (newEvent.tags.length === 0 || settings === undefined) active = true;else for (const tagKey of newEvent.tags) {
      if (state.activeTags[tagKey] !== undefined) active = true;
    }
    if (!active) return;
    const {
      event
    } = state;
    const startDate = (0, _moment.default)(newEvent.start).format('YYYY MM DD');
    const daysEvent = {}; //events that contain the new event

    const containedIn = event[startDate].filter(el => {
      const {
        start,
        end
      } = el; //start and end considering the time division

      const startByPart = (0, _moment.default)(start).minutes(start.minutes() - start.minutes() % (5 * state.nbrTimeRange));
      const endByPart = (0, _moment.default)(end).minutes(end.minutes() + 5 * state.nbrTimeRange - end.minutes() % (5 * state.nbrTimeRange));

      if (startByPart.diff(newEvent.start) <= 0 && endByPart.diff(newEvent.start) > 0 && newEvent.key !== el.key) {
        return true;
      }

      return false;
    });
    let col = -1;

    for (const event of containedIn) {
      let column = 0;
      if ((column = event.timeInfo.column) > col) col = column;
    }

    col++;
    const {
      start,
      end
    } = newEvent; //loop to add the events to each day it is in

    const dates = [];
    let nbDays = 0;
    let day = (0, _moment.default)(start);

    do {
      //wich day we are adding the event
      day = (0, _moment.default)(start).add(nbDays, 'd');
      nbDays++; //the key corresponding to a day are on the format "YYYY MM DD", ex : "2021 06 25" for the 25 june 2021

      const dayFormat = day.format('YYYY MM DD');
      dates.push(dayFormat);
      if (!daysEvent[dayFormat]) daysEvent[dayFormat] = []; //copy of the event to save

      const copyEvent = Object.assign({}, newEvent); //info of the event linked to the day : hour of start and end, and number of time block (ex : 5 quarter of hours or half hours (depending on the options))

      const timeInfo = {
        start,
        end,
        duration: 0,
        column: col
      }; //set the start to 00:00 if the real start is before the day

      if (!start.isSame(day, 'day')) {
        timeInfo.start = (0, _moment.default)({
          year: day.year(),
          month: day.month(),
          date: day.date(),
          hour: 0,
          minute: 0
        });
      } //set the end to 23:59 if the real end is after the day


      if (!end.isSame(day, 'day')) {
        timeInfo.end = (0, _moment.default)({
          year: day.year(),
          month: day.month(),
          date: day.date(),
          hour: 23,
          minute: 59
        });
      } //duration in part of hours


      const dayStart = (0, _moment.default)({
        year: timeInfo.start.year(),
        month: timeInfo.start.month(),
        date: timeInfo.start.date()
      });
      timeInfo.duration = Math.ceil(Math.abs(dayStart.diff(timeInfo.end) / (300000 * state.nbrTimeRange))) - Math.floor(Math.abs(dayStart.diff(timeInfo.start) / (300000 * state.nbrTimeRange)));
      copyEvent['timeInfo'] = timeInfo;
      daysEvent[dayFormat].push(copyEvent);
    } while (!end.isSame(day, 'day')); //remove new event from the events


    const eventListFiltered = Object.fromEntries(Object.entries(event).filter(_ref => {
      let [key, ev] = _ref;
      return ev.key !== newEvent.key;
    })); //events with new columns

    let newEvents = Object.assign({}, eventListFiltered);
    let modif = false;

    for (const date of dates) {
      const events = event[date] ? event[date].filter(el => el.key !== daysEvent[date][0].key) : [];
      if (events.length !== event[date].length) modif = true;
      let dateEvents = [...daysEvent[date], ...events]; //events contained in the new event

      const containedEvents = findContainedEvent(newEvent, event[date] ? event[date] : []);

      for (const contEvent of containedEvents) {
        //if it's column number is updated by the new event, change the event
        if (contEvent.timeInfo.column >= col && !modif) {
          dateEvents = dateEvents.filter(el => el.key !== contEvent.key);
          let newContEvent = Object.assign({}, contEvent);
          const {
            column,
            start,
            end,
            duration
          } = contEvent.timeInfo;
          newContEvent.timeInfo = {
            column: column + 1,
            start,
            end,
            duration
          };
          dateEvents = dateEvents.concat(newContEvent); //change the col for other days

          let dayNbr = 1;
          let nextDate = null; //while the next day isn'tn empty

          while (event[nextDate = (0, _moment.default)(date, 'YYYY MM DD').add(dayNbr, 'd').format('YYYY MM DD')]) {
            //check if the next date will not be already changed at the next iteration
            if (dates.indexOf(nextDate) >= 0) break; //check if there is the event

            let ev = null;

            if ((ev = event[nextDate].filter(el => el.key === contEvent.key)).length > 0) {
              const changedEvent = Object.assign({}, ev[0]);
              newEvents[nextDate] = newEvents[nextDate].filter(el => el.key !== contEvent.key);
              const {
                column,
                start,
                end,
                duration
              } = changedEvent.timeInfo;
              changedEvent.timeInfo = {
                column: column + 1,
                start,
                end,
                duration
              };
              newEvents[nextDate] = newEvents[nextDate].concat(changedEvent).sort((el1, el2) => {
                const diff = el1.start.diff(el2.start);
                if (diff < 0) return -1;else if (diff > 0) return 1;else return 0;
              });
              dayNbr++;
            } else {
              break;
            }
          }
        }
      }

      newEvents[date] = dateEvents.sort((el1, el2) => {
        const diff = el1.start.diff(el2.start);
        if (diff < 0) return -1;else if (diff > 0) return 1;else return 0;
      });
    }

    dispatch({
      type: _constants.SET_EVENTS,
      value: newEvents
    });
  };

  (0, _react.useEffect)(() => {
    if (addNewEvent !== null) {
      addEvent(addNewEvent);
      setEventList(eventList.concat(addNewEvent));
      setAddNewEvent(null);
    }
  }, [addNewEvent]);

  const deleteEvent = eventToDelete => {
    let active = false; //check if at least one of it's tag is active

    if (eventToDelete.tags.length === 0 || settings === undefined) active = true;else for (const tagKey of eventToDelete.tags) {
      if (state.activeTags[tagKey] !== undefined) active = true;
    }
    if (!active) return;
    const {
      start,
      end
    } = eventToDelete;
    const {
      event
    } = state; //loop to find on wich days the event was present

    const dates = [];
    let nbDays = 0;
    let day = (0, _moment.default)(start);

    do {
      //wich day we are adding the event
      day = (0, _moment.default)(start).add(nbDays, 'd');
      nbDays++; //the key corresponding to a day are on the format "YYYY MM DD", ex : "2021 06 25" for the 25 june 2021

      const dayFormat = day.format('YYYY MM DD');
      dates.push(dayFormat);
    } while (!end.isSame(day, 'day')); //remove new event from the events


    const eventListFiltered = Object.fromEntries(Object.entries(event).filter(_ref2 => {
      let [key, ev] = _ref2;
      return ev.key !== eventToDelete.key;
    })); //events with new columns

    let newEvents = Object.assign({}, eventListFiltered);

    for (const date of dates) {
      const events = event[date] ? event[date].filter(el => el.key !== eventToDelete.key) : [];
      let dateEvents = [...events]; //events contained in the new event

      const containedEvents = findContainedEvent(eventToDelete, event[date] ? event[date] : []);

      for (const contEvent of containedEvents) {
        //if it's column number is updated by the new event, change the event
        if (contEvent.timeInfo.column >= eventToDelete.timeInfo.column) {
          let newContEvent = Object.assign({}, contEvent);
          const {
            column,
            start,
            end,
            duration
          } = contEvent.timeInfo;
          newContEvent.timeInfo = {
            column: column - 1,
            start,
            end,
            duration
          };
          dateEvents = dateEvents.concat(newContEvent); //change the col for other days

          let dayNbr = 1;
          let nextDate = null; //while the next day isn't empty

          while (event[nextDate = (0, _moment.default)(date, 'YYYY MM DD').add(dayNbr, 'd').format('YYYY MM DD')]) {
            //check if the next date will not be already changed at the next iteration
            if (dates.indexOf(nextDate) >= 0) break; //check if there is the event

            let ev = null;

            if ((ev = event[nextDate].filter(el => el.key === contEvent.key)).length > 0) {
              const changedEvent = Object.assign({}, ev[0]);
              newEvents[nextDate] = newEvents[nextDate].filter(el => el.key !== contEvent.key);
              const {
                column,
                start,
                end,
                duration
              } = changedEvent.timeInfo;
              changedEvent.timeInfo = {
                column: column - 1,
                start,
                end,
                duration
              };
              newEvents[nextDate] = newEvents[nextDate].concat(changedEvent).sort((el1, el2) => {
                const diff = el1.start.diff(el2.start);
                if (diff < 0) return -1;else if (diff > 0) return 1;else return 0;
              });
              dayNbr++;
            } else {
              break;
            }
          }
        }
      }

      newEvents[date] = dateEvents;
    }

    dispatch({
      type: _constants.SET_EVENTS,
      value: newEvents
    });
  };

  (0, _react.useEffect)(() => {
    if (deletedEvent) {
      deleteEvent(deletedEvent);
      setEventList(eventList.filter(el => el.key !== deletedEvent.key));
      setDeleteEvent(null);
    }
  }, [deletedEvent]);
  (0, _react.useEffect)(() => {
    setEventList(props.eventList);
  }, [props.eventList]);
  (0, _react.useEffect)(() => {
    dispatch({
      type: _constants.SET_LANGUAGE_FILE
    });
  }, [language]); //check if the options doesn't have errors

  (0, _react.useEffect)(() => {
    if (settings !== undefined) {
      const {
        table,
        timeRange
      } = settings;
      let optionError = false;
      let optionErrMess = []; //table settings

      const {
        before,
        after,
        total
      } = table; //check if the total of month is equal to the sum of numbers of months before and after today

      if (before + after !== total) {
        optionError = true;
        optionErrMess.push("Number of month before and after doesn't match with the total");
      } //check if the total isn't equal to 0


      if (total === 0) {
        optionError = true;
        optionErrMess.push('Total is egal to 0');
      } //check if the time part is usable


      if (timeRange % 5 !== 0) {
        optionError = true;
        optionErrMess.push("Time range isn't a multiple of 5");
      } else {
        const nbTimeRange = timeRange / 5;

        if (nbTimeRange < 1) {
          optionError = true;
          optionErrMess.push('Time range is too small');
        } else if (nbTimeRange > 12) {
          optionError = true;
          optionErrMess.push('Time range is too big');
        }

        if (300 % nbTimeRange !== 0) {
          optionError = true;
          optionErrMess.push("A day isn't divisible in equal part with the time range given");
        }
      }

      setError({
        isError: optionError,
        errorMsg: optionErrMess
      }); //stop the loading
    }

    setIsLoading(false);
  }, [state.settings]); //loop through the events to assign them to each day

  (0, _react.useEffect)(() => {
    if (isLoading) {
      return;
    }

    const events = {};
    const {
      before,
      after
    } = state.settings.table; //dictionnary to associate each event key to a column

    const columnList = {}; //sort the events from the first in time to the last and remove these with all tags non active

    const timeSortedEvents = [...props.eventList].filter(el => {
      if (el.tags.length === 0 || settings === undefined) return true;

      for (const tagKey of el.tags) {
        if (state.activeTags[tagKey] !== undefined) return true;
      }

      return false;
    }).sort((el1, el2) => {
      const diff = el1.start.diff(el2.start);
      if (diff < 0) return -1;else if (diff > 0) return 1;else return 0;
    }); //loop through each events to add it to the final array

    for (const event of timeSortedEvents) {
      const {
        start,
        end
      } = event; //check if the event is in the limits dates

      if (end.diff((0, _moment.default)().add(-before, 'M')) < 0 || start.diff((0, _moment.default)().add(after, 'M')) > 0) continue; //column assignation
      //assign to this event the first column or doesn't change anything if it already has one

      if (columnList[event.key] === undefined) {
        columnList[event.key] = 0;
      }

      const sameTimeEvents = findContainedEvent(event, timeSortedEvents); //if there is some, need to assign a column number for each

      if (sameTimeEvents.length > 0) {
        //list of col already taken
        const colTakenList = sameTimeEvents.map(el => columnList[el.key]).filter(el => el !== undefined).concat(columnList[event.key]);
        const usableColumns = Array.from(Array(sameTimeEvents.length + 1).keys()).filter(el => colTakenList.indexOf(el) < 0); //assign to each event without a column number a column and remove it from the array with all usable columns numbers

        for (const sameTimeEvent of sameTimeEvents) {
          if (columnList[sameTimeEvent.key] === undefined) {
            const col = usableColumns.shift();
            columnList[sameTimeEvent.key] = col;
          }
        }
      }

      let nbDays = 0;
      let day = {}; //loop to add the events to each day it is in

      do {
        //wich day we are adding the event
        day = (0, _moment.default)(event.start).add(nbDays, 'd');
        nbDays++; //the key corresponding to a day are on the format "YYYY MM DD", ex : "2021 06 25" for the 25 june 2021

        const dayFormat = day.format('YYYY MM DD');
        if (!events[dayFormat]) events[dayFormat] = []; //copy of the event to save

        const newEvent = Object.assign({}, event); //info of the event linked to the day : hour of start and end, and number of time block (ex : 5 quarter of hours or half hours (depending on the options))

        const timeInfo = {
          start,
          end,
          duration: 0,
          column: columnList[event.key]
        }; //set the start to 00:00 if the real start is before the day

        if (!start.isSame(day, 'day')) {
          timeInfo.start = (0, _moment.default)({
            year: day.year(),
            month: day.month(),
            date: day.date(),
            hour: 0,
            minute: 0
          });
        } //set the end to 23:59 if the real end is after the day


        if (!end.isSame(day, 'day')) {
          timeInfo.end = (0, _moment.default)({
            year: day.year(),
            month: day.month(),
            date: day.date(),
            hour: 23,
            minute: 59
          });
        } //duration in part of hours


        const dayStart = (0, _moment.default)({
          year: timeInfo.start.year(),
          month: timeInfo.start.month(),
          date: timeInfo.start.date()
        });
        timeInfo.duration = Math.ceil(Math.abs(dayStart.diff(timeInfo.end) / (300000 * state.nbrTimeRange))) - Math.floor(Math.abs(dayStart.diff(timeInfo.start) / (300000 * state.nbrTimeRange)));
        newEvent['timeInfo'] = timeInfo;
        events[dayFormat].push(newEvent);
      } while (!end.isSame(day, 'day'));
    }

    dispatch({
      type: _constants.SET_EVENTS,
      value: events
    });
    dispatch({
      type: _constants.SET_EVENTLIST,
      value: eventList
    });
  }, [props.eventList, isLoading, state.settings.table, state.nbrTimeRange, state.activeTags]);
  (0, _react.useEffect)(() => {
    if (settings) {
      dispatch({
        type: _constants.SET_SETTINGS,
        value: settings
      });
    }
  }, [settings]); //function to set the scroll to the body component when the mode change

  (0, _react.useEffect)(() => {
    _reactScroll.scroller.scrollTo('body', {
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  }, [state.mode]); //show a loading icon until settings are verified

  if (isLoading) return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Dimmer, {
    active: true,
    inverted: true
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Loader, null, "Loading")); //show a error message

  if (error.isError) return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Message, {
    negative: true
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Message.Header, null, "There is an error with settings"), /*#__PURE__*/_react.default.createElement(_semanticUiReact.List, {
    items: error.errorMsg
  }));
  return /*#__PURE__*/_react.default.createElement(_StateContext.default.Provider, {
    value: state
  }, /*#__PURE__*/_react.default.createElement(_DispatchContext.default.Provider, {
    value: dispatch
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Sidebar.Pushable, {
    style: {
      minHeight: '100vh'
    }
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Sidebar.Pusher, {
    dimmed: state.settingsOpen || state.tagsOpen
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      minHeight: '100vh'
    }
  }, /*#__PURE__*/_react.default.createElement(_CalendarHeader.default, null), /*#__PURE__*/_react.default.createElement(_reactScroll.Element, {
    name: "body",
    style: {
      backgroundColor: state.theme.pageBackground
    }
  }, /*#__PURE__*/_react.default.createElement(_MainBody.default, null)))), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Modal, {
    dimmer: true,
    open: state.modal.open,
    onClose: () => dispatch({
      type: _constants.CLOSE_MODAL
    })
  }, /*#__PURE__*/_react.default.createElement(_CreateModal.default, {
    event: state.modal.event
  })), /*#__PURE__*/_react.default.createElement(_SettingsSidebar.default, null), /*#__PURE__*/_react.default.createElement(_TagsSidebar.default, null))));
};

var _default = Agenda;
exports.default = _default;