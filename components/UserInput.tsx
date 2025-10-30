
import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { SendIcon } from './Icon';

interface UserInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const UserInput: React.FC<UserInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-cyan-500/30">
      <label htmlFor="userInput" className="block mb-2 text-lg font-orbitron text-cyan-400">
        What happens next?
      </label>
      <div className="relative">
        <textarea
          id="userInput"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="e.g., The signal resolves into a star map..."
          className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg p-3 pr-28 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 resize-none text-gray-200 disabled:opacity-50"
          rows={3}
        />
        <button
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
          className="absolute right-3 bottom-3 flex items-center justify-center px-4 py-2 bg-cyan-600 text-white font-bold rounded-md hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              <span className="mr-2 hidden sm:inline">Continue</span>
              <SendIcon />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UserInput;
