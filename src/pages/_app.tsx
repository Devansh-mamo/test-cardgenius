import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from '@mantine/core';
import { api } from "~/utils/api";

//global icon import
// import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
// import { faAt, faPhone, faMapPin, faLink } from '@fortawesome/free-solid-svg-icons'
// import { faLinkedinIn, faWhatsapp, faFacebook, faYoutube, faTwitter, faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons'

// library.add(faAt, faPhone, faMapPin, faLink, faLinkedinIn, faWhatsapp, faFacebook, faYoutube, faTwitter, faGithub, faInstagram as IconDefinition)

import "~/styles/globals.css";
  
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
