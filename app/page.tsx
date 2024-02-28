import AuthButton from '../components/AuthButton';

export default async function Index() {
  return (
    <div className="max-w-7xl mx-auto">
      <nav className="flex items-center justify-between border-b py-6 border-neutral-200">
        <p className="text-lg font-semibold">Chronobill {'->'}</p>
        <AuthButton />
      </nav>
    </div>
  );
}
