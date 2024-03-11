import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  url: string;
  title: string;
  description: string;
  image: any;
}

export default function ProductCard({
  id,
  url,
  title,
  description,
  image,
}: ProductCardProps) {
  return (
    <div key={id}>
      <Image src={image} alt="Create client" className="h-72 object-cover" />
      <div className="mx-2">
        <div className="flex items-center justify-between mt-6">
          <p className="text-neutral-700 dark:text-neutral-300">{title}</p>
          <Link
            href={url}
            className="p-2 hover:bg-neutral-100 rounded transition"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
    </div>
  );
}
