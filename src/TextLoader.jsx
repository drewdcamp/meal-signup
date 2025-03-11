import React from "react"
import ContentLoader from "react-content-loader"

const TextLoader = (props) => (
  <ContentLoader 
    speed={1}
    width={540}
    height={84}
    viewBox="0 0 540 84"
    backgroundColor="#ffffff88"
    foregroundColor="#ffffff44"
    {...props}
  >
    <rect x="0" y="8" rx="3" ry="3" width="25" height="18" /> 
    <rect x="30" y="8" rx="3" ry="3" width="75" height="18" /> 
    <rect x="110" y="8" rx="3" ry="3" width="25" height="18" /> 
    <rect x="140" y="8" rx="3" ry="3" width="25" height="18" /> 

    <rect x="180" y="8" rx="3" ry="3" width="75" height="18" /> 
    <rect x="260" y="8" rx="3" ry="3" width="75" height="18" /> 
    <rect x="340" y="8" rx="3" ry="3" width="75" height="18" /> 

    <rect x="430" y="8" rx="3" ry="3" width="25" height="18" /> 
    <rect x="460" y="8" rx="3" ry="3" width="75" height="18" /> 

    <rect x="40" y="44" rx="3" ry="3" width="75" height="18" /> 
    <rect x="120" y="44" rx="3" ry="3" width="25" height="18" /> 
    <rect x="150" y="44" rx="3" ry="3" width="25" height="18" /> 

    <rect x="190" y="44" rx="3" ry="3" width="75" height="18" /> 
    <rect x="270" y="44" rx="3" ry="3" width="25" height="18" /> 
    
    <rect x="310" y="44" rx="3" ry="3" width="75" height="18" /> 
    <rect x="390" y="44" rx="3" ry="3" width="75" height="18" /> 
    <rect x="470" y="44" rx="3" ry="3" width="25" height="18" /> 





  </ContentLoader>
)

export default TextLoader

