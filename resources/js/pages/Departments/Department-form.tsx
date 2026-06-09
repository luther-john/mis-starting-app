import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';


export default function DepartmentForm({...props}) {

const { department, isView, isEdit } = props;

console.log('DepartmentForm props:', props);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: `${isView ? 'Show' : (isEdit ? 'Update' : 'Create')}  Departments`,
        href: '/department-form',
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

    const { url } = usePage();

    const route = (name: string, param?: string | number): string => {
        const routes: Record<string, string> = {
            'departments.index': '/departments/',
            'departments.update': `/departments/${department.id}`,
        };
        if (param !== undefined && routes[name]) {
            if (name === 'departments.index') {
                return routes[name] + param + '/index';
            }
        }
        return routes[name] || url;
    };

     const {data, setData, put, processing, errors, reset} = useForm({
        name: department.name,
        description: department.description
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put(route('departments.update', department.id), {
                forceFormData: true,
                onSuccess: () => reset(),
            });
        }
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${isView ? 'Show' : (isEdit ? 'Update' : '')}  Departments`} />
            <div className="m-4">
                <Link href={route('departments.index')}> <Button variant={"secondary"}>Back Department</Button></Link>
            </div>
            <div>
                <form onSubmit={handleSubmit} >
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
                    <div className="grid grid-flow-col auto-cols-max gap-4 lg:grid-cols-4 p-4">
                        <div className='gap-1.5'>
                            <Label htmlFor="name">Name</Label>
                            <Input 
                                className="mb-4"
                                placeholder="Name" 
                                value={data.name} onChange={(e) => setData('name', e.target.value)} 
                                disabled={isView}
                            />

                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                                className="mb-4"
                                placeholder="Description" 
                                value={data.description} 
                                onChange={(e) => setData('description', e.target.value)} 
                                disabled={isView}
                            />

                            {isEdit && (
                            <Button type="submit" disabled={processing}>
                                Update Department
                            </Button>
                            )}
                        </div>
                        
                    </div>
                    
                </form>
            </div>
        </AppLayout>
    );
}