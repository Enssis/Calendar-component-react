import moment from 'moment'
import React, { useContext } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { DAY, MONTH, OPEN_MODAL, SET_MODE, WEEK, CREATE, OPEN_SETTINGS, OPEN_TAGS } from '../../constants'

//context
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'
import { MargedIcon } from '../agenda.style'

const HeaderMenu = () => {
   const { settings, mode } = useContext(StateContext)
   const appDispatch = useContext(DispatchContext)

   const handleOpenSettings = () => {
      appDispatch({ type: OPEN_SETTINGS })
   }

   return (
      <Menu inverted secondary>
         <Menu.Item name="Mois" active={mode === MONTH} onClick={() => appDispatch({ type: SET_MODE, data: MONTH })} />
         <Menu.Item name="Semaine" active={mode === WEEK} onClick={() => appDispatch({ type: SET_MODE, data: WEEK })} />
         <Menu.Item name="Jour" active={mode === DAY} onClick={() => appDispatch({ type: SET_MODE, data: DAY })} />
         <Menu.Menu position="right">
            <Menu.Item name="tag" onClick={() => appDispatch({ type: OPEN_TAGS })}>
               <MargedIcon name="tags" />
            </Menu.Item>

            {
               //add icon used to open the create modal only if it's allowed in the settings
               settings.allowCreation ? (
                  <Menu.Item name="add" onClick={() => appDispatch({ type: OPEN_MODAL, mode: CREATE, event: moment().minute(moment().minute() - (moment().minute() % 5)) })}>
                     <MargedIcon name="add" />
                  </Menu.Item>
               ) : null
            }

            {
               //add icon used to open the Settings modal only if it's allowed in the settings
               settings.settingsModif.allowed ? (
                  <Menu.Item name="settings" onClick={handleOpenSettings}>
                     <MargedIcon name="setting" />
                  </Menu.Item>
               ) : null
            }
         </Menu.Menu>
      </Menu>
   )
}

export default HeaderMenu
