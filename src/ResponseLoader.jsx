import React from "react"
import ContentLoader from "react-content-loader"

const ResponseLoader = (props) => (
  <ContentLoader 
    speed={1}
    width={520}
    height={600}
    viewBox="0 0 525 600"
    backgroundColor="#00000033"
    foregroundColor="#00000022"
    {...props}
  >
    <rect x="100" y="8" rx="3" ry="3" width="340" height="50" /> 
    <rect x="120" y="64" rx="3" ry="3" width="300" height="20" /> 
    <rect x="20" y="90" rx="3" ry="3" width="480" height="60" /> 

    
    <rect x="100" y="158" rx="3" ry="3" width="340" height="50" /> 
    <rect x="120" y="214" rx="3" ry="3" width="300" height="20" /> 
    <rect x="20" y="240" rx="3" ry="3" width="480" height="60" /> 
    <rect x="20" y="310" rx="3" ry="3" width="480" height="60" /> 
    <rect x="20" y="380" rx="3" ry="3" width="480" height="60" /> 
    <rect x="20" y="450" rx="3" ry="3" width="480" height="60" /> 
    <rect x="20" y="520" rx="3" ry="3" width="480" height="60" /> 





  </ContentLoader>
)

export default ResponseLoader

