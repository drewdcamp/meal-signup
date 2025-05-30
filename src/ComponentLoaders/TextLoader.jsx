import React from "react"
import ContentLoader from "react-content-loader"

const TextLoader = (props) => (
  <ContentLoader 
    speed={1}
    viewBox="0 -10 415 100"
    backgroundColor="#ffffff88"
    foregroundColor="#ffffff44"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="25" height="15" /> 
    <rect x="30" y="0" rx="3" ry="3" width="75" height="15" /> 
    <rect x="110" y="0" rx="3" ry="3" width="25" height="15" /> 
    <rect x="140" y="0" rx="3" ry="3" width="25" height="15" /> 

    <rect x="180" y="0" rx="3" ry="3" width="75" height="15" /> 
    <rect x="260" y="0" rx="3" ry="3" width="75" height="15" /> 
    <rect x="340" y="0" rx="3" ry="3" width="75" height="15" /> 

    <rect x="45" y="20" rx="3" ry="3" width="25" height="15" /> 
    <rect x="75" y="20" rx="3" ry="3" width="75" height="15" /> 

    <rect x="165" y="20" rx="3" ry="3" width="75" height="15" /> 
    <rect x="245" y="20" rx="3" ry="3" width="25" height="15" /> 
    <rect x="275" y="20" rx="3" ry="3" width="25" height="15" /> 
    
    <rect x="315" y="20" rx="3" ry="3" width="25" height="15" /> 
    <rect x="345" y="20" rx="3" ry="3" width="25" height="15" /> 

    <rect x="55" y="40" rx="3" ry="3" width="75" height="15" /> 
    <rect x="135" y="40" rx="3" ry="3" width="25" height="15" /> 
    
    <rect x="175" y="40" rx="3" ry="3" width="75" height="15" /> 
    <rect x="255" y="40" rx="3" ry="3" width="75" height="15" /> 
    <rect x="335" y="40" rx="3" ry="3" width="25" height="15" /> 





  </ContentLoader>
)

export default TextLoader

