import z from 'zod'

const productSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  total: z.number(),
  discountPercentage: z.number(),
  discountedTotal: z.number(),
  thumbnail: z.string().url()
})

const cartSchema = z.object({
  products: z.array(productSchema),
  total: z.number().positive(),
  discountedTotal: z.number().positive(),
  userId: z.number().positive(),
  totalProducts: z.number().positive(),
  totalQuantity: z.number().positive()
})

export function validateCart (object) {
  return cartSchema.safeParse(object)
}

export function validatePartialCart (object) {
  return cartSchema.partial().safeParse(object)
}
