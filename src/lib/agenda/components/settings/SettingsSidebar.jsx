import React, { useContext, useEffect, useState } from 'react'
import { Button, Dropdown, Icon, Sidebar, Grid, Segment, Divider, List, Label } from 'semantic-ui-react'
import { StyledDropdown, StyledHeader, StyledSidebar } from '../../agenda.style'
import { applicationTheme, CLOSE_SETTINGS, SET_COLORS, SET_THEME, SET_TIME_RANGE } from '../../constants'
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'
import ColorList from './ColorList'

const SettingsSidebar = () => {
   const appState = useContext(StateContext)
   const { nbrTimeRange, settings, settingsOpen, languageFile } = appState
   const { Settings, Actions, theme_list } = languageFile

   const appDispatch = useContext(DispatchContext)

   const { allowColor, allowTimeRange, allowThemeChange } = settings.settingsModif

   const [colors, setColors] = useState(appState.colors)
   const [timeRange, setTimeRange] = useState(nbrTimeRange * 5)
   const [modalOpen, setModalOpen] = useState(false)
   const [theme, setTheme] = useState(appState.theme.id)

   //function to handle the color change
   const handleColorChange = colors => {
      setColors(colors)
   }

   //function to applied settings changes
   const handleApplied = () => {
      appDispatch({ type: SET_COLORS, value: colors })
      appDispatch({ type: SET_TIME_RANGE, value: timeRange })
      appDispatch({ type: SET_THEME, value: applicationTheme[theme] })
   }

   //function to applied settings change and close the Sidebar
   const handleValidate = () => {
      appDispatch({ type: CLOSE_SETTINGS })
      handleApplied()
   }

   const handleClose = () => {
      if (!modalOpen) appDispatch({ type: CLOSE_SETTINGS })
   }

   const timeRangeOptions = [
      { key: '5', text: '5 ' + Settings.minutes, value: '5' },
      { key: '10', text: '10 ' + Settings.minutes, value: '10' },
      { key: '15', text: '15 ' + Settings.minutes, value: '15' },
      { key: '30', text: '30 ' + Settings.minutes, value: '30' },
      { key: '60', text: '60 ' + Settings.minutes, value: '60' }
   ]

   const themesOptions = theme_list.map((theme, key) => {
      return {
         key,
         value: key,
         text: (
            <>
               <Label empty inline circular style={{ backgroundColor: applicationTheme[key].accentColor }} />
               <span>{theme}</span>
            </>
         )
      }
   })

   return (
      <Sidebar style={{ backgroundColor: appState.theme.darkPrimaryColor }} animation="overlay" page={1} as={Segment} inverted visible={settingsOpen} direction="right" vertical onHide={handleClose} width="wide">
         <Grid container style={{ padding: '15px' }}>
            <Grid.Row>
               <StyledHeader inverted as="h3">
                  {Settings.settings} <Icon name="settings" />
               </StyledHeader>
            </Grid.Row>

            {allowColor || allowColor === undefined ? (
               <>
                  <Divider inverted />
                  <Grid.Row>
                     <Grid container>
                        <Grid.Row>
                           <StyledHeader as="h4" inverted>
                              {Settings.colors} :
                           </StyledHeader>
                        </Grid.Row>
                        <Grid.Row>
                           <ColorList colors={colors} setColors={handleColorChange} setModalOpen={value => setModalOpen(value)} />
                        </Grid.Row>
                     </Grid>
                  </Grid.Row>
               </>
            ) : null}
            {allowTimeRange || allowTimeRange === undefined ? (
               <>
                  <Divider inverted />
                  <Grid.Row>
                     <Grid container>
                        <Grid.Row>
                           <StyledHeader as="h4" inverted>
                              {Settings.time} :
                           </StyledHeader>
                        </Grid.Row>
                        <Grid.Row style={{ paddingTop: 0 }}>
                           <StyledDropdown default={1} button options={timeRangeOptions} defaultValue={`${timeRange}`} onChange={(_, data) => setTimeRange(data.value)} />
                        </Grid.Row>
                     </Grid>
                  </Grid.Row>
               </>
            ) : null}
            {allowThemeChange || allowThemeChange === undefined ? (
               <>
                  <Divider inverted />
                  <Grid.Row>
                     <Grid container>
                        <Grid.Row>
                           <StyledHeader as="h4" inverted>
                              {Settings.theme} :
                           </StyledHeader>
                        </Grid.Row>
                        <Grid.Row>
                           <StyledDropdown default={1} scrolling button options={themesOptions} defaultValue={theme} onChange={(_, data) => setTheme(data.value)} />
                        </Grid.Row>
                     </Grid>
                  </Grid.Row>
               </>
            ) : null}
            <Divider inverted />
            <Grid.Row>
               <Button positive onClick={handleApplied}>
                  {Actions.applied}
               </Button>

               <Button positive onClick={handleValidate}>
                  {Actions.confirm}
               </Button>

               <Button negative onClick={() => appDispatch({ type: CLOSE_SETTINGS })}>
                  {Actions.cancel}
               </Button>
            </Grid.Row>
         </Grid>
      </Sidebar>
   )
}

export default SettingsSidebar
