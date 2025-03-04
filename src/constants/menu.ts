interface MenuItem {
    name: string;
    url: string;
}

export const menuItems: Array<MenuItem> = [
    { name: "COMPRA", url: "/shop" },
    { name: "ASCOLTA", url: "/listen" },
    { name: "MERCH", url: "/merch" },
    { name: "TOUR", url: "/contact" }
]