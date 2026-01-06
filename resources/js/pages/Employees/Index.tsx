import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Link } from 'lucide-react';

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
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Link href={route('employees.create')} className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">  
                        Add Employee
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
