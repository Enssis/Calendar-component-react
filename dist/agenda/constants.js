"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applicationTheme = exports.SET_THEME = exports.SET_LANGUAGE_FILE = exports.SET_EVENTLIST = exports.ZOOM_MINUS = exports.ZOOM_PLUS = exports.SET_ACTIVE_TAG = exports.ADD_ACTIVE_TAG = exports.CLOSE_TAGS = exports.OPEN_TAGS = exports.OPEN_SETTINGS = exports.CLOSE_SETTINGS = exports.SET_TAGS = exports.SET_TIME_RANGE = exports.SET_SETTINGS = exports.SET_COLORS = exports.DELETE_EVENT = exports.MODIF_EVENT = exports.MODIF = exports.SET_EVENTS = exports.CLOSE_MODAL = exports.ADD_EVENT = exports.ADD_MONTHS = exports.ADD_DAYS = exports.SET_DISPLAYED_DATE = exports.UPDATE_DATE = exports.CREATE = exports.OPEN_MODAL = exports.WEEK = exports.DAY = exports.MONTH = exports.SET_MODE = void 0;
const SET_MODE = 'SET_MODE';
exports.SET_MODE = SET_MODE;
const MONTH = 'MONTH';
exports.MONTH = MONTH;
const DAY = 'DAY';
exports.DAY = DAY;
const WEEK = 'WEEK';
exports.WEEK = WEEK;
const OPEN_MODAL = 'OPEN_MODAL';
exports.OPEN_MODAL = OPEN_MODAL;
const CREATE = 'CREATE';
exports.CREATE = CREATE;
const UPDATE_DATE = 'UPDATE_DATE';
exports.UPDATE_DATE = UPDATE_DATE;
const SET_DISPLAYED_DATE = 'SET_DISPLAYED_DATE';
exports.SET_DISPLAYED_DATE = SET_DISPLAYED_DATE;
const ADD_DAYS = 'ADD_DAYS';
exports.ADD_DAYS = ADD_DAYS;
const ADD_MONTHS = 'ADD_MONTHS';
exports.ADD_MONTHS = ADD_MONTHS;
const ADD_EVENT = 'ADD_EVENT';
exports.ADD_EVENT = ADD_EVENT;
const CLOSE_MODAL = 'CLOSE_MODAL';
exports.CLOSE_MODAL = CLOSE_MODAL;
const SET_EVENTS = 'SET_EVENTS';
exports.SET_EVENTS = SET_EVENTS;
const MODIF = 'MODIF';
exports.MODIF = MODIF;
const MODIF_EVENT = 'MODIF_EVENT';
exports.MODIF_EVENT = MODIF_EVENT;
const DELETE_EVENT = 'DELETE_EVENT';
exports.DELETE_EVENT = DELETE_EVENT;
const SET_COLORS = 'SET_COLORS';
exports.SET_COLORS = SET_COLORS;
const SET_SETTINGS = 'SET_SETTINGS';
exports.SET_SETTINGS = SET_SETTINGS;
const SET_TIME_RANGE = 'SET_TIME_RANGE';
exports.SET_TIME_RANGE = SET_TIME_RANGE;
const SET_TAGS = 'SET_TAGS';
exports.SET_TAGS = SET_TAGS;
const CLOSE_SETTINGS = 'CLOSE_SETTINGS';
exports.CLOSE_SETTINGS = CLOSE_SETTINGS;
const OPEN_SETTINGS = 'OPEN_SETTINGS';
exports.OPEN_SETTINGS = OPEN_SETTINGS;
const OPEN_TAGS = 'OPEN_TAGS';
exports.OPEN_TAGS = OPEN_TAGS;
const CLOSE_TAGS = 'CLOSE_TAGS';
exports.CLOSE_TAGS = CLOSE_TAGS;
const ADD_ACTIVE_TAG = 'ADD_ACTIVE_TAG';
exports.ADD_ACTIVE_TAG = ADD_ACTIVE_TAG;
const SET_ACTIVE_TAG = 'SET_ACTIVE_TAG';
exports.SET_ACTIVE_TAG = SET_ACTIVE_TAG;
const ZOOM_PLUS = 'ZOOM_PLUS';
exports.ZOOM_PLUS = ZOOM_PLUS;
const ZOOM_MINUS = 'ZOOM_MINUS';
exports.ZOOM_MINUS = ZOOM_MINUS;
const SET_EVENTLIST = 'SET_EVENTLIST';
exports.SET_EVENTLIST = SET_EVENTLIST;
const SET_LANGUAGE_FILE = 'SET_LANGUAGE_FILE';
exports.SET_LANGUAGE_FILE = SET_LANGUAGE_FILE;
const SET_THEME = 'SET_THEME'; // définition des thèmes de l'application

