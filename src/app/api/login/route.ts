import { customInitApp } from '@/lib/firebase-admin-config'
import { auth } from 'firebase-admin'
import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import getPremiumStatus from '@/methods/getPremiumStatus'
import checkIsWhitelist from '@/account/checkIsWhiteList'

// Init the Firebase SDK every time the server is called
customInitApp()

export async function POST(request: NextRequest, response: NextResponse) {
	const authorization = headers().get('Authorization')
	if (authorization?.startsWith('Bearer ')) {
		const idToken = authorization.split('Bearer ')[1]
		const decodedToken = await auth().verifyIdToken(idToken)

		if (decodedToken) {
			//Generate session cookie
			const expiresIn = 60 * 60 * 24 * 5 * 1000
			const sessionCookie = await auth().createSessionCookie(idToken, {
				expiresIn,
			})
			const options = {
				name: 'session',
				value: sessionCookie,
				maxAge: expiresIn,
				httpOnly: true,
				secure: true,
			}

			//Add the cookie to the browser
			cookies().set(options)
		}
	}

	return NextResponse.json({}, { status: 200 })
}

export async function GET(request: NextRequest) {
	const session = cookies().get('session')?.value || ''

	//Validate if the cookie exist in the request
	if (!session) {
		return NextResponse.json({ isLogged: false }, { status: 401 })
	}

	//Use Firebase Admin to validate the session cookie
	const decodedClaims = await auth().verifySessionCookie(session, true)

	if (!decodedClaims) {
		return NextResponse.json({ isLogged: false }, { status: 401 })
	}

	// checking if the email is in the white list
	if (checkIsWhitelist(decodedClaims.email))
		return NextResponse.json({ isLogged: true, isSubbed: true }, { status: 200 })

	const isSubbed = await getPremiumStatus(decodedClaims.user_id)

	if (!isSubbed) return NextResponse.json({ isLogged: true, isSubbed: false }, { status: 401 })

	return NextResponse.json({ isLogged: true, isSubbed: true }, { status: 200 })
}
