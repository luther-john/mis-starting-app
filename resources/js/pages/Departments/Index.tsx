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
        title: 'List of Departments',
        href: '/departments',
    },
];

interface Department {
    id: number;
    name: string;
    description: string | null;
}

interface PageProps {
    flash?: {
        message?: string
    },
    departments: Department[]
}

export default function Index(props: PageProps) {

    const { departments, flash } = usePage().props as PageProps;

    const {processing, delete: destroy} = useForm();

    const { url } = usePage();

    const route = (name: string, param?: string | number): string => {
        const routes: Record<string, string> = {
            'departments.create': '/departments/create',
            'departments.edit': '/departments/',
            'departments.destroy': '/departments/',
        };
        if (param !== undefined && routes[name]) {
            if (name === 'departments.edit') {
                return routes[name] + param + '/edit';
            } else if (name === 'departments.destroy') {
                return routes[name] + param;
            }
        }
        return routes[name] || url;
    };

    const handleDelete = (id: number, name: string) => {
        if(confirm(`Do you want to delete a department - ${id}. ${name}`)){
            destroy(route("departments.destroy", id));
        }
    }

     const message = props.flash?.message ?? '';


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="List of Departments" />
            <div className="m-4">
                <Link href={route('departments.create')}> <Button variant={"secondary"}>Add Department</Button></Link>
                <div>
                    <div className='m-4'>
                        {message ? <div className="flash">{message}</div> : null}
                    <div>
                </div>
                
            </div>
                    {departments.length > 0 && (
                <div className='overflow-hidden rounded-lg border border bg-black shadow-sm m-4'>
                    <Table className="w-full table-auto">
                        <TableCaption>A list of your recent departments.</TableCaption>
                        <TableHeader>
                            <TableRow className='bg-gray-700 text-white'>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='bg-white text-black'>
                            {departments.map((department) => (
                                <TableRow>
                                    <TableCell className="font-medium">{department.id}</TableCell>
                                    <TableCell>{department.name}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={route('departments.edit', department.id)}><Button className="bg-slate-600 hover:bg-slate-700 cursor-pointer">Edit</Button></Link>
                                        <Button onClick={() => handleDelete(department.id, department.name)} className="bg-red-500 hover:bg-red-700 cursor-pointer">Delete</Button>
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