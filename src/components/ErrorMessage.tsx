interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center">
      {message}
    </div>
  );
}