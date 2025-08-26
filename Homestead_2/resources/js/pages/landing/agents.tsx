import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import { NavLanding } from '@/components/nav-landing';

export default function App() {
  const { data, setData, post, processing, errors } = useForm<{
    name: string;
    email: string;
    message: string;
  }>({
    name: '',
    email: '',
    message: '',
  });

  const items: { label: string; href: string }[] = [];
  const defaultItems = [
    { label: "Home", href: "/" },
    { label: "Buy Properties", href: "/buyProperties" },
    { label: "Rent Properties", href: "/rentProperties" },
    { label: "Events", href: "/events" },
    { label: "Agents", href: "/agents" },
    { label: "Contact", href: "/contact" },
  ];

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('contact.store'), {
      onSuccess: () => {
        alert('Thank you for contacting us!');
        setData({ name: '', email: '', message: '' });
      },
    });
  };

  return (
    <>
      <Head title="Homestead">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>

          <NavLanding items={[]} />
          {/* Agents Section */}
            <section className="py-16 bg-gray-50 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Meet Our Verified Agents</h2>

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[
                    {
                    name: "Maria Santos",
                    email: "maria@homestead.com",
                    phone: "+63 912 345 6789",
                    specialty: "Residential & Urban Housing",
                    photo: "/agent1.jpg"
                    },
                    {
                    name: "John Dela Cruz",
                    email: "john@homestead.com",
                    phone: "+63 987 654 3210",
                    specialty: "Commercial Real Estate",
                    photo: "/agent3.jpg"
                    },
                    {
                    name: "Angela Reyes",
                    email: "angela@homestead.com",
                    phone: "+63 935 112 3344",
                    specialty: "Luxury Homes & Condos",
                    photo: "/agent2.jpg"
                    }
                ].map((agent, index) => (
                    <div
                    key={index}
                    className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center"
                    >
                    <img
                        src={agent.photo}
                        alt={agent.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold">{agent.name}</h3>
                    <p className="text-sm text-gray-500">{agent.specialty}</p>
                    <p className="mt-2 text-sm">{agent.email}</p>
                    <p className="text-sm">{agent.phone}</p>
                    <Link
                        href={`/agents/${index + 1}`}
                        className="mt-4 inline-block text-green-700 font-medium hover:underline"
                    >
                        View Profile →
                    </Link>
                    </div>
                ))}
                </div>
            </div>
            </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white text-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-start">
          <div className="text-center sm:text-left">
            <Link href="/" aria-label="Go to homepage">
              <img src="/hori-logo.png" alt="Homestead Logo" className="w-40 mx-auto sm:mx-0" />
            </Link>
            <p className="text-sm text-gray-500 mt-3">
              © {new Date().getFullYear()} Homestead. All rights reserved.
            </p>
          </div>

          <div className="text-center sm:text-right">
            <ul className="flex flex-col gap-2 text-base">
              {(items.length > 0 ? items : defaultItems).map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-green-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
