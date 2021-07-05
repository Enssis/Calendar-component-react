import React, { useContext, useEffect, useState } from 'react'
import { Button, Dropdown, Icon, Header, Sidebar, Grid, Segment, Divider } from 'semantic-ui-react'
import { CLOSE_SETTINGS, SET_COLORS, SET_TIME_RANGE } from '../../constants'
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'
import ColorList from './ColorList'

const SettingsSidebar = props => {
   const appState = useContext(StateContext)
   const { nbrTimeRange, settings, settingsOpen } = appState

   const appDispatch = useContext(DispatchContext)

   const { allowColor, allowTimeRange } = settings.settingsModif

   const [colors, setColors] = useState(appState.colors)
   const [timeRange, setTimeRange] = useState(nbrTimeRange * 5)
   const [modalOpen, setModalOpen] = useState(false)

   //function to handle the color change
   const handleColorChange = colors => {
      setColors(colors)
   }

   //function to applied settings changes
   const handleApplied = () => {
      appDispatch({ type: SET_COLORS, value: colors })
      appDispatch({ type: SET_TIME_RANGE, value: timeRange })
   }

   //function to applied settings change and close the Sidebar
   const handleValidate = () => {
      appDispatch({ type: CLOSE_SETTINGS })
      handleApplied()
   }

   const handleClose = () => {
      if (!modalOpen) appDispatch({ type: CLOSE_SETTINGS })
   }

   return (
      <Sidebar animation="overlay" page={1} as={Segment} inverted visible={settingsOpen} direction="right" vertical onHide={handleClose} width="wide">
         <Grid container style={{ padding: '15px' }}>
            <Grid.Row>
               <Header inverted as="h3">
                  Paramètres <Icon name="settings" />
               </Header>
            </Grid.Row>

            {allowColor || allowColor === undefined ? (
               <>
                  <Divider inverted />
                  <Grid.Row>
                     <Grid container>
                        <Grid.Row>
                           <Header as="h4" inverted>
                              Palette de couleur des évennements :
                           </Header>
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
                           <Header as="h4" inverted>
                              Ecart de temps :
                           </Header>
                        </Grid.Row>
                        <Grid.Row style={{ paddingTop: 0 }}>
                           <Dropdown button options={timeRangeOptions} defaultValue={`${timeRange}`} onChange={(_, data) => setTimeRange(data.value)} />
                        </Grid.Row>
                     </Grid>
                  </Grid.Row>
               </>
            ) : null}
            <Divider inverted />
            <Grid.Row>
               <Button positive onClick={handleApplied}>
                  Appliquer
               </Button>

               <Button positive onClick={handleValidate}>
                  Valider
               </Button>

               <Button negative onClick={() => appDispatch({ type: CLOSE_SETTINGS })}>
                  Annuler
               </Button>
            </Grid.Row>
         </Grid>
      </Sidebar>
   )
}

export default SettingsSidebar

const timeRangeOptions = [
   { key: '5', text: '5 minutes', value: '5' },
   { key: '10', text: '10 minutes', value: '10' },
   { key: '15', text: '15 minutes', value: '15' },
   { key: '30', text: '30 minutes', value: '30' },
   { key: '60', text: '60 minutes', value: '60' }
]
