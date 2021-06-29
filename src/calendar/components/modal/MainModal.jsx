import React, { useContext } from 'react'
import { CLOSE_MODAL, CREATE, MODIF, SETTINGS } from '../../constants'
//components
import { Modal } from 'semantic-ui-react'
import ModifModal from './ModifModal'
import CreateModal from './CreateModal'
//context
import StateContext from '../../StateContext'
import DispatchContext from '../../DispatchContext'
import SettingsModal from './SettingsModal'

const MainModal = () => {
   const appState = useContext(StateContext)
   const appDispatch = useContext(DispatchContext)
   const modalInfo = appState.modal

   const modalType = () => {
      switch (modalInfo.mode) {
         case MODIF:
            return <ModifModal event={modalInfo.event} />
         case CREATE:
            return <CreateModal event={modalInfo.event} />
         case SETTINGS:
            return <SettingsModal />
         default:
            return 'ERROR'
      }
   }

   return (
      <Modal dimmer="blurring" open={modalInfo.open} onClose={() => appDispatch({ type: CLOSE_MODAL })}>
         {modalType()}
      </Modal>
   )
}

export default MainModal
