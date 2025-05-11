import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");

  //Return to /login if don't have a session
  if (!session) {
    console.info("there is no session data redirecting to `/` ...");
    // return NextResponse.redirect(
    //   new URL(`${request.nextUrl.origin}/error?type=missing-user`, request.url)
    // );
  }

  //Call the authentication endpoint
  const responseAPI = await fetch(`${request.nextUrl.origin}/api/login`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  //Return to /login if token is not authorized
  if (responseAPI.status !== 200) {
    console.info("token is not authorized");
    // return NextResponse.redirect(
    //   new URL(
    //     `${request.nextUrl.origin}/error?type=missing-payment`,
    //     request.url
    //   )
    // );
  }

  return NextResponse.next();
}

//Add your protected routes
export const config = {
  matcher: ["/news"],
};
