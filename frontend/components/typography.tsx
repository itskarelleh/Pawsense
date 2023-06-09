export const Heading1 = ({ props, children } : 
    { props: any, children: React.ReactNode }) => (
    <h1 {...props} className="text-3xl">
        {children}
    </h1>
)

export const Paragraph = ({ props, children } :
     { props: any, children: React.ReactNode }) => (
        <p {...props} className="text">
            {children}
        </p>
)