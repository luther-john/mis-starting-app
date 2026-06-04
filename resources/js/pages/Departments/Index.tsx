import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Megaphone, Pencil, Trash } from 'lucide-react';
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
import { useEffect, useState } from 'react';

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
        success?: string,
        error?: string
    },
    departments: Department[]
}

export default function Index() {

    const { flash } = usePage<{flash?: { success?: string, error?: string }}>().props;
    const flashMessage = flash?.success || flash?.error;
    const [ showAlert, setShowAlert] = useState(flashMessage ? true : false);
    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    const { departments } = usePage().props as PageProps;

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="List of Departments" />
            <div className="m-4">
                <Link href={route('departments.create')}> <Button variant={"secondary"}>Add Department</Button></Link>
                <div>
                    <div className='m-4'>
                        { showAlert && flashMessage && (
                            <Alert variant="default" className={flash?.success ? 'border-green-500' : 'border-red-500'}>
                                <Megaphone className="h-4 w-4" />
                                <AlertTitle>{flash?.success ? 'Success' : 'Error'}</AlertTitle>
                                <AlertDescription>{ flashMessage }</AlertDescription>
                            </Alert>
                        )}
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
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='bg-white text-black'>
                            {departments.map((department) => (
                                <TableRow key={department.id}>
                                    <TableCell className="font-medium">{department.id}</TableCell>
                                    <TableCell>{department.name}</TableCell>
                                    <TableCell>{department.description}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link 
                                            as="button" 
                                            href={route('departments.edit', department.id)}
                                            className="bg-blue-500 rounded-lg p-2 hover:bg-blue-700 cursor-pointer"> 
                                        <Pencil size={20} /> 
                                        </Link>
                                        <Link 
                                            as="button" 
                                            onClick={() => handleDelete(department.id, department.name)} 
                                            className="bg-red-500 rounded-lg p-2 hover:bg-red-700 cursor-pointer">
                                            <Trash size={20} />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                           
                        </TableBody>
                    </Table>
                </div>

            )}
                    <div><p>test</p></div>
                </div>
            </div>
        </AppLayout>
    );
}