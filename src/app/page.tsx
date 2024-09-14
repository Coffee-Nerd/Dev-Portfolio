// page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  ChevronRight,
  Github,
  Gamepad2,
  Code,
  Monitor,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import ProjectCard from "@/components/ui/project-card";
import ParticleBackground from "@/components/ParticleBackground"; // Import the ParticleBackground component

export default function GamingPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading placeholder
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Particle Background */}
      <ParticleBackground theme={theme} />

      <header className="sticky top-0 z-50 glassmorphism border-b border-border/50">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-gradient">
            GameDev Portfolio
          </h1>
          <div className="hidden md:flex space-x-4">
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <Switch
              checked={theme === "dark"}
              onCheckedChange={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="data-[state=checked]:bg-primary"
            />
            {theme === "dark" ? (
              <Moon className="h-4 w-4 text-foreground" />
            ) : (
              <Sun className="h-4 w-4 text-foreground" />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glassmorphism border-b border-border/50">
            <div className="container mx-auto py-4 flex flex-col space-y-2">
              <NavLink href="#projects" onClick={() => setIsMenuOpen(false)}>
                Projects
              </NavLink>
              <NavLink href="#about" onClick={() => setIsMenuOpen(false)}>
                About
              </NavLink>
              <NavLink href="#contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </header>

      <main className="relative flex-grow container mx-auto px-4 py-8">
        <section className="mb-16 text-center py-12">
          <h2 className="text-5xl font-bold mb-4 text-gradient glow-text leading-tight">
            Welcome to My Gaming Universe
          </h2>
          <p className="text-xl mb-8 text-foreground">
            Crafting immersive and cutting-edge game and UI experiences
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-button"
          >
            Explore My Work <ChevronRight className="ml-2" />
          </Button>
        </section>

        <section id="projects" className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-gradient glow-text">
            Featured Projects
          </h3>
          <Tabs defaultValue="mud" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 glassmorphism border rounded-full p-1">
              <TabsTrigger value="mud" className="rounded-full">
                Main Projects
              </TabsTrigger>
              <TabsTrigger value="ui" className="rounded-full">
                Game UI
              </TabsTrigger>
              <TabsTrigger value="other" className="rounded-full">
                Other Projects
              </TabsTrigger>
            </TabsList>
            <TabsContent value="mud">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProjectCard
                  title="Dark Wizardry"
                  description="A text-based multiplayer dungeon with rich storytelling and dynamic world-building."
                  tags={[
                    "C",
                    "Git",
                    "WebSockets",
                    "CI/CD",
                    "Linux Administration",
                    "SQL",
                    "SSH",
                    "Python",
                    "JSON",
                    "CLI",
                  ]}
                  icon={<Gamepad2 className="w-6 h-6" />}
                  image="/DarkWizScreenshot.webp"
                />
                <ProjectCard
                  title="Mud Forge"
                  description="This is just a placeholder for now to show Malleus"
                  tags={["MUD", "Python", "WebSockets"]}
                  icon={<Gamepad2 className="w-6 h-6" />}
                  image="https://placehold.co/400x200"
                />
              </div>
            </TabsContent>
            <TabsContent value="ui">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProjectCard
                  title="Mud Forge"
                  description="A modular and customizable heads-up display for modern games, built with Next.js."
                  tags={["UI/UX", "React", "CSS3"]}
                  icon={<Monitor className="w-6 h-6" />}
                  image="https://placehold.co/400x200"
                />
                <ProjectCard
                  title="Inventory Management System"
                  description="An intuitive drag-and-drop inventory system with advanced sorting and filtering."
                  tags={["UI/UX", "Vue.js", "SVG"]}
                  icon={<Monitor className="w-6 h-6" />}
                  image="https://placehold.co/400x200"
                />
              </div>
            </TabsContent>
            <TabsContent value="other">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProjectCard
                  title="Game Dev Blog"
                  description="A technical blog sharing insights and tutorials on game development and UI design."
                  tags={["Blog", "Next.js", "MDX"]}
                  icon={<Code className="w-6 h-6" />}
                  image="https://placehold.co/400x200"
                />
                <ProjectCard
                  title="Asset Creator Tool"
                  description="A web-based tool for creating and managing game assets and sprites."
                  tags={["Tool", "WebGL", "TypeScript"]}
                  icon={<Code className="w-6 h-6" />}
                  image="https://placehold.co/400x200"
                />
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section id="about" className="mb-16">
          <Card className="glassmorphism overflow-hidden">
            <CardHeader>
              <CardTitle className="text-gradient">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-foreground">
                I'm a passionate game developer with a focus on creating
                immersive MUD experiences and innovative game UIs. With years of
                experience in both front-end and back-end technologies, I strive
                to push the boundaries of what's possible in gaming.
              </p>
              <p className="text-foreground">
                My expertise includes JavaScript, Python, React, and various
                game development frameworks. I'm always excited to take on new
                challenges and collaborate on groundbreaking projects.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="contact" className="text-center">
          <h3 className="text-3xl font-bold mb-8 text-gradient glow-text">
            Get In Touch
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              className="glassmorphism hover:bg-background/30"
            >
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
            <Button
              variant="outline"
              className="glassmorphism hover:bg-background/30"
            >
              <Gamepad2 className="mr-2 h-4 w-4" /> Itch.io
            </Button>
            <Button
              variant="outline"
              className="glassmorphism hover:bg-background/30"
            >
              <Code className="mr-2 h-4 w-4" /> CodePen
            </Button>
          </div>
        </section>
      </main>

      <footer className="relative glassmorphism border-t border-border/50 text-center p-4 mt-16">
        <p className="text-foreground">
          &copy; 2023 GameDev Portfolio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function NavLink({ href, children, ...props }) {
  return (
    <Link
      href={href}
      className="text-foreground hover:text-primary transition-colors"
      {...props}
    >
      {children}
    </Link>
  );
}
