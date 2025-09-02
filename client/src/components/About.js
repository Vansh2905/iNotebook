import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center px-6">
      <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          About iNotebook
        </h1>

        {/* Description */}
        <p className="text-lg leading-relaxed mb-6">
          <span className="font-semibold">iNotebook</span> is your personal
          digital notebook designed to keep your thoughts, notes, and ideas
          organized in one secure place. Whether you’re a student, professional,
          or just someone who loves jotting down ideas, iNotebook helps you
          manage your notes with ease.
        </p>

        {/* Features Section */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          ✨ Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-lg mb-6">
          <li>Create, edit, and delete notes anytime</li>
          <li>Organize notes with tags for easy access</li>
          <li>Secure authentication with JWT</li>
          <li>Responsive design – works on mobile & desktop</li>
          <li>AI Summary helps you understand your notes fast</li>
        </ul>

        {/* Mission Section */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          🎯 Our Mission
        </h2>
        <p className="text-lg leading-relaxed">
          Our mission is to provide a simple and effective way to keep your
          ideas safe and accessible from anywhere. With iNotebook, you’ll never
          lose track of your important thoughts again.
        </p>
      </div>
    </div>
  );
}
