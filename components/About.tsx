export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestro Camping
          </h2>
          <div className="w-24 h-1 bg-nature-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Tu Refugio Perfecto en el Corazón de Córdoba
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Camping Lotero es mucho más que un camping: es un oasis familiar estratégicamente 
              ubicado en Ruta 55, Kilómetro 27, a orillas del majestuoso Lago San Roque. 
              Te invitamos a vivir una experiencia única donde la naturaleza y el confort se 
              encuentran para crear momentos inolvidables.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Con más de una década de experiencia, nos especializamos en brindar un ambiente 
              tranquilo, seguro y acogedor. Nuestro complejo cuenta con una <strong>enorme arboleda</strong> 
              que proporciona sombra natural durante todo el día, espaciosas áreas de camping, 
              <strong>asadores</strong> para disfrutar los mejores asados, un <strong>comedor</strong> cómodo 
              y una <strong>pileta</strong> perfecta para refrescarte en los días calurosos.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              El <strong>Lago San Roque</strong> es el protagonista de tu estadía. Podés alquilar 
              nuestros <strong>botes</strong> y navegar sus aguas cristalinas, pescar, o simplemente 
              relajarte contemplando el paisaje. Nuestro compromiso con la <strong>limpieza</strong> 
              y la <strong>seguridad</strong> garantiza que tu familia disfrute de cada momento 
              con total tranquilidad.
            </p>

            <div className="bg-gradient-to-r from-nature-50 to-blue-50 p-6 rounded-lg border-l-4 border-nature-500 mb-6">
              <p className="text-gray-800 font-semibold mb-2">
                ¿Listo para tu próxima aventura?
              </p>
              <p className="text-gray-700">
                Contactá con <strong>Sr. Mauro</strong> para reservas y consultas. Estamos 
                para ayudarte a planificar tu estadía perfecta.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-nature-100 text-nature-700 rounded-full text-sm font-medium">
                Ambiente Familiar
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Lago San Roque
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Naturaleza Pura
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">Camping View</span>
              </div>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">Lago San Roque</span>
              </div>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg col-span-2">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                <span className="text-white text-sm font-medium">Área Recreativa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

