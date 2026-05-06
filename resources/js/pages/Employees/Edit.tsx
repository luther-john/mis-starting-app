import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';

interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    hire_date: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    zip_code: number;
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
        email: employee.email
    });



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
                    <Button disabled={processing} type="submit">Update Employee</Button>
                </form>
            </div>
        </AppLayout>
    );
}
