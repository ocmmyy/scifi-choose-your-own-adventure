
import React from 'react';
import type { StorySegment } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface StoryDisplayProps {
  story: StorySegment[];
  isLoading: boolean;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <LoadingSpinner />
        <p className="mt-4 text-cyan-400 font-orbitron tracking-wider">Generating Genesis Chapter...</p>
        <p className="text-gray-400">The AI is weaving the initial threads of your saga.</p>
      </div>
    );
  }

  return (
    <div className="flex-grow space-y-6 text-gray-300 leading-relaxed prose prose-invert max-w-none prose-p:text-gray-300">
      {story.map((segment) => (
        <p key={segment.id} className="transition-opacity duration-500 animate-fade-in">
          {segment.paragraph}
        </p>
      ))}
    </div>
  );
};

// Add fade-in animation to tailwind config or a style tag if needed.
// For simplicity, we'll use a one-off style in a component.
// In a real app, this would be in a global CSS or tailwind config.
const styles = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fade-in 0.7s ease-in-out;
  }
`;

const StyleInjector: React.FC = () => <style>{styles}</style>;

const StoryDisplayWrapper: React.FC<StoryDisplayProps> = (props) => (
  <>
    <StyleInjector />
    <StoryDisplay {...props} />
  </>
);

export default StoryDisplayWrapper;
