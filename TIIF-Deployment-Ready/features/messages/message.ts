import {

 getMessaging,

} from "firebase/messaging";

import { app }
from "@/lib/firebase/firebase";

export const messaging =

 getMessaging(app);