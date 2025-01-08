import React from "react";
import Script from "next/script";

const GOOGLE_ANALYTICS_ID = "G-P4HEQ2GG77";
const MICROSOFT_CLARITY_ID = "pqpvzne6t0";
const PRODUCTION_URL = "ummilhaodepixels.com.br";

function isProduction() {
  if (typeof window !== "undefined") {
    return window.location.hostname === PRODUCTION_URL;
  }
  return false;
}

export function GoogleAnalytics() {
  if (isProduction()) {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </>
    );
  } else {
    return null;
  }
}

export function MicrosoftClarity() {
  if (isProduction()) {
    return (
      <>
        <Script id="ms-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${MICROSOFT_CLARITY_ID}");
          `}
        </Script>
      </>
    );
  } else {
    return null;
  }
}
