import Image from 'next/image';
import Link from 'next/link';
import BuilderImage from '@/assets/images/builder.png';
import ChronobillImage from '@/assets/images/chronobill.png';
import SidetrackImage from '@/assets/images/sidetrack.png';
import MenuuuImage from '@/assets/images/menuuu.png';
import Button from '@/components/Button';
import { ArrowUpRight } from 'lucide-react';

export const products = [
  {
    id: 1,
    title: 'Chronobill',
    url: 'https://chronobill.be',
    description:
      'Create clients and keep track of all your clients in one place.',
    image: ChronobillImage,
  },
  {
    id: 2,
    title: 'Menuuu',
    url: 'https://menuuu.com',
    description: 'Maak je online menu in seconden',
    image: MenuuuImage,
  },
  {
    id: 2,
    title: 'Sidetrack',
    url: 'https://sidetrack.be',
    description: 'Track time across various projects and clients with ease.',
    image: SidetrackImage,
  },
];

const web = [
  'Web design',
  'Responsive design',
  'Front-end web development',
  'Framer/Webflow development',
  'BAAS development',
  'Detailed, rich user interfaces',
  'Low fidelity prototyping',
];

export default async function Index() {
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
