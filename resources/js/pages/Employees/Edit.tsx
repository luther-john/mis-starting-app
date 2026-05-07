import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';

interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    hire_date: number;
    gender: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    position: string;
    department: string;
}

interface Props {
    employee: Employee
}

export default function Edit({employee} : Props) {

    const {data, setData, put, processing, errors } = useForm({
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        phone: employee.phone,
        hire_date: employee.hire_date,
        gender: employee.gender,
        address: employee.address,
        city: employee.city,
        state: employee.state,
        zip_code: employee.zip_code,
        country: employee.country,
        position: employee.position,
        department: employee.department,
    });

    const { url } = usePage();

    const route = (name: string, id: number): string => {
        const routes: Record<string, string> = {
            'employees.update': `/employees/${employee.id}`,
        };
        return routes[name] || url;
    };



    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('employees.update', employee.id))
    }


    return (
        <AppLayout breadcrumbs={[{title: 'Edit Employee', href: `/employees/${employee.id}/edit`}]}>
            <Head title="Update Employee" />
            <div className='w-8/12 p-4'>
                <form onSubmit={handleUpdate} className='space-y-4'>
                    {/* Display error  */}

                    {Object.keys(errors).length > 0 &&(
                        <Alert>
                        <CircleAlert className="h-4 w-4" />
                        <AlertTitle>Errors!</AlertTitle>
                        <AlertDescription>
                            <ul>
                                {Object.entries(errors).map(([key, message]) => (
                                    <li key={key}>{message as string}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className='gap-1.5'>
                        <Label htmlFor="employee first name">First Name</Label>
                        <Input placeholder="First Name" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee last name">Last Name</Label>
                        <Input placeholder="Last Name" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee email">Email</Label>
                        <Input placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee phone">Mobile Number</Label>
                        <Input placeholder="Mobile Number" value={data.phone} onChange={(e) => setData('phone', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee hire date">Date Hired</Label>
                        <Input type="date" value={data.hire_date} onChange={(e) => setData('hire_date', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee gender">Gender</Label>
                        <Input placeholder="Gender" value={data.gender} onChange={(e) => setData('gender', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee address">Address</Label>
                        <Input placeholder="Address" value={data.address} onChange={(e) => setData('address', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee city">City</Label>
                        <Input placeholder="City" value={data.city} onChange={(e) => setData('city', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee state">State</Label>
                        <Input placeholder="State" value={data.state} onChange={(e) => setData('state', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee zip code">Zip Code</Label>
                        <Input placeholder="Zip Code" value={data.zip_code} onChange={(e) => setData('zip_code', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee country">Country</Label>
                        <Input placeholder="Country" value={data.country} onChange={(e) => setData('country', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee position">Position</Label>
                        <Input placeholder="Position" value={data.position} onChange={(e) => setData('position', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee department">Department</Label>
                        <Input placeholder="Department" value={data.department} onChange={(e) => setData('department', e.target.value)}></Input>
                    </div>

                    <Button disabled={processing} type="submit">Update Employee</Button>
                </form>
            </div>
        </AppLayout>
    );
}
