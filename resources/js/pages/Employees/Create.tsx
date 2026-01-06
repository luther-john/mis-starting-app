import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Employee',
        href: '/employees/create',
    },
];


export default function Index() {

    const { url } = usePage();
    
    const route = (name: string): string => {
        const routes: Record<string, string> = {
            'products.store': '/products',
        };
        return routes[name] || url;
    };

    const {data, setData, post, processing, errors} = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        hire_date: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        position: "",
        department: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Product" />
            <div>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertTitle>There were some errors with your submission</AlertTitle>
                            <AlertDescription>
                                {Object.entries(errors).map(([key, message]) => (
                                    <div key={key}>{message as string}</div>
                                ))}
                            </AlertDescription>
                        </Alert>
                    )}
                  
                    <div className='gap-1.5'>
                        <Label htmlFor="first name">First Name</Label>
                        <Input placeholder="First Name" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="last name">Last Name</Label>
                        <Input placeholder="Last Name" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="email address">Email Address</Label>
                        <Input placeholder="Email Address" value={data.email} onChange={(e) => setData('email', e.target.value)}></Input>
                    </div>
                    <Button type="submit" disabled={processing}>
                        Employee
                    </Button>
                </form>
            </div>
            
        </AppLayout>
    );
}
