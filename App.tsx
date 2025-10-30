
import React, { useState, useEffect, useCallback } from 'react';
import type { StorySegment } from './types';
import { generateInitialStory, generateNextSegment } from './services/geminiService';
import ImageSidebar from './components/ImageSidebar';
import StoryDisplay from './components/StoryDisplay';
import UserInput from './components/UserInput';

const App: React.FC = () => {
  const [story, setStory] = useState<StorySegment[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initializeStory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const initialSegment = await generateInitialStory();
      setStory([initialSegment]);
    } catch (err) {
      console.error(err);
      setError('Failed to start the story. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeStory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinueStory = async () => {
    if (!userInput.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const nextSegment = await generateNextSegment(story, userInput);
      setStory(prevStory => [...prevStory, nextSegment]);
      setUserInput('');
    } catch (err) {
      console.error(err);
      setError('Failed to continue the story. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8 border-b-2 border-cyan-500 pb-4">
          <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-cyan-400 tracking-widest">
            Sci-Fi Story Weaver
          </h1>
          <p className="text-gray-400 mt-2">Craft your own interstellar saga, one paragraph at a time.</p>
        </header>

        {error && (
          <div className="bg-red-800 border border-red-600 text-white px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        <main className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3 lg:w-3/4 order-2 md:order-1">
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-2xl shadow-cyan-500/10 min-h-[60vh] flex flex-col">
              <StoryDisplay story={story} isLoading={isLoading && story.length === 0} />
              {!isLoading && story.length > 0 && (
                <UserInput
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  onSubmit={handleContinueStory}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>

          <aside className="md:w-1/3 lg:w-1/4 order-1 md:order-2">
            <ImageSidebar story={story} isLoading={isLoading} />
          </aside>
        </main>
      </div>
    </div>
  );
};

export default App;
