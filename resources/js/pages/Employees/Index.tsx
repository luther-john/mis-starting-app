import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

declare const route: (...args: any[]) => string;

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employees',
        href: '/employees',
    },
];

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

interface PageProps {
    flash: {
        message?: string
    },
    employees: Employee[]
}

export default function Index() {

    const { employees, flash } = usePage().props as PageProps;

    const {processing, delete: destroy} = useForm();

    const { url } = usePage();

    const route = (name: string, param?: string | number): string => {
        const routes: Record<string, string> = {
            'employees.create': '/employees/create',
            'employees.edit': '/employees/',
            'employees.destroy': '/employees/',
        };
        if (param !== undefined && routes[name]) {
            if (name === 'employees.edit') {
                return routes[name] + param + '/edit';
            } else if (name === 'employees.destroy') {
                return routes[name] + param;
            }
        }
        return routes[name] || url;
    };

    const handleDelete = (id: number, name: string) => {
        if(confirm(`Do you want to delete a product - ${id}. ${name}`)){
            destroy(route("employees.destroy", id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />
            <div className="m-4">
                <Link href={route('employees.create')}> <Button variant={"secondary"}>Add Employee</Button></Link>
                <div>
                    <div className='m-4'><div>
                </div>
                
            </div>
                    {employees.length > 0 && (
                <div className='m-4'>
                    <Table>
                        <TableCaption>A list of your recent employees.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Mobile Number</TableHead>
                                <TableHead>Date Hired</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees.map((employee) => (
                                <TableRow>
                                    <TableCell className="font-medium">{employee.id}</TableCell>
                                    <TableCell>{employee.first_name} {employee.last_name}</TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>{employee.phone}</TableCell>
                                    <TableCell>{employee.hire_date}</TableCell>
                                    <TableCell>{employee.address}, {employee.city}, {employee.state}, {employee.zip_code}, {employee.country}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={route('employees.edit', employee.id)}><Button className="bg-slate-600 hover:bg-slate-700">Edit</Button></Link>
                                        <Button onClick={() => handleDelete(employee.id, employee.first_name)} className="bg-red-500 hover:bg-red-700">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                           
                        </TableBody>
                    </Table>

                </div>

            )}
                </div>
            </div>
        </AppLayout>
    );
}