exports.SET_THEME = SET_THEME;
const applicationTheme = [{
  id: 0,
  name: 'Rouge',
  value: 'thRed',
  accentColor: '#FF5252',
  textPrimaryColor: '#FFFFFF',
  defaultPrimaryColor: '#F44336',
  darkPrimaryColor: '#D32F2F',
  lightPrimaryColor: '#FFCDD2',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 1,
  name: 'Rose',
  value: 'thPink',
  accentColor: '#FF4081',
  textPrimaryColor: '#FFFFFF',
  defaultPrimaryColor: '#E91E63',
  darkPrimaryColor: '#C2185B',
  lightPrimaryColor: '#E1BEE7',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 2,
  name: 'Pourpre',
  value: 'thPurple',
  accentColor: '#E040FB',
  textPrimaryColor: '#FFFFFF',
  defaultPrimaryColor: '#9C27B0',
  darkPrimaryColor: '#7B1FA2',
  lightPrimaryColor: '#E1BEE7',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 3,
  name: 'Violet',
  value: 'thDeepPurple',
  accentColor: '#7C4DFF',
  textPrimaryColor: '#FFFFFF',
  defaultPrimaryColor: '#673AB7',
  darkPrimaryColor: '#512DA8',
  lightPrimaryColor: '#D1C4E9',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 4,
  name: 'Indigo',
  value: 'thIndigo',
  accentColor: '#536DFE',
  textPrimaryColor: '#FFFFFF',
  defaultPrimaryColor: '#3F51B5',
  darkPrimaryColor: '#303F9F',
  lightPrimaryColor: '#C5CAE9',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 5,
  name: 'Bleu',
  value: 'thBlue',
  accentColor: '#448AFF',
  textPrimaryColor: '#FFFFFF',
  defaultPrimaryColor: '#2196F3',
  darkPrimaryColor: '#1976D2',
  lightPrimaryColor: '#BBDEFB',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 6,
  name: 'Bleu Clair',
  value: 'thLightBlue',
  accentColor: '#03A9F4',
  textPrimaryColor: '#212121',
  defaultPrimaryColor: '#03A9F4',
  darkPrimaryColor: '#0288D1',
  lightPrimaryColor: '#B3E5FC',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 7,
  name: 'Cyan',
  value: 'thCyan',
  accentColor: '#00BCD4',
  textPrimaryColor: '#212121',
  defaultPrimaryColor: '#00BCD4',
  darkPrimaryColor: '#0097A7',
  lightPrimaryColor: '#B2EBF2',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 8,
  name: 'Turquoise',
  value: 'thTeal',
  accentColor: '#009688',
  textPrimaryColor: '#FFFFFF',
  defaultPrimaryColor: '#009688',
  darkPrimaryColor: '#00796B',
  lightPrimaryColor: '#B2DFDB',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 9,
  name: 'Vert',
  value: 'thGreen',
  accentColor: '#4CAF50',
  textPrimaryColor: '#FFFFFF',
  defaultPrimaryColor: '#4CAF50',
  darkPrimaryColor: '#388E3C',
  lightPrimaryColor: '#C8E6C9',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 10,
  name: 'Vert Clair',
  value: 'thLightGreen',
  accentColor: '#8BC34A',
  textPrimaryColor: '#212121',
  defaultPrimaryColor: '#8BC34A',
  darkPrimaryColor: '#689F38',
  lightPrimaryColor: '#DCEDC8',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 11,
  name: 'Citron Vert',
  value: 'thLime',
  accentColor: '#CDDC39',
  textPrimaryColor: '#212121',
  defaultPrimaryColor: '#CDDC39',
  darkPrimaryColor: '#AFB42B',
  lightPrimaryColor: '#F0F4C3',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 12,
  name: 'Jaune',
  value: 'thYellow',
  accentColor: '#FFEB3B',
  textPrimaryColor: '#212121',
  defaultPrimaryColor: '#FFEB3B',
  darkPrimaryColor: '#FBC02D',
  lightPrimaryColor: '#FFF9C4',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 13,
  name: 'Ambre',
  value: 'thAmber',
  accentColor: '#FFC107',
  textPrimaryColor: '#212121',
  defaultPrimaryColor: '#FFC107',
  darkPrimaryColor: '#FFA000',
  lightPrimaryColor: '#FFECB3',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 14,
  name: 'Orange',
  value: 'thOrange',
  accentColor: '#FF9800',
  textPrimaryColor: '#212121',
  defaultPrimaryColor: '#FF9800',
  darkPrimaryColor: '#F57C00',
  lightPrimaryColor: '#FFE0B2',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 15,
  name: 'Orange Foncé',
  value: 'thDeepOrange',
  accentColor: '#FF5722',
  textPrimaryColor: '#FFFFFF',
  defaultPrimaryColor: '#FF5722',
  darkPrimaryColor: '#E64A19',
  lightPrimaryColor: '#FFCCBC',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 16,
  name: 'Marron',
  value: 'thBrown',
  accentColor: '#795548',
  textPrimaryColor: '#FFFFFF',
  defaultPrimaryColor: '#795548',
  darkPrimaryColor: '#5D4037',
  lightPrimaryColor: '#D7CCC8',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 17,
  name: 'Gris',
  value: 'thGrey',
  accentColor: '#9E9E9E',
  textPrimaryColor: '#212121',
  defaultPrimaryColor: '#9E9E9E',
  darkPrimaryColor: '#616161',
  lightPrimaryColor: '#F5F5F5',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 18,
  name: 'Bleu Gris',
  value: 'thBlueGrey',
  accentColor: '#607D8B',
  textPrimaryColor: '#FFFFFF',
  defaultPrimaryColor: '#607D8B',
  darkPrimaryColor: '#455A64',
  lightPrimaryColor: '#CFD8DC',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 19,
  name: 'Blanc',
  value: 'thWhite',
  accentColor: '#e7e4e4',
  textPrimaryColor: '#212121',
  defaultPrimaryColor: '#FFFFFF',
  darkPrimaryColor: '#9e9e9e',
  lightPrimaryColor: '#f8dbdb',
  primaryText: '#212121',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}, {
  id: 20,
  name: 'Noir',
  value: 'thBlack',
  accentColor: '#868686',
  textPrimaryColor: '#FFFFFF',
  defaultPrimaryColor: '#252424',
  darkPrimaryColor: '#000000',
  lightPrimaryColor: '#B2DFDB',
  primaryText: '#FFFFFF',
  secondaryText: '#757575',
  dividerColor: '#BDBDBD'
}];
exports.applicationTheme = applicationTheme;