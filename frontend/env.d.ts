namespace NodeJS {
    interface ProcessEnv {
        AUTH0_SECRET: string;
        AUTH0_BASE_URL: string;
        AUTH0_ISSUER_BASE_URL: string;
        AUTH0_CLIENT_ID: string;
        AUTH0_CLIENT_SECRET: string;
        IS_PRODUCTION: Boolean;
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
        CLERK_SECRET_KEY: string;
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: string;
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: string;
        NEXT_PUBLIC_EXTERNAL_API: string;
    }
}