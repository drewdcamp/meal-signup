import React from "react";
import ContentLoader from "react-content-loader";

const DishLoader = (props) => (
  <ContentLoader
    speed={1}
    width={440}
    height={440}
    viewBox="0 0 480 480"
    backgroundColor="#ffffff88"
    foregroundColor="#ffffff44"
    {...props}
  >
    <rect x="0" y="00" rx="3" ry="3" width="120" height="24" />
    <rect x="220" y="00" rx="3" ry="3" width="100" height="24" />
    <rect x="340" y="00" rx="3" ry="3" width="100" height="24" />
    <rect x="0" y="32" rx="3" ry="3" width="440" height="2" />

    <rect x="0" y="40" rx="3" ry="3" width="100" height="20" />
    <rect x="240" y="40" rx="3" ry="3" width="60" height="20" />
    <rect x="360" y="40" rx="3" ry="3" width="60" height="20" />
    <rect x="0" y="68" rx="3" ry="3" width="440" height="2" />

    <rect x="0" y="78" rx="3" ry="3" width="80" height="18" />
    <rect x="250" y="78" rx="3" ry="3" width="40" height="18" />
    <rect x="370" y="78" rx="3" ry="3" width="40" height="18" />

    <rect x="0" y="108" rx="3" ry="3" width="90" height="18" />
    <rect x="250" y="108" rx="3" ry="3" width="40" height="18" />
    <rect x="370" y="108" rx="3" ry="3" width="40" height="18" />

    <rect x="0" y="138" rx="3" ry="3" width="70" height="18" />
    <rect x="250" y="138" rx="3" ry="3" width="40" height="18" />
    <rect x="370" y="138" rx="3" ry="3" width="40" height="18" />

    <rect x="0" y="168" rx="3" ry="3" width="80" height="18" />
    <rect x="250" y="168" rx="3" ry="3" width="40" height="18" />
    <rect x="370" y="168" rx="3" ry="3" width="40" height="18" />
  </ContentLoader>
);

export default DishLoader;
