import Button from '@/components/Button';
import Image from 'next/image';
import ProductsImage from '@/assets/images/products.png';
import { products } from '../page';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function SideProjectsPage() {
  return (
    <div>
      <div className="pt-24 flex items-center justify-between">
        <div>
          <p className="text-5xl w-4/6">
            I like to build products (read little side projects)
          </p>
          <p className="w-2/3 mt-4 mb-8">
            I design and build software with the goal of telling stories,
            reducing friction, and crafting digital experiences that are a joy
            to use.
          </p>
          <Button as="link" href="/">
            Get to know me
          </Button>
        </div>
        <Image src={ProductsImage} alt="Builder" width={250} />
      </div>
      <div className="pb-24 pt-12 border-b flex flex-col">
        <div className="grid md:grid-cols-2 mt-12 gap-6">
          {products.map((item) => (
            <div key={item.id}>
              <Image
                src={item.image}
                alt="Create client"
                className="h-72 object-cover"
              />
              <div className="mx-2">
                <div className="flex items-center justify-between mt-6">
                  <p className="text-neutral-700 dark:text-neutral-300">
                    {item.title}
                  </p>
                  <Link
                    href="/"
                    className="p-2 hover:bg-neutral-100 rounded transition"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
