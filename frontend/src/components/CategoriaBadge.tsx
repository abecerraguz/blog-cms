// src/components/CategoriaBadge.tsx
interface CategoriaBadgeProps {
  nombre: string;
}

export function CategoriaBadge({ nombre }: CategoriaBadgeProps) {
  return <span className="badge-categoria">{nombre}</span>;
}