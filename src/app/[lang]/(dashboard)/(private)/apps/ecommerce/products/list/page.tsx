'use client'

import Grid from '@mui/material/Grid2'
import { useEffect, useState } from 'react'
import ProductListTable from '@views/apps/ecommerce/products/list/ProductListTable'
import ProductCard from '@views/apps/ecommerce/products/list/ProductCard'
import { productAPI } from '@/api'

interface Product {
  id: number
  name: string
  description?: string
  price: number
}

const eCommerceProductsList = () => {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    productAPI
      .getProducts()
      .then(res => setProducts(res.data))
      .catch(() => setError('Failed to load products'))
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ProductCard />
      </Grid>
      <Grid size={{ xs: 12 }}>
        {error && <p>{error}</p>}
        {!products && !error && <p>Loading...</p>}
        {products && <ProductListTable productData={products} />}
      </Grid>
    </Grid>
  )
}

export default eCommerceProductsList
