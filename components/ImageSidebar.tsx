
import React from 'react';
import type { StorySegment } from '../types';

interface ImageSidebarProps {
  story: StorySegment[];
  isLoading: boolean;
}

const ImageSidebar: React.FC<ImageSidebarProps> = ({ story, isLoading }) => {
  return (
    <div className="sticky top-8 bg-gray-800/50 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-orbitron text-cyan-400 mb-4 border-b border-gray-700 pb-2">Visual Log</h2>
      <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
        {story.map((segment) => (
          <div key={segment.id} className="group relative overflow-hidden rounded-lg shadow-cyan-500/20 shadow-md">
            <img 
              src={segment.image} 
              alt="AI generated visual for a story segment" 
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
              <p className="text-white text-xs text-center line-clamp-4">{segment.paragraph}</p>
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="w-full aspect-square bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
             <svg className="w-10 h-10 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
            </svg>
           </div>
        )}
      </div>
    </div>
  );
};

export default ImageSidebar;
