export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-500">403 - Acceso Denegado</h1>
      <p className="text-gray-600 mt-2">
        No tienes permisos para acceder a esta página.
      </p>
      <a href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Ir al inicio
      </a>
    </div>
  );
}
