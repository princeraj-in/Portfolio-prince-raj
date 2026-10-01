/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Navbar } from './components/Navbar';
import { FuturisticParticlesBackground } from './components/ui/FuturisticParticlesBackground';
import { CursorGlow } from './components/ui/CursorGlow';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { CredentialsSection } from './components/CredentialsSection';
import { ContactFooter } from './components/ui/contact-footer';
import { ProfileChatbot } from './components/ui/ProfileChatbot';
import { ChatPage } from './components/ChatPage';
import { useNavigation } from './lib/navigation';
import { useSmoothScroll } from './lib/smooth-scroll';

export default function App() {
  const { pathname, navigate } = useNavigation();
  useSmoothScroll();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {pathname === '/chat' ? (
        <ChatPage onNavigate={navigate} />
      ) : (
        <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 font-sans overflow-x-hidden transition-colors duration-300">
          <CursorGlow />
          <FuturisticParticlesBackground />
          
          <Navbar />
          
          <main className="relative z-10 pt-16">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <CredentialsSection />
            <ProjectsSection />
          </main>
          
          <ContactFooter />
          <ProfileChatbot onNavigate={navigate} />
        </div>
      )}
    </ThemeProvider>
  );
}
