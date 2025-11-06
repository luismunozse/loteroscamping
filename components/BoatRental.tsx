'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface BoatRentalForm {
  nombre: string
  apellido: string
  email: string
  telefono: string
  tipoServicio: string
  tipoBote?: string
  fecha: string
  hora: string
  duracion: string
  cantidadPersonas: string
  mensaje?: string
}

export default function BoatRental() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedBoteType, setSelectedBoteType] = useState<string>('')
  const [showContactForm, setShowContactForm] = useState(false)
  const [dateFocused, setDateFocused] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<BoatRentalForm>()
  const tipoServicio = watch('tipoServicio')
  const fecha = watch('fecha')
  const cantidadPersonas = watch('cantidadPersonas')
  const duracion = watch('duracion')

  const handleServiceSelect = (service: string) => {
    setSelectedService(service)
    setValue('tipoServicio', service)
    if (service !== 'bote') {
      setSelectedBoteType('')
      setValue('tipoBote', '')
    }
  }

  const handleBoteTypeSelect = (type: string) => {
    setSelectedBoteType(type)
    setValue('tipoBote', type)
  }

  const canProceed = () => {
    if (!selectedService) return false
    if (selectedService === 'bote' && !selectedBoteType) return false
    if (!fecha) return false
    if (!cantidadPersonas) return false
    return true
  }

  const onSubmit = async (data: BoatRentalForm) => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Datos de reserva:', data)
    setIsSubmitting(false)
    setSubmitSuccess(true)
    reset()
    setSelectedService('')
    setSelectedBoteType('')
    setShowContactForm(false)
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  const duraciones = [
    { value: '1', label: '1 hora' },
    { value: '2', label: '2 horas' },
    { value: '3', label: '3 horas' },
    { value: '4', label: '4 horas' },
    { value: 'dia', label: 'Día completo' },
  ]

  return (
    <section id="reservar-bote" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Alquiler de Botes y Dormis
          </h2>
          <div className="w-24 h-1 bg-nature-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reservá tu bote o bungalow y disfrutá de una experiencia única en el Lago San Roque
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {submitSuccess ? (
            <div className="text-center py-16 px-8">
              <div className="w-16 h-16 bg-nature-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Reserva enviada!</h3>
              <p className="text-gray-600">
                Te contactaremos pronto para confirmar tu reserva.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Paso 1: Selección de Servicio */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-gray-200">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">¿Qué querés alquilar?</h3>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <button
                    type="button"
                    onClick={() => handleServiceSelect('bote')}
                    className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-left ${
                      selectedService === 'bote'
                        ? 'border-nature-500 bg-nature-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-3xl sm:text-4xl">🚣</span>
                      {selectedService === 'bote' && (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-nature-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Alquiler de Bote</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Navegá el lago con nuestros botes</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleServiceSelect('dormi')}
                    className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-left ${
                      selectedService === 'dormi'
                        ? 'border-nature-500 bg-nature-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-3xl sm:text-4xl">🏠</span>
                      {selectedService === 'dormi' && (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-nature-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Alquiler de Dormi</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Bungalows cómodos para tu estadía</p>
                  </button>
                </div>

                {selectedService === 'bote' && (
                  <div className="mt-4 sm:mt-6">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Tipo de Bote</h4>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {[
                        { value: 'con-motor', label: 'Con Motor', icon: '⚙️' },
                        { value: 'sin-motor', label: 'Sin Motor', icon: '🚣' },
                        { value: 'tracker-guia', label: 'Tracker con Guía', icon: '🧭' },
                      ].map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleBoteTypeSelect(type.value)}
                          className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                            selectedBoteType === type.value
                              ? 'border-nature-500 bg-nature-50 shadow-md'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{type.icon}</div>
                          <div className="text-xs sm:text-sm font-medium text-gray-900 leading-tight">{type.label}</div>
                        </button>
                      ))}
                    </div>
                    <input type="hidden" {...register('tipoBote', { required: selectedService === 'bote' })} />
                    {errors.tipoBote && (
                      <p className="mt-2 text-sm text-red-600">{errors.tipoBote.message}</p>
                    )}
                  </div>
                )}
                <input type="hidden" {...register('tipoServicio', { required: true })} />
                {errors.tipoServicio && (
                  <p className="mt-2 text-sm text-red-600">{errors.tipoServicio.message}</p>
                )}
              </div>

              {/* Paso 2: Fecha y Personas */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-gray-200">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">¿Cuándo y cuántos?</h3>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {selectedService === 'dormi' ? 'Fecha de Ingreso' : 'Fecha'} *
                    </label>
                    <div className="relative group">
                      <div className="relative">
                        <input
                          type="date"
                          {...register('fecha', { required: 'La fecha es requerida' })}
                          min={new Date().toISOString().split('T')[0]}
                          onFocus={() => setDateFocused(true)}
                          onBlur={() => setDateFocused(false)}
                          className={`w-full px-3 sm:px-4 py-3 sm:py-4 pr-10 sm:pr-12 border-2 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 text-base sm:text-lg font-medium cursor-pointer datepicker-custom transition-all duration-200 ${
                            fecha 
                              ? 'border-nature-500 bg-nature-50/50 hover:border-nature-600' 
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                          style={{
                            color: fecha ? '#111827' : '#9CA3AF',
                          }}
                        />
                        <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors ${
                          fecha ? 'text-nature-500' : 'text-gray-400 group-hover:text-nature-500'
                        }`}>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        {!fecha && !dateFocused && (
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 text-base font-normal opacity-60">
                            Seleccionar fecha
                          </div>
                        )}
                      </div>
                    </div>
                    {fecha && (
                      <div className="mt-2">
                        <div className="text-sm text-nature-600 font-semibold">
                          📅 {new Date(fecha + 'T00:00:00').toLocaleDateString('es-AR', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'long',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    )}
                    {errors.fecha && (
                      <p className="mt-2 text-sm text-red-600">{errors.fecha.message}</p>
                    )}
                  </div>

                  {selectedService === 'bote' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Hora *</label>
                      <input
                        type="time"
                        {...register('hora', { required: selectedService === 'bote' ? 'La hora es requerida' : false })}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 text-lg font-medium"
                      />
                      {errors.hora && (
                        <p className="mt-2 text-sm text-red-600">{errors.hora.message}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {selectedService === 'dormi' ? 'Noches' : 'Duración'} *
                    </label>
                    {selectedService === 'dormi' ? (
                      <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => {
                          const current = parseInt(duracion) || 1
                          if (current > 1) {
                            setValue('duracion', String(current - 1))
                          }
                        }}
                        className="px-4 py-4 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <input
                        type="number"
                        {...register('duracion', { required: true, min: 1 })}
                        min="1"
                        className="flex-1 px-4 py-4 text-center text-lg font-semibold border-0 focus:ring-0"
                        placeholder="1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const current = parseInt(duracion) || 1
                          setValue('duracion', String(current + 1))
                        }}
                        className="px-4 py-4 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <select
                        {...register('duracion', { required: 'La duración es requerida' })}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 text-lg font-medium"
                      >
                        <option value="">Seleccionar</option>
                        {duraciones.map((dur) => (
                          <option key={dur.value} value={dur.value}>
                            {dur.label}
                          </option>
                        ))}
                      </select>
                    )}
                    {errors.duracion && (
                      <p className="mt-2 text-sm text-red-600">{errors.duracion.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Cantidad de Personas *</label>
                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => {
                          const current = parseInt(cantidadPersonas) || 1
                          if (current > 1) {
                            setValue('cantidadPersonas', String(current - 1))
                          }
                        }}
                        className="px-4 py-4 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <input
                        type="number"
                        {...register('cantidadPersonas', { required: true, min: 1, max: 10 })}
                        min="1"
                        max="10"
                        className="flex-1 px-4 py-4 text-center text-lg font-semibold border-0 focus:ring-0"
                        placeholder="2"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const current = parseInt(cantidadPersonas) || 1
                          if (current < 10) {
                            setValue('cantidadPersonas', String(current + 1))
                          }
                        }}
                        className="px-4 py-4 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    {errors.cantidadPersonas && (
                      <p className="mt-2 text-sm text-red-600">{errors.cantidadPersonas.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Paso 3: Formulario de Contacto */}
              {canProceed() && (
                <div className="p-4 sm:p-6 md:p-8 border-b border-gray-200">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Tus datos de contacto</h3>
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre *</label>
                      <input
                        type="text"
                        {...register('nombre', { required: 'El nombre es requerido' })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 text-sm sm:text-base"
                        placeholder="Juan"
                      />
                      {errors.nombre && (
                        <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido *</label>
                      <input
                        type="text"
                        {...register('apellido', { required: 'El apellido es requerido' })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 text-sm sm:text-base"
                        placeholder="Pérez"
                      />
                      {errors.apellido && (
                        <p className="mt-1 text-sm text-red-600">{errors.apellido.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        {...register('email', {
                          required: 'El email es requerido',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email inválido'
                          }
                        })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 text-sm sm:text-base"
                        placeholder="juan@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono *</label>
                      <input
                        type="tel"
                        {...register('telefono', { required: 'El teléfono es requerido' })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 text-sm sm:text-base"
                        placeholder="+54 351 123 4567"
                      />
                      {errors.telefono && (
                        <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje adicional (opcional)</label>
                    <textarea
                      {...register('mensaje')}
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 text-sm sm:text-base resize-none"
                      placeholder="Comentarios o consultas adicionales..."
                    />
                  </div>
                </div>
              )}

              {/* Botón de Envío */}
              {canProceed() && (
                <div className="p-4 sm:p-6 md:p-8 bg-gray-50">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-nature-500 hover:bg-nature-600 disabled:bg-gray-400 text-white font-bold px-6 sm:px-8 py-4 sm:py-5 rounded-lg sm:rounded-xl text-base sm:text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none shadow-lg"
                  >
                    {isSubmitting ? 'Enviando...' : selectedService === 'dormi' ? 'Reservar Dormi' : 'Reservar Bote'}
                  </button>
                  <p className="text-xs sm:text-sm text-gray-500 text-center mt-3 sm:mt-4">
                    * Campos requeridos. Nos pondremos en contacto contigo para confirmar la reserva.
                  </p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
