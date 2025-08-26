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

            <header className="bg-green-700 text-white py-20 text-center">
                <h1 className="text-5xl font-bold">Welcome to Homestead</h1>
                <p className="mt-4 text-lg">Revolutionizing real estate with trust, tech, and transparency.</p>
                <a href="#contact" className="mt-6 inline-block bg-white text-green-700 font-bold py-2 px-6 rounded hover:bg-green-100 transition">
                    Contact Us
                </a>
            </header>

            {/* Features Section */}
            <section className="py-16 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold mb-12">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-2">Lorem Ipsum</h3>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-2">Lorem Ipsum</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-2">Lorem Ipsum</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-2">Lorem Ipsum</h3>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-2">Lorem Ipsum</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-2">Lorem Ipsum</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section id="contact" className="py-16 bg-white px-6 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Contact <span className="text-green-600">Us</span></h2>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                        />
                        <InputError message={errors.message} className="mt-2" />
                    </div>

                    <Button type="submit" className='w-full hover:bg-gray-600' disabled={processing}>
                        Send Message
                    </Button>
                </form>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white text-gray-700">
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
