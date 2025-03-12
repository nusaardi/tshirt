export const submitOrder = async (orderData: any) => {
  // In real implementation, this would connect to your Node.js backend
  // which would then interface with Printful/Gelato API
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
  return response.json()
}

export const generatePortrait = async (image: File, style: string) => {
  // Simulated ComfyUI API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        images: [
          'https://images.unsplash.com/photo-1620371355493-6bd04ce84ebf?auto=format&fit=crop&w=600',
          'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&w=600'
        ]
      })
    }, 2000)
  })
}
