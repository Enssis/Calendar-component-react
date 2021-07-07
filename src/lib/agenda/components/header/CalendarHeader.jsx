import React, { useContext } from 'react'
import { Grid, Header, Image, Segment } from 'semantic-ui-react'
import { StyledGridColumn, StyledHeader, StyledSegment } from '../../agenda.style'
import StateContext from '../../StateContext'
import HeaderMenu from './HeaderMenu'

const CalendarHeader = () => {
   const { settings } = useContext(StateContext)
   const { title } = settings

   return (
      <Grid celled style={{ marginTop: 0 }}>
         <StyledGridColumn width={10}>
            <StyledSegment basic textAlign="center">
               <StyledHeader as="h1">
                  {title.hasLogo ? <Image src={title.logoPath} /> : ''} {title.isImage ? <Image src={title.value} size="small" /> : <>{title.value}</>}
               </StyledHeader>
            </StyledSegment>
         </StyledGridColumn>
         <StyledGridColumn width={6}>
            <StyledSegment basic textAlign="center">
               <HeaderMenu />
            </StyledSegment>
         </StyledGridColumn>
      </Grid>
   )
}

export default CalendarHeader
