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
        title: 'Create Department',
        href: '/departments/create',
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
        department: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('departments.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Department" />
            <div className="relative min-h-[80vh] flex-1 overflow-hidden p-4 gap-2 rounded-xl border border-sidebar-border/50 md:min-h-min dark:border-sidebar-border">
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
                            <Label htmlFor="department">Department</Label>
                            <Input placeholder="Department" value={data.department} onChange={(e) => setData('department', e.target.value)}></Input>
                        </div>
                        
                    </div>
                    
                    <Button type="submit" disabled={processing}>
                        Department
                    </Button>
                </form>
            </div>
            
        </AppLayout>
    );
}
