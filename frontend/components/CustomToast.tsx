export default function CustomToast({ children } : { children: React.ReactNode }) {

    return (
        <div className="w-full flex flex-row items-center justify-center">
            {children}
        </div>
    )

}