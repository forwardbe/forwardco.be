import Button from '@/components/Button';
import Image from 'next/image';
import ProductsImage from '@/assets/images/products.png';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

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
        <div className="grid md:grid-cols-2 mt-12 gap-x-6 gap-y-12">
          {products.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
