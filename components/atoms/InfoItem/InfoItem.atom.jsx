import React from 'react'
import { SCTextM } from '../Text/TextM.styled'
import { SCTextSLight } from '../Text/TextS.styled'
import SCInfoItem from './InfoItem.styled'

export default function InfoItem({ icon, title, description }) {
  return (
    <SCInfoItem className="info-item" data-aos="fade-up" data-aos-duration="2000">
      {React.cloneElement(icon)}
      <SCTextM>{title}</SCTextM>
      <SCTextSLight>{description}</SCTextSLight>
    </SCInfoItem>
  )
}
