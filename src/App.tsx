import React, { useState } from 'react'
import { Camera, Upload, Palette, Shirt, RotateCw, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function App() {
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState({ email: '', name: '' })
  const [selectedStyle, setSelectedStyle] = useState('')
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [attempts, setAttempts] = useState(3)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const styles = [
    { id: 'cartoon', name: 'Cartoon Style', icon: <Palette className="w-8 h-8" /> },
    { id: 'watercolor', name: 'Watercolor Painting', icon: <Palette className="w-8 h-8" /> },
    { id: 'popart', name: 'Pop Art', icon: <Palette className="w-8 h-8" /> }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2 && selectedFile) {
      setStep(3)
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call to ComfyUI
    setTimeout(() => {
      setGeneratedImages([
        'https://images.unsplash.com/photo-1620371355493-6bd04ce84ebf?auto=format&fit=crop&w=600',
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&w=600'
      ])
      setAttempts(prev => prev - 1)
      setIsGenerating(false)
    }, 2000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-rose-600 text-center mb-8 flex items-center justify-center gap-2">
          <Shirt className="w-8 h-8" />
          Create your custom portrait T-shirt
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Your Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-3 border rounded-lg"
                  value={userData.email}
                  onChange={e => setUserData({ ...userData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Recipient's Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg"
                  value={userData.name}
                  onChange={e => setUserData({ ...userData, name: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-rose-600 text-white p-3 rounded-lg hover:bg-rose-700 transition"
              >
                Next Step <Upload className="inline ml-2" />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <label className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <p className="mt-2">Upload Portrait Photo</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    required
                  />
                </label>
                {selectedFile && (
                  <div className="mt-4">
                    <img 
                      src={URL.createObjectURL(selectedFile)} 
                      alt="Preview" 
                      className="mx-auto h-32 rounded-lg"
                    />
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-rose-600 text-white p-3 rounded-lg hover:bg-rose-700 transition"
              >
                Next Step <Palette className="inline ml-2" />
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Choose Art Style</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {styles.map(style => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-4 rounded-lg border-2 ${
                      selectedStyle === style.id 
                        ? 'border-rose-600 bg-rose-50' 
                        : 'border-gray-200 hover:border-rose-200'
                    }`}
                  >
                    {style.icon}
                    <p className="mt-2">{style.name}</p>
                  </button>
                ))}
              </div>

              {generatedImages.length === 0 ? (
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || attempts <= 0}
                  className="w-full bg-rose-600 text-white p-3 rounded-lg hover:bg-rose-700 transition disabled:opacity-50"
                >
                  {isGenerating ? (
                    'Generating...'
                  ) : (
                    `Generate Design (${attempts} attempts left)`
                  )}
                </button>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {generatedImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Generated design ${index + 1}`}
                          className="rounded-lg w-full h-48 object-cover"
                        />
                        <button className="absolute bottom-2 right-2 bg-white/90 px-4 py-2 rounded-full text-sm shadow-sm hover:bg-white">
                          Select Design
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleGenerate}
                    disabled={attempts <= 0}
                    className="w-full bg-gray-100 text-gray-600 p-3 rounded-lg hover:bg-gray-200 transition"
                  >
                    Regenerate Design ({attempts} attempts left) <RotateCw className="inline ml-2" />
                  </button>
                </div>
              )}
            </div>
          )}

          {step > 1 && (
            <button
              onClick={() => setStep(prev => prev - 1)}
              className="mt-6 text-gray-600 hover:text-rose-600 flex items-center"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
