import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border bg-card text-card-foreground hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 ease-out h-full group",
        className
      )}
    >
      {/* Media Section */}
      <Link
        href={href || "#"}
        className="block cursor-pointer relative overflow-hidden"
      >
        <div className="relative h-48 w-full overflow-hidden">
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Content Section */}
      <CardHeader className="px-4 pt-4 pb-0">
        <div className="space-y-2">
          <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-200">
            {title}
          </CardTitle>
          <time className="font-sans text-xs text-muted-foreground tracking-wide">
            {dates}
          </time>
          {link && (
            <div className="font-sans text-xs text-primary truncate">
              {link.replace("https://", "").replace("www.", "").replace("/", "")}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-4 py-3">
        <div className="prose prose-sm max-w-full text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
      </CardContent>

      {/* Tags Section */}
      {tags && tags.length > 0 && (
        <div className="px-4 pb-0">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="px-2 py-0.5 text-[10px] font-medium"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Links Section */}
      <CardFooter className="px-4 pt-3 pb-4">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-center gap-2">
            {links.map((link, idx) => (
              <Link href={link.href} key={idx} target="_blank">
                <Badge
                  className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  variant="secondary"
                >
                  {link.icon}
                  <span>{link.type}</span>
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}