import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThumbsDown } from "lucide-react";
import Image from "next/image";

export default function ProjectCard({ title, description, tags, icon, image }) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 blur-0 group-hover:blur-sm ring-1 ring-inset"></div>
      <Card className="relative glassmorphism text-white overflow-hidden h-full flex flex-col border-transparent">
        <CardHeader className="pb-4 text-center">
          <div className="w-full aspect-video relative mb-4 rounded-md overflow-hidden">
            <Image src={image} alt={title} layout="fill" objectFit="cover" />
          </div>
          <CardTitle className="flex items-center justify-center text-xl mb-2">
            {icon}
            <span className="ml-2 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-transparent bg-clip-text">
              {title}
            </span>
          </CardTitle>
          <CardDescription className="text-zinc-400">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
          <ScrollArea className="h-20 w-full mb-4">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-zinc-800 text-zinc-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </ScrollArea>
          <div className="flex justify-between items-center mt-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-zinc-800 text-white hover:bg-zinc-700"
                >
                  View Project
                  <span className="ml-1 text-[0.7rem] bg-zinc-700 px-1.5 py-0.5 rounded-full">
                    Details
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white">
                <DialogHeader>
                  <DialogTitle className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-transparent bg-clip-text">
                    {title}
                  </DialogTitle>
                  <DialogDescription className="text-zinc-400">
                    {description}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={200}
                    className="w-full h-auto object-cover rounded-md"
                  />
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-white"
            >
              <ThumbsDown className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
