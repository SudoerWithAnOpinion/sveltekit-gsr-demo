/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		jwt: string | null;
		jwtPayload: string | import('jsonwebtoken').JwtPayload | null;

		user_id: string | null;
	}

	// interface Platform {}

	interface Session {
		jwtExp: number | null;
		user_id: string | null;
	}

	// interface Stuff {}
}
