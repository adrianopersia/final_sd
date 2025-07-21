export default function Public() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Página Pública
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Esta página es accesible para todos los usuarios, sin necesidad de
          autenticación.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-green-900 mb-2">
            ℹ️ Información
          </h2>
          <p className="text-green-800">
            Las páginas públicas no requieren que el usuario esté autenticado.
            Cualquier persona puede acceder a este contenido.
          </p>
        </div>
      </div>
    </div>
  );
}
