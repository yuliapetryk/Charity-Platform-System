import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";

interface BlogPostCardProps {
  id: string;
  img: string;
  tag: string;
  title: string;
  desc: string;
  author: string;
  date: string;
}

export function BlogPostCard({
  id,
  img,
  tag,
  title,
  desc,
  author,
  date,
}: BlogPostCardProps) {
  const router = useRouter();

  const handleTitleClick = () => {
    router.push(`/posts/${id}`);
  };

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
        <Typography variant="small" color="blue" className="mb-2 !font-medium">
          {tag}
        </Typography>

        <Typography
          as="div"
          onClick={handleTitleClick}
          variant="h5"
          color="blue-gray"
          className="mb-2 normal-case transition-colors hover:text-gray-900 cursor-pointer"
        >
          {title}
        </Typography>

        <Typography className="mb-6 font-normal !text-gray-500">
          {desc}
        </Typography>

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
      </CardBody>
    </Card>
  );
}

export default BlogPostCard;
