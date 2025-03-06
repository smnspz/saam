interface MenuItem {
    name: string;
    url: string;
}

export const homeMenuItems: Array<MenuItem> = [
    { name: "COMPRA", url: "/merch/vinile" },
    { name: "ASCOLTA", url: "https://links.altafonte.com/a3ya5bo?fbclid=PAZXh0bgNhZW0CMTEAAaZkwyZsHFKa5S2foxj7zgNe6tKdLyjpqkRIt5eJTIKXH9kyG4yRpz1Y3Rs_aem_L-jq9jTz1y9blekE-L-5zg" },
    { name: "MERCH", url: "/merch" },
    { name: "TOUR", url: "/tour" }
]

export const merchMenuItems: Array<MenuItem> = [
    { name: "ASCOLTA", url: "https://links.altafonte.com/a3ya5bo?fbclid=PAZXh0bgNhZW0CMTEAAaZkwyZsHFKa5S2foxj7zgNe6tKdLyjpqkRIt5eJTIKXH9kyG4yRpz1Y3Rs_aem_L-jq9jTz1y9blekE-L-5zg" },
    { name: "TOUR", url: "/tour" },
]

export const merchMenuItemContact: MenuItem = {
    name: "CONTATTI",
    url: "/contact"
}