import React from "react"
import ContentLoader from "react-content-loader"

const ResponseLoader = (props) => (
  <ContentLoader 
    speed={1}
    viewBox="0 0 500 600"
    backgroundColor="#00000033"
    foregroundColor="#00000022"
    {...props}
  >
    <rect x="10" y="10" rx="3" ry="3" width="480" height="580" /> 
  </ContentLoader>
)

export default ResponseLoader

