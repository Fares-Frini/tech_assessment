import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function AuthErrorPage() {
    return (
        <Card className="w-full max-w-md border-none bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="space-y-1 text-center pb-2">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Authentication Error
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    There was a problem signing you in. Please try again.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
                <Button 
                    asChild 
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 transition-all"
                >
                    <Link href="/login">Back to Login</Link>
                </Button>
            </CardContent>
        </Card>
    );
}
