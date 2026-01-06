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
            'employees.store': '/employees',
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
        post(route('employees.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Employee" />
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
                    <div className='gap-1.5'>
                        <Label htmlFor="phone number">Phone Number</Label>
                        <Input placeholder="Phone Number" value={data.phone} onChange={(e) => setData('phone', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="hire date">Hire Date</Label>
                        <Input placeholder="Hire Date M/D/YYYY" value={data.hire_date} onChange={(e) => setData('hire_date', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="gender">Gender</Label>
                        <Input placeholder="Gender" value={data.gender} onChange={(e) => setData('gender', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="address">Address</Label>
                        <Textarea placeholder="Address" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="city">City</Label>
                        <Input placeholder="City" value={data.city} onChange={(e) => setData('city', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="state">State</Label>
                        <Input placeholder="State" value={data.state} onChange={(e) => setData('state', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="zip_code">Zip Code</Label>
                        <Input placeholder="Zip Code" value={data.zip_code} onChange={(e) => setData('zip_code', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="country">Country</Label>
                        <Input placeholder="Country" value={data.country} onChange={(e) => setData('country', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="position">Position</Label>
                        <Input placeholder="Position" value={data.position} onChange={(e) => setData('position', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="department">Department</Label>
                        <Input placeholder="Department" value={data.department} onChange={(e) => setData('department', e.target.value)}></Input>
                    </div>
                    <Button type="submit" disabled={processing}>
                        Employee
                    </Button>
                </form>
            </div>
            
        </AppLayout>
    );
}
