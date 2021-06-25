import React, { useContext } from "react"
import { Modal } from "semantic-ui-react"
import StateContext from "../../StateContext"
import DispatchContext from "../../DispatchContext"
import ModifModal from "./ModifModal"
import CreateModal from "./CreateModal"

const MainModal = props => {
   const appState = useContext(StateContext)
   const appDispatch = useContext(DispatchContext)
   const modalInfo = appState.modal

   const modalType = () => {
      switch (modalInfo.mode) {
         case "modif":
            return <ModifModal event={modalInfo.event} />
         case "create":
            return <CreateModal event={modalInfo.event} />
         default:
            return "ERROR"
      }
   }

   return (
      <Modal dimmer="blurring" open={modalInfo.open} onClose={() => appDispatch({ type: "closeModal" })}>
         {modalType()}
      </Modal>
   )
}

export default MainModal
