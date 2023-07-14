export default async function DashboardSection({ title, actions, children } : { title: string, actions: React.ReactElement, children: React.ReactNode }) {

    return (
        <section className="mb-8">
            <div className='flex flex-row justify-between mb-4'>
                <h2 className="text-2xl font-bold">{title}</h2>
                <div>{actions}</div>
            </div>
            <div>
                {children}
            </div>
        </section>
    )
}