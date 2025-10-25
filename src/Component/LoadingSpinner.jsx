// src/Component/LoadingSpinner.jsx
import React from 'react';

// A simple, reusable CSS spinner
export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
    );
}