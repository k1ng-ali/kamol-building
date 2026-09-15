export interface ProjectItem {
    id: number
    category: 'sauna' | 'carport' | 'terrace' | 'hozblok'
    categoryLabel: string
    title: string
    specs: string
    price: string
    buildTime: string
    dimensions: string
    mainImage: string
    gallery: string[]
    description: string
    features: string[]
}