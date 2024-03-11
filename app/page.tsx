import Image from 'next/image';
import BuilderImage from '@/assets/images/builder.png';

import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import { web } from '@/data/services';
import { products } from '@/data/products';

export default function Index() {
  return (
    <div>
      <div className="py-24 border-b flex items-center justify-between">
        <div>
          <p className="text-5xl w-5/6">
            I'm a digital designer and developer creating digital experiences
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
        <Image src={BuilderImage} alt="Builder" width={250} />
      </div>
      <div className="py-24 border-b flex">
        <div>
          <p className="text-3xl">What do I do</p>
          <p className="w-2/3 mt-4 mb-8">
            I design and build software with the goal of telling stories,
            reducing friction, and crafting digital experiences that are a joy
            to use.
          </p>
          <Button as="link" href="/">
            See services
          </Button>
        </div>
        <div>
          <ul className="flex flex-col gap-2">
            {web.map((item) => (
              <li key={item} className="whitespace-nowrap">
                — {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="py-24 border-b flex flex-col">
        <div>
          <p className="text-3xl">
            I like to build products (read little side projects)
          </p>
          <p className="w-2/3 mt-4 mb-8">
            I design and build software with the goal of telling stories,
            reducing friction, and crafting digital experiences that are a joy
            to use.
          </p>
          <Button as="link" href="/">
            See all side projects
          </Button>
        </div>
        <div className="grid md:grid-cols-2 mt-12 gap-x-6 gap-y-12">
          {products.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
