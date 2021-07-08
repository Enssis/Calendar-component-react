export const SET_MODE = 'SET_MODE'
export const MONTH = 'MONTH'
export const DAY = 'DAY'
export const WEEK = 'WEEK'
export const OPEN_MODAL = 'OPEN_MODAL'
export const CREATE = 'CREATE'
export const UPDATE_DATE = 'UPDATE_DATE'
export const SET_DISPLAYED_DATE = 'SET_DISPLAYED_DATE'
export const ADD_DAYS = 'ADD_DAYS'
export const ADD_MONTHS = 'ADD_MONTHS'
export const ADD_EVENT = 'ADD_EVENT'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const SET_EVENTS = 'SET_EVENTS'
export const MODIF = 'MODIF'
export const MODIF_EVENT = 'MODIF_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'
export const SET_COLORS = 'SET_COLORS'
export const SET_SETTINGS = 'SET_SETTINGS'
export const SET_TIME_RANGE = 'SET_TIME_RANGE'
export const SET_TAGS = 'SET_TAGS'
export const CLOSE_SETTINGS = 'CLOSE_SETTINGS'
export const OPEN_SETTINGS = 'OPEN_SETTINGS'
export const OPEN_TAGS = 'OPEN_TAGS'
export const CLOSE_TAGS = 'CLOSE_TAGS'
export const ADD_ACTIVE_TAG = 'ADD_ACTIVE_TAG'
export const SET_ACTIVE_TAG = 'SET_ACTIVE_TAG'
export const ZOOM_PLUS = 'ZOOM_PLUS'
export const ZOOM_MINUS = 'ZOOM_MINUS'
export const SET_EVENTLIST = 'SET_EVENTLIST'
export const SET_LANGUAGE_FILE = 'SET_LANGUAGE_FILE'
export const SET_THEME = 'SET_THEME'

// définition des thèmes de l'application
export const applicationTheme = [
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   },
   {
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
   }
]
