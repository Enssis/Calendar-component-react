"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.from-entries.js");

require("core-js/modules/es.array.sort.js");

require("core-js/modules/es.symbol.description.js");

var _react = _interopRequireWildcard(require("react"));

var _useImmer = require("use-immer");

var _reactScroll = require("react-scroll");

var _moment = _interopRequireDefault(require("moment"));

require("semantic-ui-css/semantic.min.css");

var _constants = require("./constants");

var _CalendarHeader = _interopRequireDefault(require("./components/header/CalendarHeader"));

var _styledComponents = require("styled-components");

var _semanticUiReact = require("semantic-ui-react");

var _agenda = require("./agenda.style");

var _MainBody = _interopRequireDefault(require("./components/body/MainBody"));

var _SettingsSidebar = _interopRequireDefault(require("./components/settings/SettingsSidebar"));

var _CreateModal = _interopRequireDefault(require("./components/settings/CreateModal"));

var _TagsSidebar = _interopRequireDefault(require("./components/settings/TagsSidebar"));

var _DispatchContext = _interopRequireDefault(require("./DispatchContext"));

var _StateContext = _interopRequireDefault(require("./StateContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const date = (0, _moment.default)();

const Agenda = props => {
  const {
    settings,
    handlers,
    theme,
    language,
    eventColors,
    timeRange,
    tagsList
  } = props;
  const [eventList, setEventList] = (0, _react.useState)(props.eventList);
  const [deletedEvent, setDeleteEvent] = (0, _react.useState)(0); //used in case of options errors

  const [error, setError] = (0, _react.useState)({
    isError: false,
    errorMsg: []
  }); //used to stop any action until the options are verified

  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const [addNewEvent, setAddNewEvent] = (0, _react.useState)(null);
  const [update, setUpdate] = (0, _react.useState)(0); //Default settings in case settings are undefined

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
    timeRange: 15
  }; //initials states for the reducer

  const initialState = {
    mode: _constants.MONTH,
    date: date,
    displayedDate: date,
    event: {},
    modal: {
      open: false,
      mode: '',
      event: {}
    },
    settings: settings ? settings : defaultSettings,
    debug: false,
    colors: eventColors ? eventColors : ['#0ed3ed', '#00c21d', '#ff87c3', '#ffd438', '#ff1c14', '#ff7919', '#0055ff', '#cc00ff'],
    nbrTimeRange: timeRange ? timeRange / 5 : 1,
    settingsOpen: false,
    tagsOpen: false,
    tagsList: tagsList ? tagsList : {},
    activeTags: tagsList ? tagsList : {},
    zoom: 0.6,
    eventList,
    theme: theme !== undefined ? _constants.applicationTheme[theme] : _constants.applicationTheme[5],
    languageFile: require("./language/fr.json")
  }; //Reducer function used to controle all the generals states

  const reducer = (state, action) => {
    const {
      handleEvent,
      handleColors,
      handleTimeRange,
      handleTagList,
      handleTheme
    } = handlers;

    switch (action.type) {
      case _constants.SET_MODE:
        return _objectSpread(_objectSpread({}, state), {}, {
          mode: action.data
        });

      case _constants.UPDATE_DATE:
        const date = (0, _moment.default)();
        return _objectSpread(_objectSpread({}, state), {}, {
          date
        });

      case _constants.SET_DISPLAYED_DATE:
        return _objectSpread(_objectSpread({}, state), {}, {
          displayedDate: action.date
        });

      case _constants.ADD_DAYS:
        let newMom = (0, _moment.default)(state.displayedDate).add(action.nbDays, 'days');
        return _objectSpread(_objectSpread({}, state), {}, {
          displayedDate: newMom
        });

      case _constants.ADD_MONTHS:
        let newMom2 = (0, _moment.default)(state.displayedDate).add(action.nbDays, 'month');
        return _objectSpread(_objectSpread({}, state), {}, {
          displayedDate: newMom2
        });

      case _constants.ADD_EVENT:
        if (eventList.filter(el => el.key === action.value.key).length === 0) {
          handleEvent(eventList.concat(action.value));
          setAddNewEvent(action.value);
        }

        return _objectSpread({}, state);

      case _constants.MODIF_EVENT:
        const event = action.value;
        const newEventList = [...eventList.filter(el => el.key !== event.key)].concat(event);
        handleEvent(newEventList);
        setAddNewEvent(event);
        return _objectSpread({}, state);

      case _constants.DELETE_EVENT:
        const filteredList = [...eventList.filter(el => el.key !== action.value.key)];
        handleEvent(filteredList);
        setEventList(filteredList);
        setDeleteEvent(action.value);
        return _objectSpread({}, state);

      case _constants.OPEN_MODAL:
        return _objectSpread(_objectSpread({}, state), {}, {
          modal: {
            open: true,
            mode: action.mode,
            event: action.event
          }
        });

      case _constants.CLOSE_MODAL:
        return _objectSpread(_objectSpread({}, state), {}, {
          modal: {
            open: false,
            mode: '',
            event: null
          }
        });

      case _constants.SET_EVENTS:
        return _objectSpread(_objectSpread({}, state), {}, {
          event: action.value
        });

      case _constants.SET_COLORS:
        if (handleColors !== undefined) handleColors(action.value);
        return _objectSpread(_objectSpread({}, state), {}, {
          colors: action.value
        });

      case _constants.SET_TIME_RANGE:
        if (handleTimeRange !== undefined) handleTimeRange(action.value);
        return _objectSpread(_objectSpread({}, state), {}, {
          nbrTimeRange: action.value / 5
        });

      case _constants.SET_SETTINGS:
        return _objectSpread(_objectSpread({}, state), {}, {
          settings: action.value
        });

      case _constants.SET_TAGS:
        if (handleTagList !== undefined) handleTagList(action.value);
        handleEvent(eventList.map(el => {
          if (el.tags.length === 0) return el;
          const newEvent = Object.assign({}, el);
          newEvent.tags = newEvent.tags.filter(tag => action.value[tag] !== undefined);
          return newEvent;
        }));
        return _objectSpread(_objectSpread({}, state), {}, {
          tagsList: action.value
        });

      case _constants.OPEN_SETTINGS:
        return _objectSpread(_objectSpread({}, state), {}, {
          settingsOpen: true
        });

      case _constants.CLOSE_SETTINGS:
        return _objectSpread(_objectSpread({}, state), {}, {
          settingsOpen: false
        });

      case _constants.OPEN_TAGS:
        return _objectSpread(_objectSpread({}, state), {}, {
          tagsOpen: true
        });

      case _constants.CLOSE_TAGS:
        return _objectSpread(_objectSpread({}, state), {}, {
          tagsOpen: false
        });

      case _constants.ADD_ACTIVE_TAG:
        let active_tags = _objectSpread(_objectSpread({}, state.activeTags), {}, {
          [action.key]: action.value
        });

        return _objectSpread(_objectSpread({}, state), {}, {
          active_tags
        });

      case _constants.SET_ACTIVE_TAG:
        return _objectSpread(_objectSpread({}, state), {}, {
          activeTags: action.value
        });

      case _constants.ZOOM_MINUS:
        let {
          zoom
        } = state;
        if (zoom > 0.4) zoom -= 0.2;
        return _objectSpread(_objectSpread({}, state), {}, {
          zoom
        });

      case _constants.ZOOM_PLUS:
        let {
          zoom: zoomplus
        } = state;
        if (zoomplus < 2) zoomplus += 0.2;
        return _objectSpread(_objectSpread({}, state), {}, {
          zoom: zoomplus
        });

      case _constants.SET_EVENTLIST:
        return _objectSpread(_objectSpread({}, state), {}, {
          eventList
        });

      case _constants.SET_LANGUAGE_FILE:
        const languageList = ['fr', 'en'];
        let languageFile = '';
        if (languageList.indexOf(language) >= 0) languageFile = require("./language/".concat(language, ".json"));else console.log('non disponible language');
        return _objectSpread(_objectSpread({}, state), {}, {
          languageFile
        });

      case _constants.SET_THEME:
        if (handleTheme !== undefined) handleTheme(action.value);
        return _objectSpread(_objectSpread({}, state), {}, {
          theme: action.value
        });

      default:
        console.log('unrecognized type');
        return _objectSpread({}, state);
    }
  };

  const [state, dispatch] = (0, _react.useReducer)(reducer, initialState); //search all events who have their start between the start and the end of this event

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

    const containedIn = event[startDate] ? event[startDate].filter(el => {
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
    }) : [];
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
      if (event[date] ? events.length !== event[date].length : false) modif = true;
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
              newEvents[nextDate] = newEvents[nextDate].concat(changedEvent);
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
          dateEvents = dateEvents.filter(ev => ev.key !== newContEvent.key).concat(newContEvent); //change the col for other days

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
              newEvents[nextDate] = newEvents[nextDate].concat(changedEvent);
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
    if (deletedEvent) {
      deleteEvent(deletedEvent);
      setEventList(eventList.filter(el => el.key !== deletedEvent.key));
      setDeleteEvent(null);
    }
  }, [deletedEvent]);
  (0, _react.useEffect)(() => {
    setEventList(props.eventList);
    setUpdate(state => state + 1);
  }, [props.eventList]);
  (0, _react.useEffect)(() => {
    dispatch({
      type: _constants.SET_LANGUAGE_FILE
    });
  }, [language]); //check if the options doesn't have errors

  (0, _react.useEffect)(() => {
    if (settings !== undefined || timeRange !== undefined) {
      const {
        table
      } = settings ? settings : {
        before: 1,
        after: 11,
        total: 12
      };
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


      if (timeRange !== undefined) {
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
      }

      setError({
        isError: optionError,
        errorMsg: optionErrMess
      }); //stop the loading
    }

    setIsLoading(false);
  }, [settings]); //loop through the events to assign them to each day

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

    const timeSortedEvents = [...eventList].filter(el => {
      if (el.tags.length === 0 || settings === undefined) return true;

      for (const tagKey of el.tags) {
        if (state.activeTags[tagKey] !== undefined && state.tagsList[tagKey] !== undefined) return true;
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
        console.log({
          duration: timeInfo.duration
        });
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
  }, [props.eventList, isLoading, state.settings.table, state.nbrTimeRange, state.activeTags, update]);
  (0, _react.useEffect)(() => {
    setEventList(eventList.map(ev => {
      const newTags = ev.tags.filter(tagKey => state.tagsList[tagKey] !== undefined);
      const {
        title,
        color,
        start,
        end,
        icon,
        key,
        place,
        description
      } = ev;
      const newEven = {
        title,
        color,
        start,
        end,
        icon,
        key,
        place,
        description,
        tags: newTags
      };
      return newEven;
    }));
    setUpdate(state => state + 1);
  }, [state.tagsList]);
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
  return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Sidebar.Pushable, {
    style: {
      minHeight: '100vh'
    }
  }, /*#__PURE__*/_react.default.createElement(_StateContext.default.Provider, {
    value: state
  }, /*#__PURE__*/_react.default.createElement(_DispatchContext.default.Provider, {
    value: dispatch
  }, /*#__PURE__*/_react.default.createElement(_styledComponents.ThemeProvider, {
    theme: state.theme
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Sidebar.Pusher, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      minHeight: '100vh'
    }
  }, /*#__PURE__*/_react.default.createElement(_CalendarHeader.default, null), /*#__PURE__*/_react.default.createElement(_agenda.StyledElement, {
    name: "body"
  }, /*#__PURE__*/_react.default.createElement(_MainBody.default, null)))), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Modal, {
    dimmer: true,
    open: state.modal.open,
    onClose: () => dispatch({
      type: _constants.CLOSE_MODAL
    })
  }, /*#__PURE__*/_react.default.createElement(_CreateModal.default, {
    event: state.modal.event
  })), /*#__PURE__*/_react.default.createElement(_SettingsSidebar.default, null), /*#__PURE__*/_react.default.createElement(_TagsSidebar.default, null)))));
};

var _default = Agenda;
exports.default = _default;