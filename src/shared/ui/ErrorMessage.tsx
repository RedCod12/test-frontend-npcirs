interface ErrorMessageProps {
  text?: string
  className?: string
}

export function ErrorMessage({
  text = 'Не удалось загрузить данные',
  className = '',
}: ErrorMessageProps) {
  return (
    <p
      role="alert"
      className={`text-center text-sm text-red-600 ${className}`}
    >
      {text}
    </p>
  )
}