export default function Services() {
  const services = [
    {
      icon: '🏕️',
      title: 'Dormis',
      description: 'Alquiler de bungalows cómodos para tu estadía',
    },
    {
      icon: '🔥',
      title: 'Asadores',
      description: 'Asadores disponibles para tus asados',
    },
    {
      icon: '🍽️',
      title: 'Comedor',
      description: 'Comedor cómodo para disfrutar tus comidas',
    },
    {
      icon: '🚣',
      title: 'Botes',
      description: 'Alquiler de botes con motor, sin motor y tracker con guía',
    },
    {
      icon: '🏊',
      title: 'Pileta',
      description: 'Pileta para refrescarte en los días calurosos',
    },
    {
      icon: '🌳',
      title: 'Arboleda',
      description: 'Enorme arboleda para disfrutar la sombra natural',
    },
    {
      icon: '🧹',
      title: 'Limpieza',
      description: 'Áreas mantenidas y limpias constantemente',
    },
    {
      icon: '🔒',
      title: 'Seguridad',
      description: 'Seguridad garantizada para tu tranquilidad',
    },
  ]

  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <div className="w-24 h-1 bg-nature-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Todo lo que necesitás para disfrutar de una experiencia inolvidable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="text-5xl mb-4 text-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

