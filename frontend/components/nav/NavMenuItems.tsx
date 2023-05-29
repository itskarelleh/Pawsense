import Link from "next/link";

interface NavMenuListItem {
    href: string;
    label: string;
}

interface NavMenuItemsProps {
    items: Array<NavMenuListItem>
}
 
export default function NavMenuItems({ items } : NavMenuItemsProps) {

    return (
        <>
        {items.map((item) => (
            <li>
                <Link href={item.href}>
                    {item.label}
                </Link>
            </li>
        ))}
        </>
    )
}

type NavMenuItems = {
    items: Array<NavMenuItems>
}