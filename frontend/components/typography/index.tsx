interface TypographyProps {
    children: React.ReactNode;
}

const H1 : React.FC<TypographyProps> = ({ children, ...props }) => (
    <h1 className="text-4xl text-neutral-900" {...props}>
        {children}
    </h1>
)

const H2 : React.FC<TypographyProps> = ({ children, ...props }) => (
    <h2 className="text-3xl text-neutral-800" {...props}>
        {children}
    </h2>
);

const H3 : React.FC<TypographyProps> = ({ children, ...props }) => (
    <h3 className="text-2xl"{...props}>
        {children}
    </h3>
)

const H4 : React.FC<TypographyProps> = ({ children, ...props }) => (
    <h4 className="text-xl" {...props}>
        {children}
    </h4>
)

const H5 : React.FC<TypographyProps> = ({ children, ...props }) => (
    <h5 className="text-lg" {...props}>
        {children}
    </h5>
)

const Small : React.FC<TypographyProps> = ({ children, ...props }) => (
    <small {...props}>
        {children}
    </small>
)

export { H1, H2, H3, H4, H5, Small }
