import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { notifyError } from "../Notify";

export function withAuth(WrappedComponent: any) {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status != "loading" && !session) {
      notifyError("Forbidden", "You must be logged in to view this page");
      router.replace("/api/auth/signin");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
