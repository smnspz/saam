export interface Product {
    id: number
    name: string
    slug: string
    permalink: string
    date_created: string
    date_created_gmt: string
    date_modified: string
    date_modified_gmt: string
    type: string
    status: string
    featured: boolean
    catalog_visibility: string
    description: string
    short_description: string
    sku: string
    price: string
    regular_price: string
    sale_price: string
    date_on_sale_from: unknown
    date_on_sale_from_gmt: unknown
    date_on_sale_to: unknown
    date_on_sale_to_gmt: unknown
    on_sale: boolean
    purchasable: boolean
    total_sales: number
    virtual: boolean
    downloadable: boolean
    downloads: unknown[]
    download_limit: number
    download_expiry: number
    external_url: string
    button_text: string
    tax_status: string
    tax_class: string
    manage_stock: boolean
    stock_quantity: unknown
    backorders: string
    backorders_allowed: boolean
    backordered: boolean
    low_stock_amount: unknown
    sold_individually: boolean
    weight: string
    dimensions: Dimensions
    shipping_required: boolean
    shipping_taxable: boolean
    shipping_class: string
    shipping_class_id: number
    reviews_allowed: boolean
    average_rating: string
    rating_count: number
    upsell_ids: unknown[]
    cross_sell_ids: unknown[]
    parent_id: number
    purchase_note: string
    categories: Category[]
    tags: unknown[]
    images: Image[]
    attributes: Attribute[]
    default_attributes: unknown[]
    variations: unknown[]
    grouped_products: unknown[]
    menu_order: number
    price_html: string
    related_ids: unknown[]
    meta_data: unknown[]
    stock_status: string
    has_options: boolean
    post_password: string
    global_unique_id: string
    brands: unknown[]
    _links: Links
  }

  export interface Attribute {
    id: number
    name: string
    options: string[]
    position: number
    variation: boolean
    visible: boolean
  }
  
  export interface Dimensions {
    length: string
    width: string
    height: string
  }
  
  export interface Category {
    id: number
    name: string
    slug: string
  }
  
  export interface Image {
    id: number
    date_created: string
    date_created_gmt: string
    date_modified: string
    date_modified_gmt: string
    src: string
    name: string
    alt: string
  }
  
  export interface Links {
    self: Self[]
    collection: Collection[]
  }
  
  export interface Self {
    href: string
    targetHints: TargetHints
  }
  
  export interface TargetHints {
    allow: string[]
  }
  
  export interface Collection {
    href: string
  }
  