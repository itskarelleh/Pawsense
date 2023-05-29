export default function Layout({ children } : { children: React.ReactNode }) {
    return (
        <main>
            <h1>Blog</h1>
            {children}
        </main>
    )
}