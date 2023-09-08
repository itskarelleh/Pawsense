import { Nunito, Nunito_Sans } from 'next/font/google';

export const nunito = Nunito({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito'
})

export const nunito_sans = Nunito_Sans({
    subsets: ['latin'],
    display:'swap',
    variable: '--font-nunito-sans'
})