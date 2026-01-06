import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Link } from 'lucide-react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employees',
        href: '/employees',
    },
];

interface Employee {
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

    const { url } = usePage();
    
    const route = (name: string): string => {
        const routes: Record<string, string> = {
            'employees.create': '/employees/create',
        };
        return routes[name] || url;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />
            <div className="m-4">
                <Link href={route('employees.create')}> <Button variant={"secondary"}>Add Employee</Button></Link>
            </div>
        </AppLayout>
    );
}
