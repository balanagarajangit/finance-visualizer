export function Alert({ children }) {
    return (
      <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 border border-red-400 rounded">
        {children}
      </div>
    );
  }
  