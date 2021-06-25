import React, { useContext, useEffect, useState } from "react"
import { MainSegmentGroup } from "../calendar.style"
import { Grid, Message, Segment } from "semantic-ui-react"
import BodyMenu from "./BodyMenu"
import CalendarGrid from "./CalendarGrid"
import StateContext from "../../StateContext"
import moment from "moment"

const MainBody = props => {
   const { settings, mode, displayedDate } = useContext(StateContext)

   //use to check if the date is in the dates wher the event are defined
   const [eventCharged, setEventCharged] = useState("totally")
   const [limitDate, setLimitDate] = useState({ before: {}, after: {} })

   useEffect(() => {
      let charged = "totally"
      const limitBefore = moment().add(-settings.table.before, "M")
      const limitAfter = moment().add(settings.table.after, "M")

      setLimitDate({ before: limitBefore, after: limitAfter })

      if ((displayedDate.diff(limitBefore) < 0 && !displayedDate.isSame(limitBefore, "day")) || (displayedDate.diff(limitAfter) > 0 && !displayedDate.isSame(limitAfter, "day"))) {
         charged = ""
      }

      if (mode === "semaine") {
         const fdoLimitBeforeWeek = moment(limitBefore).add(-limitBefore.day(), "d")
         const fdoLimitAfterWeek = moment(limitAfter).add(-limitAfter.day(), "d")
         const fdoDysplayedWeek = moment(displayedDate).add(-displayedDate.day(), "d")

         if (fdoLimitAfterWeek.isSame(fdoDysplayedWeek, "day") || fdoLimitBeforeWeek.isSame(fdoDysplayedWeek, "day")) charged = "partially"
      }

      if (mode === "mois") {
         if (limitBefore.isSame(displayedDate, "month") || limitAfter.isSame(displayedDate, "month")) {
            charged = "partially"
         }
      }

      setEventCharged(charged)
   }, [settings, mode, displayedDate])

   return (
      <Grid container centered>
         <Grid.Column textAlign="center">
            {eventCharged !== "totally" ? (
               <Message warning>
                  <Message.Header>
                     Vous regardez {mode === "mois" ? "un mois" : mode === "jour" ? "une date" : "une semaine"} dont les évennements n'ont pas été {eventCharged === "partially" ? "totallement" : ""} importés
                  </Message.Header>
                  <p>
                     Les dates limites sont le {limitDate.before.format("DD/MM/YYYY")} et le {limitDate.after.format("DD/MM/YYYY")}{" "}
                  </p>
               </Message>
            ) : (
               ""
            )}
            <MainSegmentGroup>
               <Segment basic>
                  <BodyMenu />
               </Segment>
               <Segment basic>
                  <CalendarGrid />
               </Segment>
            </MainSegmentGroup>
         </Grid.Column>
      </Grid>
   )
}

export default MainBody
