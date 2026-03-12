import React from "react";

type Props = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorBox({ message, onRetry }: Props) {
  return (
    <div role="alert" className="p-4 border border-red-300 bg-red-50 text-red-800 rounded">
      <div className="text-sm">{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 inline-block bg-red-600 text-white px-3 py-1 rounded hover:opacity-90"
        >
          Retry
        </button>
      )}
    </div>
  );
}
