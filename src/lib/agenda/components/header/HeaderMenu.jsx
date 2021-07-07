import moment from 'moment'
import React, { useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { DAY, MONTH, OPEN_MODAL, SET_MODE, WEEK, CREATE, OPEN_SETTINGS, OPEN_TAGS } from '../../constants'

//context
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'
import { MargedIcon, StyledMenuItem } from '../../agenda.style'

const HeaderMenu = () => {
   const { settings, mode, languageFile } = useContext(StateContext)
   const { month, week, day } = languageFile
   const appDispatch = useContext(DispatchContext)

   const handleOpenSettings = () => {
      appDispatch({ type: OPEN_SETTINGS })
   }

   return (
      <Menu secondary>
         <StyledMenuItem name={month} active={mode === MONTH} onClick={() => appDispatch({ type: SET_MODE, data: MONTH })} />
         <StyledMenuItem name={week} active={mode === WEEK} onClick={() => appDispatch({ type: SET_MODE, data: WEEK })} />
         <StyledMenuItem name={day} active={mode === DAY} onClick={() => appDispatch({ type: SET_MODE, data: DAY })} />
         <Menu.Menu position="right">
            <StyledMenuItem name="tag" onClick={() => appDispatch({ type: OPEN_TAGS })}>
               <MargedIcon name="tags" />
            </StyledMenuItem>

            {
               //add icon used to open the create modal only if it's allowed in the settings
               settings.allowCreation ? (
                  <StyledMenuItem name="add" onClick={() => appDispatch({ type: OPEN_MODAL, mode: CREATE, event: moment().minute(moment().minute() - (moment().minute() % 5)) })}>
                     <MargedIcon name="add" />
                  </StyledMenuItem>
               ) : null
            }

            {
               //add icon used to open the Settings modal only if it's allowed in the settings
               settings.settingsModif.allowed ? (
                  <StyledMenuItem name="settings" onClick={handleOpenSettings}>
                     <MargedIcon name="setting" />
                  </StyledMenuItem>
               ) : null
            }
         </Menu.Menu>
      </Menu>
   )
}

export default HeaderMenu
