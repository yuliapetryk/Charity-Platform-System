import React from "react";
import Image from "next/image";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
} from "@material-tailwind/react";

interface BlogPostCardProps {
  img: string;
  tag: string;
  title: string;
  desc: string;
  author: string;
  date: string;
  link?: string;  // Optional: Link to the full blog post
}

export function BlogPostCard({
  img,
  tag,
  title,
  desc,
  author,
  date,
  link,
}: BlogPostCardProps) {
  console.log("data:", tag, title, desc);

  console.log("img:", img);
  return (
    <Card shadow={true}>
      <CardHeader>
      <Image
          width={768}
          height={768}
          src={img}
          alt={title}
          className="h-full w-full scale-110 object-cover"
        />
      </CardHeader>
      <CardBody className="p-6">
        {/* Tag display */}
        <Typography variant="small" color="blue" className="mb-2 !font-medium">
          {tag}
        </Typography>

        {/* Title with link if 'link' is passed */}
        <Typography
          as={link ? "a" : "div"}
          href={link || "#"}
          variant="h5"
          color="blue-gray"
          className="mb-2 normal-case transition-colors hover:text-gray-900"
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography className="mb-6 font-normal !text-gray-500">
          {desc}
        </Typography>

        {/* Author and Date info */}
        <div className="flex items-center gap-4">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-0.5 !font-medium"
            >
              {author}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="text-xs !text-gray-500 font-normal"
            >
              {date}
            </Typography>
          </div>
        </div>

        {/* Optional: View More Button */}
        {/* {link && (
          <Button
            color="blue"
            size="sm"
            className="mt-4"
            href={link}
            target="_blank"
          >
            Read More
          </Button>
        )} */}
      </CardBody>
    </Card>
  );
}

export default BlogPostCard;
