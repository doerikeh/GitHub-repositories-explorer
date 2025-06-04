interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="p-4 bg-red-600 text-white text-xl rounded-lg text-center">
      {message}
    </div>
  );
}