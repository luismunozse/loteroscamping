'use client'

import { useState } from 'react'

interface DatePickerProps {
  checkIn?: string
  checkOut?: string
  onCheckInChange: (date: string) => void
  onCheckOutChange: (date: string) => void
  minDate?: string
  disabled?: boolean
  isSingleDate?: boolean // Para botes que solo necesitan una fecha
}

export default function DatePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  minDate,
  disabled = false,
  isSingleDate = false
}: DatePickerProps) {
  // Inicializar con el mes actual, pero si hay una fecha mínima en el futuro, usar esa
  const getInitialMonth = () => {
    if (minDate) {
      const minDateObj = new Date(minDate)
      const today = new Date()
      return minDateObj > today ? minDateObj : today
    }
    return new Date()
  }

  const [currentMonth, setCurrentMonth] = useState(getInitialMonth())
  const [selectedType, setSelectedType] = useState<'checkin' | 'checkout'>('checkin')

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    // Ajustar para que Lunes sea 0
    const adjustedStartingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1

    const days = []
    
    // Días del mes anterior
    const prevMonth = new Date(year, month - 1, 0)
    const daysInPrevMonth = prevMonth.getDate()
    for (let i = adjustedStartingDay - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        isSelectable: false
      })
    }

    // Días del mes actual
    const today = new Date()
    const minDateObj = minDate ? new Date(minDate) : today
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day)
      const isPast = currentDate < minDateObj && currentDate.toDateString() !== minDateObj.toDateString()
      const isSelectable = !isPast && !disabled

      days.push({
        date: day,
        isCurrentMonth: true,
        isSelectable,
        fullDate: currentDate.toISOString().split('T')[0]
      })
    }

    // Completar hasta 42 días (6 semanas)
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: day,
        isCurrentMonth: false,
        isSelectable: false
      })
    }

    return days
  }

  const getNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const getPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleDateClick = (fullDate: string) => {
    if (!fullDate) return

    // Para fechas únicas (botes)
    if (isSingleDate) {
      onCheckInChange(fullDate)
      return
    }

    // Para rangos de fechas (dormis)
    // Si no hay check-in, establecer check-in
    if (!checkIn) {
      onCheckInChange(fullDate)
      setSelectedType('checkout')
      return
    }

    // Si hay check-in pero no check-out
    if (checkIn && !checkOut) {
      if (fullDate > checkIn) {
        // Si la fecha es después del check-in, establecer check-out
        onCheckOutChange(fullDate)
      } else {
        // Si la fecha es antes o igual, cambiar el check-in
        onCheckInChange(fullDate)
        onCheckOutChange('')
      }
      return
    }

    // Si hay ambos, resetear y establecer nueva fecha
    if (fullDate < checkIn) {
      onCheckInChange(fullDate)
      onCheckOutChange('')
    } else {
      onCheckOutChange(fullDate)
    }
  }

  const isDateSelected = (fullDate: string) => {
    return fullDate === checkIn || fullDate === checkOut
  }

  const isDateInRange = (fullDate: string) => {
    if (!checkIn || !checkOut || !fullDate || isSingleDate) return false
    return fullDate > checkIn && fullDate < checkOut
  }

  const isDateStart = (fullDate: string) => {
    return fullDate === checkIn
  }

  const isDateEnd = (fullDate: string) => {
    return fullDate === checkOut
  }

  const renderCalendar = (monthOffset: number) => {
    const displayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1)
    const days = getDaysInMonth(displayDate)
    const monthName = months[displayDate.getMonth()]
    const year = displayDate.getFullYear()

    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          {monthOffset === 0 && (
            <button
              onClick={getPrevMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              disabled={disabled}
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h3 className="text-base font-semibold text-gray-900 flex-1 text-center">
            {monthName} de {year}
          </h3>
          {monthOffset === 1 && (
            <button
              onClick={getNextMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              disabled={disabled}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          {monthOffset === 0 && <div className="w-9"></div>}
        </div>

        <div className="grid grid-cols-7 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const isSelected = day.fullDate && isDateSelected(day.fullDate)
            const inRange = day.fullDate && isDateInRange(day.fullDate)
            const isStart = day.fullDate && isDateStart(day.fullDate)
            const isEnd = day.fullDate && isDateEnd(day.fullDate)

            return (
              <button
                key={index}
                onClick={() => day.isSelectable && day.fullDate && handleDateClick(day.fullDate)}
                disabled={!day.isSelectable}
                className={`
                  aspect-square flex items-center justify-center text-sm font-medium transition-all
                  ${!day.isCurrentMonth 
                    ? 'text-gray-300 cursor-default' 
                    : !day.isSelectable
                    ? 'text-gray-300 cursor-not-allowed'
                    : isSelected || isStart || isEnd
                    ? 'bg-nature-500 text-white font-semibold'
                    : inRange
                    ? 'bg-nature-50 text-nature-700'
                    : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                  }
                `}
              >
                {day.date}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 w-full max-w-[700px]">
      {/* Tabs de navegación */}
      <div className="flex items-center gap-2 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setSelectedType('checkin')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            selectedType === 'checkin'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600'
          }`}
        >
          Fechas
        </button>
        <button
          className="flex-1 px-4 py-2 rounded-md text-sm font-medium text-gray-600 cursor-not-allowed"
          disabled
        >
          Meses
        </button>
        <button
          className="flex-1 px-4 py-2 rounded-md text-sm font-medium text-gray-600 cursor-not-allowed"
          disabled
        >
          Flexible
        </button>
      </div>

      {/* Calendarios lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {renderCalendar(0)}
        {renderCalendar(1)}
      </div>
    </div>
  )
}

