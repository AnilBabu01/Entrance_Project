import { FacebookProvider, CustomChat } from "react-facebook";

import React from "react";

export default function MessengerChat() {
  return (
    <FacebookProvider appId="4162045277452780" chatSupport>
      <CustomChat pageId="519488274591435" minimized={false} />
    </FacebookProvider>
  );
}
