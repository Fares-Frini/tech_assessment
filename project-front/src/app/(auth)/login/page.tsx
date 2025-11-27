import { LoginForm } from '@/components/auth/LoginForm';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

function LoginFormFallback() {
    return (
        <div className="w-full max-w-md flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<LoginFormFallback />}>
            <LoginForm />
        </Suspense>
    );
}
