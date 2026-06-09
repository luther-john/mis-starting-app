import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';


export default function Create({...props}) {

    const { department} = props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Create Department',
            href: '/departments/create',
        },
    ];


    const { url } = usePage();

    const route = (name: string, param?: string | number): string => {
        const routes: Record<string, string> = {
            'departments.index': '/departments/',
            'departments.store': '/departments'
            
        };
        if (param !== undefined && routes[name]) {
            if (name === 'departments.index') {
                return routes[name] + param + '/index';
            } else if (name === 'departments.destroy') {
                return routes[name] + param;
            }
        }
        return routes[name] || url;
    };

    const {data, setData, post, processing, errors, reset} = useForm({
        name: department?.name || '',
        description: department?.description || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('departments.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Department" />
            <div className="m-4">
                <Link href={route('departments.index')}> <Button variant={"secondary"}>Back Department</Button></Link>
            </div>
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
                            <Label htmlFor="name">Name</Label>
                            <Input 
                                placeholder="Name" 
                                value={data.name} onChange={(e) => setData('name', e.target.value)} 
                            />

                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                                className="mb-4"
                                placeholder="Description" 
                                value={data.description} 
                                onChange={(e) => setData('description', e.target.value)} 
                            />
                            <Button type="submit" disabled={processing}>
                                Create Department
                            </Button>
                        </div>
                    </div>                   
                    
                </form>
            </div>
            
        </AppLayout>
    );
}
