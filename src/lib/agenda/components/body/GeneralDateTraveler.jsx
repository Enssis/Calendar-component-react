import React, { useContext } from 'react'

//components
import { Icon } from 'semantic-ui-react'
import { StyledButton } from '../../agenda.style'

//context
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'

const DateTraveler = props => {
   const { addType, daysMove, last, next, actual } = props
   const appDispatch = useContext(DispatchContext)
   const { travelerColor } = useContext(StateContext).theme
   const colorList = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']
   //change the date displayed by adding the right amount of days / month
   const changeDate = nbDays => {
      return () => appDispatch({ type: addType, nbDays: nbDays * daysMove })
   }
   const color = colorList.indexOf(travelerColor) >= 0 ? travelerColor : null
   return (
      <StyledButton.Group>
         <StyledButton color={color} icon onClick={changeDate(-10)}>
            <Icon name="angle double left" />
         </StyledButton>
         <StyledButton color={color} icon onClick={changeDate(-5)}>
            <Icon name="angle left" />
         </StyledButton>
         <StyledButton color={color} onClick={changeDate(-1)}>
            {last}
         </StyledButton>
         <StyledButton color={color}>{actual}</StyledButton>
         <StyledButton color={color} onClick={changeDate(1)}>
            {next}
         </StyledButton>
         <StyledButton color={color} icon onClick={changeDate(5)}>
            <Icon name="angle right" />
         </StyledButton>
         <StyledButton color={color} icon onClick={changeDate(10)}>
            <Icon name="angle double right" />
         </StyledButton>
      </StyledButton.Group>
   )
}

export default DateTraveler
